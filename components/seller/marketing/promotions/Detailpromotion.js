import axios from 'axios';
import React, {useState,useEffect} from 'react'
import {detailcomboURL, newcomboURL} from "../../../../urls"
import { timevalue,timesubmit,valid_from,valid_to } from '../../../../constants';
import { Pressable, SafeAreaView,TextInput,Text,ImageBackground,Alert,
    TouchableHighlight,View,Dimensions,StyleSheet } from 'react-native';
import {updateitem,updatedate,resetoffer} from "../../../../actions/seller"
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
const Listitem=styled.View`
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
const Detailpromotion=(props)=>{
    const {route,navigation,token,items_choice,updateitem,updatedate,date,resetoffer}=props
    const { id,headers } = route.params; 
    const [complete,setComplete]=useState(false)

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

    const [combo,setCombo]=useState(()=>{return{
        quantity_to_reduced:'',discount_price:0,price_special_sale:0,
        discount_percent:0,limit_order:'',promotion_combo_name:'',combo_type:'1',
        valid_from:dayjs(valid_from).format("YYYY-MM-DD HH:mm"),
        valid_to:dayjs(valid_to).format("YYYY-MM-DD HH:mm"),
    }})
    const {promotion_combo_name,combo_type}=combo
    const [limit_order,setLimit]=useState('')
    const [index,setIndex]=useState(0)
    
    const [items,setItems]=useState([])
    const [loading,setLoading]=useState(false)
  
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
            await axios(`${detailcomboURL}/${id}`,headers())
            let data=res.data
            setCombo({...data,valid_from:dayjs(data.valid_from).format("YYYY-MM-DD HH:mm"),valid_to:dayjs(data.valid_to).format("YYYY-MM-DD HH:mm")})
            setLoading(true)
            const list_products=data.products.map(item=>{
                return({...item,enable:true,check:false})
            })
            updateitem({products:list_products,product_type:'product'})
        }
        else{
            setLoading(true)
        }
        })();
    }, [id]);

    const additem=()=>{
        setShow({...show,byproduct:true,items:false})
        const url=id?`${newcomboURL}?valid_from=${combo.valid_from}&valid_to=${combo.valid_to}&combo_id=${id}`:`${newcomboURL}?valid_from=${combo.valid_from}&valid_to=${combo.valid_to}`
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
            navigation.navigate("ProductOffer",{items:items,product_type:'product',url:id?`${detailcomboURL}/${id}`:newcomboURL})
        })
    }
    useEffect(() => {
        if(date){
            if(index==0){
                setCombo({...combo,valid_from:date})
            }
            else{
                setCombo({...combo,valid_to:date})
            }
        }
    }, [date])

    const editdate=(value,indexchoice)=>{
        setIndex(indexchoice)
        updatedate({show:true,date:indexchoice==0?combo.valid_from:combo.valid_to})
    }

    const submit= async () =>{
        resetoffer()
        setComplete(true)
        navigation.navigate("Listpromotion")
    }

    return(
        <SafeAreaView>
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
                    <StyledView second>
                        <Text>Tên chương trình</Text>
                        <Text>{name_combo.length}/24</Text>
                    </StyledView>
                    <StyledView second>
                        <TextInput onChangeText={(text)=>setCombo({...combo,promotion_combo_name:text})} value={promotion_combo_name} placeholder="Người mua sẽ không nhìn thấy tên chương trình" style={styles.input}/>
                    </StyledView>
                </View>
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian bắt đầu</Text>
                        <Pressable onPress={()=>editdate(combo.valid_from,0)} style={styles.flexcenter}>
                            <Text>{dayjs(combo.valid_from).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Thời gian kết thúc</Text>
                        <Pressable onPress={()=>editdate(combo.valid_to,0)} style={styles.flexcenter}>
                            <Text>{dayjs(combo.valid_to).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                </View>
                <View>
                    <StyledView>
                        <Text>Loại chương trình</Text>
                        <Pressable onPress={()=>navigation.navigate('Promotiontype',{combo_type})} style={styles.flexcenter}>
                            <Text>Chọn</Text>
                            <Svg style={[styles.svg_icon2,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
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
                <View>
                    <View style={styles.item_space}>
                        <Text>Sản phẩm</Text>
                        <Pressable onPress={additem}>
                            <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon2]} viewBox="0 0 32 32"><Path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></Path></Svg>
                        </Pressable>
                        
                    </View>
                    {items_choice.length==0?
                    <StyleBtn onPress={additem} style={{marginTop:16}}>
                        <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon2,{marginBottom:12}]} viewBox="0 0 32 32"><Path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></Path></Svg>
                        <Styletext primary>Thêm sản phẩm</Styletext>
                    </StyleBtn>:
                    <Listitem onPress={()=>navigation.navigate("Productcombo",{items:list_items(items)})}>
                        {items_choice.map(item=>
                            <ImageBackground key={item.id} style={styles.image} source={{uri:item.image}}/>
                        )}
                    </Listitem>}
                </View>
            </View>:null}
            <View>
                <Pressable disabled={items_choice.length>0&& promotion_combo_name?false:true} onPress={submit} style={[styles.btn,{marginBottom:12,backgroundColor:items_choice.length>0&& promotion_combo_name ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                  <Text style={{color:items_choice.length>0&& promotion_combo_name ?'#fff':'rgba(0,0,0,.2)'}}>Lưu</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    token:state.auth.token,items_choice:state.seller.items_choice
});
  
export default connect(mapStateToProps,{updateitem,updatedate,resetoffer})(Detailpromotion);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    icon_back:{
      width: 20,
      height: 20,
      color:'#ee4d2d',
      fill: 'currentColor',
      position: 'relative'
    },
    header:{
        paddingLeft:8,
        paddingRight:8,
        minHeight:48,
        elevation: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        shadowColor: '#52006A',
    },
    item_center:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    flexcenter:{
      flexDirection:'row',
      alignItems:'center',
    },
    item_space:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    btn:{
      alignItems:'center',
      backgroundColor:'#fff',
      padding:4,
      justifyContent:'center',
      height:40
    },
    
    textorange:{
      color:'#ee4d2d'
    },
    textwhite:{
      color:'#fff'
    },
    svg_icon:{
      width: 18,
      fontSize: 12,
      height: 14,
      color:'#757575',
      fill: 'currentColor',
      position: 'relative'
    },
    svg_icon1:{
      width: 20,
      height: 20,
      fontSize: 20,
      color:'#ee4d2d',
      fill: 'currentColor',
      position: 'relative'
    },
    svg_icon2:{
      width: 16,
      height: 16,
      color:'#ee4d2d',
      fill: 'currentColor',
    },
    fontbig:{
      fontSize:20,
      fontWeight:'500',
      color:'#333'
    },
    image:{
      width:80,
      height:80,
      paddingRight:4,
    },
    link:{
      color: '#2673dd',
      fontSize:14
    },
    input: {
      width:'100%'
    },
  })