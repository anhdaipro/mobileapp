import axios from 'axios';
import React, {useState,useEffect,useMemo} from 'react'
import {dealDetailshopURL, newdealURL} from "../../../../urls"
import {timesubmit,valid_from,valid_to } from '../../../../constants';
import { Pressable, SafeAreaView,TextInput,Text,ImageBackground,Alert,
    TouchableHighlight,View,Dimensions,StyleSheet } from 'react-native';
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
import {connect,useDispatch} from "react-redux"
import dayjs from "dayjs"
import { updateitem,updatedate, resetoffer } from '../../../../actions/seller';
import { Inputinner,styles,PressAdjust,ViewInput, Container } from '../styles';
const Listitem=styled.View`
flex-direction:row;
flex-wrap:wrap
`
const Itemgift=styled.Pressable`
margin:8px 8px 8px 0
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
width:80px;
height:80px;
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
const DetailGift=(props)=>{
    const {route,navigation,items_choice,updateitem,updatedate,gifts_choice,resetoffer,date}=props
    const { id,headers } = route.params; 
    const [deal,setDeal]=useState({minimum_price_to_receive_gift:null,number_gift:null,
    program_name_buy_with_shock_deal:'',shock_deal_type:'2',valid_from:dayjs(valid_from).format("YYYY-MM-DD HH:mm"),
    valid_to:dayjs(valid_to).format("YYYY-MM-DD HH:mm"),
    })
    const {program_name_buy_with_shock_deal,minimum_price_to_receive_gift,number_gift}=deal
    const [items,setItems]=useState([])
    const [byproduct,setByproduct]=useState([])
    const [loading,setLoading]=useState(false)
    const [complete,setComplete]=useState(false)
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (!complete) {
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
    
    useEffect(() => {
        (async () => {
        if(id){
            const res = await axios(`${dealDetailshopURL}/${id}`,headers())
           // <-- passed to API URL
           setDeal({...data,valid_from:dayjs(data.valid_from).format("YYYY-MM-DD HH:mm"),valid_to:dayjs(data.valid_to).format("YYYY-MM-DD HH:mm")})
           setLoading(true) 
           
           const main_products=data.main_products.map(item=>{
               return({...item,enable:true})
           })
           const variations=data.variations.map(variation=>{
               return {...variation,
               percent_discount:(variation.price-parseInt(variation.promotion_price))*100/variation.price,
               promotion_price:parseInt(variation.promotion_price)}
           })
           const list_gifts=data.byproducts.map(byproduct=>{
               return({...byproduct,variations:variations.filter(variation=>variation.item_id==byproduct.id)})
           })
           updateitem({products:main_products,product_type:'product'})
           updateitem({products:list_gifts,product_type:'gift'})
        }
        else{
            setLoading(true)
        }
        })();
    }, [id]);

    const list_items=(listitems)=>{
        return listitems.map(item=>{
            if(items_choice.some(product=>product.id==item.id)){
                return({...item,check:true,disabled:true})
            }
            return({...item,check:false})
        })
    }

    const additem=()=>{
        const url=id?`${newdealURL}?valid_from=${deal.valid_from}&valid_to=${deal.valid_from}&deal_id=${id}&mainproducts=true`:`${newdealURL}?valid_from=${deal.valid_from}&valid_to=${deal.valid_from}`
        console.log(deal.valid_from)
        axios.get(url,headers())
        .then(res=>{
            setLoading(true)
            const byproduct=res.data.map(item=>{
                if(items_choice.some(by=>by.id==item.id)){
                    return({...item,check:true,disable:true})
                }
                return({...item,check:false})
            })
            setItems(byproduct)
            navigation.navigate("ProductOffder",{items:items,product_type:'product',url:id?`${dealDetailshopURL}/${id}`:newdealURL})
        })
    }

    const addgift= async ()=>{
        const url=id?`${newdealURL}?byproducts=true&deal_id=${id}`:`${newdealURL}?byproducts=true`
        const res = await axios.get(url,headers())
        const list_byproduct=res.data.filter(item=>items_choices.every(itemchoice=>item.id!=itemchoice.id))
        const databyproduct=list_byproduct.map(item=>{
            if(gifts.some(by=>by.id==item.id)){
                return({...item,check:true,disabled:true})
            }
            return({...item,check:false})
        }) 
        setByproduct(databyproduct)
        navigation.navigate("ProductOffer",{items:databyproduct,product_type:'gift'})
    }

    useEffect(() => {
        if(date){
            if(index==0){
                setDeal({...deal,valid_from:date})
            }
            else{
                setDeal({...deal,valid_to:date})
            }
        }
    }, [date])

    const editdate=(value,indexchoice)=>{
        setIndex(indexchoice)
        updatedate({show:true,date:indexchoice==0?deal.valid_from:deal.valid_to})
    }

    const submit= async () =>{
        
        const discount_model_list=gifts_choice.reduce((arr,obj,i)=>{
            const datavariation= obj.variations.map(variation=>{
                return({promotion_price:variation.price,id:variation.id,
                variation_id:variation.variation_id,item_id:variation.item_id,
                user_item_limit:obj.user_item_limit?obj.user_item_limit:0,enable:variation.enable})
            })
            return [...arr,...datavariation]
        },[])
        const data={discount_model_list,...deal}
        setComplete(true)
        
        resetoffer()
        navigation.navigate("ListGift")
    }
    const valid=items_choice.length>0 && gifts_choice.length>0 && deal.program_name_buy_with_shock_deal
    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Mua để nhận quà</Text>
                </View>
            </View>
            {loading?
            <View style={{borderTopWidth:1,borderColor:'rgba(0,0,0,0.1)'}}>
                <View>
                    <StyledView style={styles.item_space} second>
                        <Text>Tên chương trình</Text>
                        <Text>{program_name_buy_with_shock_deal.length}/25</Text>
                    </StyledView>
                    <StyledView second>
                        <TextInput onChangeText={(text)=>setDeal({...deal,program_name_buy_with_shock_deal:text})} value={program_name_buy_with_shock_deal} placeholder="Người mua sẽ không nhìn thấy tên chương trình" style={styles.input}/>
                    </StyledView>
                </View>
                
                <View style={{marginTop:8}}>
                <StyledView style={styles.item_space}>
                        <Text>Giá trị đơn tối thiểu</Text>
                        <Inputinner>
                            <Text style={{marginRight:2}}>đ</Text>
                            <TextInput keyboardType='numeric' 
                            value={minimum_price_to_receive_gift} 
                            maxLength={10}
                            onChangeText={(text)=>setDeal({...deal,minimum_price_to_receive_gift:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})} 
                            placeholder=""/>
                        </Inputinner>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Số quà tặng</Text>
                        <View style={{flexDirection:'row'}}>
                            <PressAdjust onPress={e=>setDeal({...deal,number_gift:parseInt(number_gift)-1})} disabled={number_gift && number_gift>1?false:true}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:number_gift && number_gift>1?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></Polygon></Svg>
                            </PressAdjust>
                            <ViewInput 
                                keyboardType='numeric'
                                maxLength={3}
                                value={number_gift?number_gift.toString():''}
                                onChangeText={(text)=>setDeal({...deal ,number_gift:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                                style={{color:'#ee4d2d',textAlign:'center'}}
                            />
                            
                            <PressAdjust disabled={number_gift?false:true} onPress={()=>setDeal({...deal,number_gift:parseInt(number_gift)+1})}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:number_gift?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></Polygon></Svg>
                            </PressAdjust>
                        </View>
                    </StyledView>
                    <StyledView second>
                        <View style={styles.item_space}>
                            <Text>Quà tặng</Text>
                            {gifts_choice.length>0 &&(
                            <Pressable onPress={addgift}>
                                <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon3,{color:'#ee4d2d'}]} viewBox="0 0 32 32"><Path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></Path></Svg>
                            </Pressable>)}
                        </View>
                        {gifts_choice.length==0?
                        <StyleBtn onPress={addgift} style={{marginTop:16}}>
                            <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon3,{color:'#ee4d2d',marginBottom:12}]} viewBox="0 0 32 32"><Path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></Path></Svg>
                            <Styletext primary>Thêm ít nhất 1 quà tặng</Styletext>
                        </StyleBtn>:
                        <Listitem>
                            {gifts_choice.map(item=>
                            <Itemgift onPress={()=>navigation.navigate("Gifts",{itemchoice:item})} key={item.id}>
                                <ImageBackground style={styles.image} source={{uri:item.image}}/>
                            </Itemgift>
                            )}
                        </Listitem>}
                    </StyledView>
                </View>
                <View style={{marginTop:12,backgroundColor:'#fff',padding:8}}>
                    <View style={styles.item_space}>
                        <Text>Sản phẩm áp dụng</Text>
                        <Pressable onPress={additem} style={styles.flexcenter}>
                            <Text>{items_choice.length>0?`${items_choice.length} đã chọn`:'Chọn sản phẩm'}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>  
                    </View>
                </View>
                
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian khuyến mãi</Text>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian bắt đầu</Text>
                        <Pressable onPress={()=>editdate(deal.valid_from,0)} style={styles.flexcenter}>
                            <Text>{dayjs(deal.valid_from).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian kết thúc</Text>
                        <Pressable onPress={()=>editdate(deal.valid_to,0)} style={styles.flexcenter}>
                            <Text>{dayjs(deal.valid_to).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                </View>
            </View>:null}
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={valid?false:true} onPress={submit} style={[styles.btn,{flex:1,backgroundColor:valid ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                  <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Lưu</Text>
                </Pressable>
            </View>
        </Container>
    )
}

const mapStateToProps = state => ({
    date:state.seller.date,items_choice:state.seller.items_choice,gifts_choice:state.seller.gifts_choice
});
  
export default connect(mapStateToProps,{updateitem,updatedate,resetoffer})(DetailGift);
