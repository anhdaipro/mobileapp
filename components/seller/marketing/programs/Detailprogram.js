import axios from 'axios';
import React, {useState,useEffect} from 'react'
import {detailprogramURL, newprogramURL} from "../../../../urls"
import {valid_from,valid_to } from '../../../../constants';
import { Pressable,TextInput,Text,
    ImageBackground,Alert,Modal,
    TouchableNativeFeedback,
    TouchableHighlight,View,Dimensions } from 'react-native';
import {updateitem,updatedate,resetitem,resetoffer} from "../../../../actions/seller"

import styled from "styled-components"
import Svg, {
    Circle,
    Ellipse,
    G,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
import {connect} from "react-redux"
import dayjs from "dayjs"
import { Container, styles } from '../styles';
const Listitem=styled.Pressable`
flex-direction:row;
flex-wrap:wrap
`
const StyledView=styled.View`
padding:12px;
background-color:#fff;
position:relative;
border-color:rgba(0,0,0,0.1);
border-bottom-width:${props=>props.second?0:1}px
`
const StyleBtn=styled.Pressable`
border:1px dashed #ee4d2d;
justify-content:center;
width:92px;
height:92px;
align-items:center
`
const Title=styled.View`
padding:8px 12px
`
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const Detailprogram=(props)=>{
    const {route,navigation,token,items_choice,updateitem,updatedate,date,resetoffer}=props
    const { id,headers } = route.params; 
    const [program,setProgram]=useState({name_program:'',valid_from:dayjs(valid_from).format("YYYY-MM-DD HH:mm"),
    valid_to:dayjs(valid_to).format("YYYY-MM-DD HH:mm"),
    })
    const [limit_order,setLimit]=useState('')
    const [index,setIndex]=useState(0)
    const {name_program}=program
    const [items,setItems]=useState([])
    const [state,setState]=useState({timeSecond:10,complete:false})
    const [loading,setLoading]=useState(false)
    const [show,setShow]=useState(false)
    const [complete,setComplete]=useState(false)
    const [sameitem,setSameitem]=useState([])
    const url_program=id?`${detailprogramURL}/${id}`:newprogramURL
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (complete) {
              // If we don't have unsaved changes, then we don't need to do anything
              return;
            }
    
            // Prevent default behavior of leaving the screen
            e.preventDefault();
    
            // Prompt the user before leaving the screen
            Alert.alert(
              'Discard changes?',
              'You have unsaved changes. Are you sure to discard them and leave the screen?',
              [
                { text: "Don't leave", cancelable:true, onPress: () => {} },
                {
                  text: 'Discard',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => {
                    resetoffer()
                    navigation.dispatch(e.data.action)
                  },
                },
              ]
            );
          }),
        [navigation, complete]
    );
    
    const list_items=(listitems)=>{
        return listitems.map(item=>{
            if(items_choice.some(product=>product.id==item.id)){
                return({...item,check:true,disabled:true})
            }
            return({...item,check:false})
        })
    }
    useEffect(() => {
        (async () => {
        if(id){
            const res = await axios(url_program,headers())
           // <-- passed to API URL
           let data=res.data
           setProgram({...data,valid_from:dayjs(data.valid_from).format("YYYY-MM-DD HH:mm"),valid_to:dayjs(data.valid_to).format("YYYY-MM-DD HH:mm")})
           setLoading(true)
           const variations=data.variations.map(variation=>{
               return {...variation,limit:variation.promotion_stock>0?true:false,
                   percent_discount:(variation.price-parseInt(variation.promotion_price))*100/variation.price,
                   promotion_price:parseInt(variation.promotion_price)}
               })
           const list_products=data.products.map(product=>{
               return({...product,check:false,user_item_limit:variations.find(variation=>variation.user_item_limit)?variations.find(variation=>variation.user_item_limit).user_item_limit:'',
               limit:variations.some(variation=>variation.user_item_limit)?true:false,variations:variations.filter(variation=>variation.item_id==product.id)})
               })
           updateitem({products:list_products,product_type:'product'})
        }
        else{
            setLoading(true)
        }
        })();
    }, [id]);

    const additem=()=>{
        const url=id?`${newprogramURL}?valid_from=${program.valid_from}&valid_to=${program.valid_to}&program_id=${id}`:`${newprogramURL}?valid_from=${program.valid_from}&valid_to=${program.valid_to}`
        axios.get(url,headers())
        .then(res=>{
            setLoading(true)
            const byproduct=res.data.map(item=>{
                if(items_choice.some(by=>by.id==item.id)){
                    return({...item,check:true,disabled:true})
                }
                return({...item,check:false})
            })
            setItems(byproduct)
            navigation.navigate("ProductOffer",{items:byproduct,variation:true,product_type:'product',url:url_program})
        })
    }
    useEffect(() => {
        if(date){
            if(index==0){
                setProgram({...program,valid_from:date})
            }
            else{
                setProgram({...program,valid_to:date})
            }
        }
    }, [date])

    
    const editdate=(value,indexchoice)=>{
        setIndex(indexchoice)
        updatedate({show:true,date:indexchoice==0?program.valid_from:program.valid_to})
    }

    const submit= async () =>{
        try{
            const list_items=items_choice.map(item=>item.id)
            const discount_model_list=items_choice.reduce((arr,obj,i)=>{
                const datavariation= obj.variations.map(variation=>{
                    return({promotion_price:variation.promotion_price,id:variation.id,
                    enable:variation.enable,promotion_price_after_tax:variation.promotion_price,
                    variation_id:variation.variation_id,item_id:variation.item_id,
                    promotion_stock:variation.promotion_stock?variation.promotion_stock:variation.inventory,
                    user_item_limit:obj.user_item_limit?obj.user_item_limit:0})
                })
                return [...arr,...datavariation]
            },[])
            const dataprogram={valid_from:program.valid_from,valid_to:program.valid_to,name_program:program.name_program}
            const data={...dataprogram,action:'submit',list_items:list_items,discount_model_list:discount_model_list}
            const res = await axios.post(url_program,JSON.stringify(data),headers())
            console.log(data)
            if(!res.data.error){
                setComplete(true)
                resetoffer()
                navigation.navigate("Listprogram")
                const countDown = setInterval(() => {
                    state.timeSecond--;
                    setState({...state,complete:true})
                    if (state.timeSecond <= 0) {
                        clearInterval(countDown)
                        setState({...state,complete:false})
                    }
                }, 1000);
            }
            else{  
                setSameitem(res.data.sameitem)
            } 
        }
        catch(e){
            console.log(e)
        }
    }
    const valid_products=items_choice.every(item=>item.variations.every(variation=>variation.promotion_price))
    console.log(items_choice)
    const valid=name_program && items_choice.length>0 && valid_products && program.valid_from>new Date()
    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Tạo chương trình</Text>
                </View>
            </View>
            {loading?
            <View style={{borderTopWidth:1,borderColor:'rgba(0,0,0,0.1)'}}>
                <View>
                    <StyledView style={styles.item_space} second>
                        <Text>Tên chương trình</Text>
                        <Text>{name_program.length}/24</Text>
                    </StyledView>
                    <StyledView second>
                        <TextInput onChangeText={(text)=>setProgram({...program,name_program:text})} value={name_program} placeholder="Người mua sẽ không nhìn thấy tên chương trình" style={styles.input}/>
                    </StyledView>
                </View>
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian khuyến mãi</Text>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian bắt đầu</Text>
                        <Pressable onPress={()=>editdate(program.valid_from,0)} style={styles.flexcenter}>
                            <Text>{dayjs(program.valid_from).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian kết thúc</Text>
                        <Pressable onPress={()=>editdate(program.valid_to,1)} style={styles.flexcenter}>
                            <Text>{dayjs(program.valid_to).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                </View>
                <View>
                    <StyledView>
                        <Text>Giới hạn đặt hàng</Text>
                        <View>
                            <TextInput keyboardType='numeric' 
                            value={limit_order} 
                            style={styles.input}
                            onChangeText={(text)=>setLimit(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))} 
                            placeholder="Số lượng tối đa đặt hàng của mỗi người"/>
                        </View>
                    </StyledView>
                    
                </View>
                <View style={{backgroundColor:'#fff',padding:12,marginTop:8}}>
                    <View style={[styles.item_space,{paddingBottom:12}]}>
                        <Text>Sản phẩm</Text>
                        {items_choice.length>0?
                        <Pressable onPress={additem}>
                            <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon1]} viewBox="0 0 32 32"><Path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></Path></Svg>
                        </Pressable>:null}
                        
                    </View>
                    {items_choice.length==0?
                    <StyleBtn onPress={additem} style={{marginTop:16}}>
                        <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon1,{marginBottom:12}]} viewBox="0 0 32 32"><Path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></Path></Svg>
                        <Styletext primary>Thêm sản phẩm</Styletext>
                    </StyleBtn>:
                    <Listitem onPress={()=>navigation.navigate("DetailproductOffer",{items:list_items(items)})}>
                        {items_choice.map(item=>
                            <ImageBackground key={item.id} style={styles.image} source={{uri:item.image}}/>
                        )}
                    </Listitem>}
                </View>
            </View>:null}
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={valid?false:true} onPress={submit} style={[styles.btn,{flex:1,backgroundColor:valid ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                  <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Lưu</Text>
                </Pressable>
            </View>
            <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
                <View style={styles.modal}>
                    {state.complete?
                    <StyleSucces>
                        <View style={styles.center}>
                            <Iconcontent>
                                <Svg style={styles.svg_icon_success} enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0"><G><Path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></Path></G></Svg>
                            </Iconcontent>
                            <View style={{marginTop:8}}>
                                <Styletext>Đã tạo thành công</Styletext>
                            </View>
                        </View>
                    </StyleSucces>:null}
                </View>
            </Modal>
        </Container>
    )
}

const mapStateToProps = state => ({
    token:state.auth.token,items_choice:state.seller.items_choice,date:state.seller.date
});
  
export default connect(mapStateToProps,{updateitem,updatedate,resetoffer})(Detailprogram);

