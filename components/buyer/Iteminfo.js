import React, { useState, useEffect,useRef } from 'react';
import {  showvariation } from '../../actions/auths';
import { listorderURL,itemrecentlyURL,
    shoporderURL, cartURL, updatecartURL,savevoucherURL } from '../../urls';
import { formatter,itemvariation } from '../../constants';
import styled from 'styled-components'
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

import axios from 'axios';
import {connect} from "react-redux"
const Flex=styled.View`
flex-direction:row;
`
const PressAdjust=styled.Pressable`
align-items: center;
justify-content: center;
border:1px solid rgba(0,0,0,.09);
width:24px;
height:24px;
`

const ViewInput=styled.TextInput`
width:40px;
height:24px;
border: 1px solid rgba(0,0,0,.09);
border-left-width: 0;
border-right-width: 0;
text-align:center
`
const Item=styled.View`
flex:1;
justify-content:center;
align-items:center;
padding:8px 0
`
const Tabbottom=styled.View`
width:100%;
height:2px;
bottom:0;
left:0;
background-color:#ee4d2d;
position:absolute
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
const listchoice=[{name:'Tất cả',value:'all'},{name:'Giảm giá',value:'discount'},{name:'Mua lần nữa',value:'buyagain'}]
const {width} = Dimensions.get('window');
const Iteminfo=(props)=>{
    const {item,cartitem,list_cartitem,type_product,checked,adjustitem,removeitem,showmodal,showvariation,navigation,type,data,updatevariation}=props
    const [show,setShow]=useState(false)
    const [showsearch,setShowsearch]=useState(false)
    const [items,setItems]=useState([])
    const [state,setState]=useState({page_no:1,size_id:null,color_id:null,variation_color:[],variation_size:[],count_variation:0,product_id:0,size_value:'',color_value:''})
    const itemref=useRef()
    
    const finditem=()=>{
        axios.get(`${updatecartURL}?item_id=${item.item_id}`,headers())
        .then(rep=>{
            let data=rep.data
            setItems(data.list_item)
            setState({...state,page_count:data.page_count,page:data.page,loading_item:true})
        }) 
    }
  const  variation=()=>{
      const size=item.sizes.find(size=>size.value==item.size_value)
      const color=item.colors.find(color=>color.value==item.color_value)
      setState({...state,size_id:size?size.id:null,color_id:color?color.id:null,color_value:item.color_value,
          size_value:item.size_value,
          variation_color:color?color.variation:[],variation_size:size?size.variation:[],count_variation:item.count_variation,product_id:item.product_id})
  }
  const color_active=item.colors.find(color=>color.id==item.color_id)
  const size_active=item.sizes.find(size=>size.id==item.size_id)
  const colors=item.colors.map(color=>{
    if(list_cartitem.some(cartdata=>cartdata.color_id==color.id && cartdata.id!=item.id)){
      return({...color,disabled:true})
    }
    return({...color,disabled:false})
  })
  const sizes=item.sizes.map(size=>{
    if(list_cartitem.some(cartdata=>cartdata.size_id!=size.id && cartdata.id!=item.id)){
      return({...size,disabled:true})
    }
    return({...size,disabled:false})
  })
  console.log(sizes)
  const setshow=()=>{
    const product={...item,id:item.item_id}
    const variation={id:item.product_id,price:item.price,inventory:item.inventory, color_id:color_active?color_active.id:0,size_id:size_active?size_active:0,color_variation:color_active?color_active.variation:[],size_variation:size_active?size_active.variation:[]}
    const data={type:'updatevariation',colors:colors,url:updatecartURL,item:item,cartitem:cartitem,quantity:item.quantity,sizes:sizes,product:product,variation:variation,show:true}
    showvariation(data)
    updatevariation(item,color_id,size_id,product,cartitemchoice)
    
  }

    return(
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{width:width*1.4,flexDirection:'row'}}>
          <View style={{borderBottomWidth:0.5,flexDirection:'row',paddingBottom:8,paddingTop:8}}>
            <View style={[{flexDirection:'row'},{width:width,paddingLeft:8,overflow:'hidden'}]}>
              <Flex>
                {type_product=='mainproduct'?
                <View style={[{height:80,marginRight:8},styles.item_center]}>
                  <Checkbox onPress={()=>checked(item)} active={item.check?true:false}>
                    <View style={[styles.icon_check,{opacity:item.check?1:0}]}></View>
                  </Checkbox>
                </View>
                :null}
                <Pressable onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                  <ImageBackground style={styles.image} source={{uri:item.image}}></ImageBackground>
                </Pressable>
              </Flex>
              <View style={{marginLeft:8,flex:1,alignItem:'flex-start',marginRight:8}}> 
                <Pressable style={{marginBottom:8}} onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                    {type_product=='byproduct'?<Text>Deal Sốc</Text>:null}
                    <Text numberOfLines={1} style={{color: 'rgba(0,0,0,0.6)'}}>{item.name}</Text>   
                </Pressable>
                {item.count_variation>0?
                <Text>
                <Pressable onPress={setshow} style={[styles.item_center,{backgroundColor:'rgba(0,0,0,0.1)',padding:6}]}>
                  <Text>Phân loại: {itemvariation(item)}</Text>
                  <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></Path></Svg>  
                </Pressable></Text>:null}
                    
                <View style={[styles.flexcenter,{marginBottom:8}]}>
                    <Text style={!item.discount_price?styles.price_curent:styles.price_old}>₫{formatter(item.price)}</Text>
                    {item.discount_price?
                    <Text style={styles.price_curent}>₫{formatter(item.discount_price)}</Text>
                    :null}
                </View>
                <View>
                  <View style={styles.flexcenter}>
                    <PressAdjust onPress={()=>adjustitem(item,product,cartitem,item.quantity-1)} disabled={item.quantity>1?false:true}>
                      <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:item.quantity>1?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></Polygon></Svg>
                    </PressAdjust>
                    <ViewInput 
                        keyboardType='numeric'
                        maxLength={3}
                        value={item.quantity.toString()}
                        onChangeText={(text)=>adjustitem(item,product,cartitem,text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                        style={{color:'#ee4d2d',textAlign:'center'}}
                    />
                                
                    <PressAdjust onPress={()=>adjustitem(item,product,cartitem,item.quantity+1)}>
                      <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:'#757575'}]}><Polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></Polygon></Svg>
                    </PressAdjust>
                  </View>
                </View>
              </View>
            </View>
            <View style={{width:width*0.4,flexDirection:'row'}}>
              <Pressable style={[{backgroundColor:'#ff7837',flex:1},styles.item_center]}
              onPress={() =>navigation.navigate('SameItem', { productID: item.item_id })}>
                  <Text numberOfLines={2} style={styles.textwhite}>Sản phẩm tương tự</Text>
              </Pressable>
              <Pressable style={[{backgroundColor:'#ee4d2d',flex:1},styles.item_center]} onPress={()=>removeitem(item,product,cartitem)}><Text style={styles.textwhite}>Xóa</Text></Pressable>
            </View>
          </View>
             
        </ScrollView>
      )
  }


const mapStateToProps = state => ({
    token:state.auth.token,type:state.buyer.type,data:state.buyer.data,showmodal:state.buyer.showvariation
});
  
export default connect(mapStateToProps,{showvariation})(Iteminfo);

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
