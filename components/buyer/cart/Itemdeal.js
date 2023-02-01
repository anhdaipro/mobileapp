import styled from "styled-components"
import { listorderURL,itemrecentlyURL,savevoucherURL,cartURL, updatecartURL } from '../../../urls';
import { formatter,itemvariation } from '../../../constants';
import React, { useState, useEffect,useRef } from 'react';

import {
    View,
    Text,
    StatusBar,
    ScrollView,
    FlasList,
    StyleSheet,
    TextInput,
    Modal,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    TouchableHighlight,
    Pressable,
    Image,
  } from 'react-native';
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
  import { showvariation,headers } from "../../../actions/auths";
import axios from 'axios';
const {width} = Dimensions.get('window');
const Boxpromotion=styled.Text`
padding:0px 4px ;
border:1px solid #ee4d2d;
color:#ee4d2d;
line-height:14px;
border-radius: 2px;
font-weight: 400;
text-align: center;
font-size:10px
`
const Flex=styled.View`
flex-direction:row;
`
const Checkbox=styled.Pressable`
position: relative;
width: 20px;
height: 20px;
border-radius: 2px;
border-width: 1px;
background-color:${props=>props.active?'#ee4d2d':'transparent'};
border-color:${props=>props.active?'#ee4d2d':'rgba(0,0,0,.3)'};
border-style:solid;
`

const Itemdeal=(props)=>{
  const {item,setlistitem,showvariation,navigation}=props
  const [show,setShow]=useState(false)
  const [state,setState]=useState({page_no:1,size_id:null,color_id:null,variation_color:[],variation_size:[],count_variation:0,product_id:0,size_value:'',color_value:''})
  const setshow=()=>{
    const product={...item,id:item.item_id}
    const color_active=item.colors.find(color=>color.id==item.color_id)
    const size_active=item.sizes.find(size=>size.id==item.size_id)
    const variation={id:item.product_id,price:item.price,inventory:item.inventory, color_id:color_active?color_active.id:0,size_id:size_active?size_active:0,color_variation:color_active?color_active.variation:[],size_variation:size_active?size_active.variation:[]}
    const data={type:'update',item:item,colors:item.colors,url:updatecartURL,quantity:item.quantity,sizes:item.sizes,product:product,variation:variation,show:true}
    showvariation(data)
    console.log(item.color_value)
  }
  return(   
    <View style={{borderBottomWidth:0.5,flexDirection:'row',paddingBottom:8,paddingTop:8,backgroundColor:'#fff'}}>
      <View style={[{flexDirection:'row'},{width:width,paddingLeft:8,paddingRight:8,overflow:'hidden'}]}>
        <Flex>
          <View style={[{height:80,marginRight:8},styles.item_center]}>
            <Checkbox onPress={()=>{
              setlistitem(item,'check',!item.check)
                if(!item.check){
                  setshow()
                }}} 
              opacity={item.main?0.5:1} disabled={item.main?true:false} active={item.check?true:false}>
              <View style={[styles.icon_check,{opacity:item.check?1:0}]}></View>
            </Checkbox>
          </View>
          <Pressable onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
            <ImageBackground style={styles.image} source={{uri:item.image}}></ImageBackground>
          </Pressable>
        </Flex>
        <View style={{marginLeft:8,flex:1,alignItem:'flex-start',marginRight:8}}> 
          <Pressable style={[{marginBottom:8},styles.flexcenter]} onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
            {!item.main?<Boxpromotion>Deal Sốc</Boxpromotion>:null}
            <Text numberOfLines={1} style={{marginLeft:4,color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>{item.name}</Text>   
          </Pressable>
          <Pressable onPress={setshow} style={[styles.item_space,{backgroundColor:'rgba(0,0,0,0.1)',padding:6}]}>
            <Text>x {item.quantity}</Text>
            <Text>{itemvariation(item)?`Phân loại: ${itemvariation(item)}`:'Chọn loại hàng'}</Text>
            <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></Path></Svg>  
          </Pressable>
          <View style={styles.flexcenter}>
            {item.main || (!item.percent_discount && !item.product_id)?
            <><Text>₫{formatter(item.product_id?item.price:((item.min_price+item.max_price)/2))}</Text></>:
            <><Text>₫{formatter(item.product_id?item.price:(item.min_price+item.max_price)/2)}</Text>
            <Text>₫{formatter(item.product_id?item.discount_price:((item.min_price+item.max_price)/2)*(1-item.percent_discount/100))}</Text></>}
          </View> 
        </View>
      </View>
    </View>    
  )
}
const mapStateToProps = state => ({
   user:state.auth.user
});
  
export default connect(mapStateToProps,{showvariation})(Itemdeal);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    content_input:{
      borderBottomColor:'rgba(0,0,0,.1)',
      borderBottomWidth:0.6,
      marginBottom:12,
      padding:8,
      flexDirection:'row',
      alignItems:'center'
    },
    header:{
      paddingLeft:8,
      paddingRight:8,
      minHeight:74,
      paddingBottom:8,
      elevation: 10,
      flexDirection:'row',
      alignItems:'flex-end',
      justifyContent:'space-between',
      backgroundColor:'#fff',
      shadowColor: '#52006A',
    },
    icon_back:{
      width: 20,
      height: 20,
      color:'#ee4d2d',
      fill: 'currentColor',
      position: 'relative'
    },
    image:{
        height: 80,
        width: 80,
        position: 'relative', 
    },
    
    icon_check:{
        position: 'absolute',
        height: 5,
        width: 9,
        borderColor:'#fff',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        transform: [{ rotate: "-45deg" }],
        left: 4,top: 5
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
      marginRight:8,
      color:'#757575',
      fill: 'currentColor',
      position: 'relative'
    },
    fontbig:{
      fontSize:20,
      color:'#757575'
    },
    fontsmall:{
      fontSize:12
    },
    link:{
      color: '#2673dd',
      fontSize:14
    },
    input: {
      width:'100%'
    },
    price_old:{
        color:'rgba(0,0,0,.1)',
        textDecorationStyle:'line-through',
    },
    price_curent:{
    color:'#ee4d2d',
    fontWeight:'500'
    },
    icon:{
    stroke: 'currentColor',
      fill: 'currentColor',
      height: 60,
      width: 60,
      color: '#ee4d2d'
    },
    
   
  })