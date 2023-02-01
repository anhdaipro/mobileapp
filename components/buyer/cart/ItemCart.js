import React, { useState, useEffect,useRef } from 'react';
import { showvariation } from '../../actions/auths';
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
width: 18px;
height: 18px;
border-radius: 2px;
border-width: 1px;
background-color:${props=>props.active?'#ee4d2d':'transparent'};
border-color:${props=>props.active?'#ee4d2d':'rgba(0,0,0,.3)'};
border-style:solid;
`
const listchoice=[{name:'Tất cả',value:'all'},{name:'Giảm giá',value:'discount'},{name:'Mua lần nữa',value:'buyagain'}]
const {width} = Dimensions.get('window');
const Iteminfo=(props)=>{
    const {item,cartitem,product,checked,adjustitem,removeitem,showvariation,navigation}=props
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
  
  const setshow=()=>{
    const product={id:item.item_id,image:item.image,colors:item.colors,sizes:item.sizes,price:item.price}
    const variation={color_id:0,size_id:0,color_variation:[],size_variation:[]}
    const data={type:'variation',colors:item.colors,url:updatecartURL,quantity:item.quantity,sizes:item.sizes,product:product,variation:variation,show:true}
    showvariation(data)
    
  }

    return(
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{width:width*1.4,flexDirection:'row'}}>
            <View style={{borderBottomWidth:0.5,flexDirection:'row',paddingBottom:8,paddingTop:8}}>
                <View style={[{flexDirection:'row'},{width:width,paddingLeft:8}]}>
                <View style={[styles.flexcenter,{marginRight:4,width:32}]}>
                    {product=='mainproduct'?
                    <Checkbox onPress={()=>checked(item)} active={item.check?true:false}>
                        <View style={[styles.icon_check,{opacity:item.check?1:0}]}></View>
                    </Checkbox>
                    :null}
                </View>
                <View>
                    <Pressable onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                        <ImageBackground style={styles.image} source={{uri:item.image}}></ImageBackground>
                    </Pressable>
                </View>
                <View style={{marginLeft:8,width:'65%',alignItem:'flex-start'}}> 
                    <Pressable style={{marginBottom:8}} onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                            {product=='byproduct'?<Text>Deal Sốc</Text>:null}
                            <Text numberOfLines={1} style={{color: 'rgba(0,0,0,0.6)'}}>{item.name}</Text>   
                    </Pressable>
                    
                    
                        {item.count_variation>0?
                        <Pressable style={[styles.item_center,{backgroundColor:'rgba(0,0,0,0.1)',padding:6}]} onPress={()=>setshow()}>
                                <Text>Phân loại: {itemvariation(item)}</Text>
                                <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></Path></Svg>  
                        </Pressable>:null}
                    
                    
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
                    <Pressable style={[{backgroundColor:'#ff7837',flex:1},styles.item_center]} onPress={()=>{
                        if(!showsearch){
                            finditem()
                        }
                        setShowsearch(!showsearch)
                        }}>
                        <Text numberOfLines={2} style={styles.textwhite}>Sản phẩm tương tự</Text>
                    </Pressable>
                    <Pressable style={[{backgroundColor:'#ee4d2d',flex:1},styles.item_center]} onPress={()=>removeitem(item,product,cartitem)}><Text style={styles.textwhite}>Xóa</Text></Pressable>
                </View>
            </View>
             
        </ScrollView>
      )
  }