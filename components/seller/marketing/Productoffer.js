import styled from "styled-components"
import {updatecartURL} from '../../../urls';
import { formatter } from '../../../constants';
import React, { useState, useEffect,useRef,useMemo } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    FlatList,
    StyleSheet,
    TextInput,
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
import {updateitem } from "../../../actions/seller";
import { } from "../../../actions/auths";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"
const {width} = Dimensions.get('window');
import {Container, styles} from "./styles"
const Flex=styled.View`
flex-direction:row;
`
const Checkbox=styled.Pressable`
position: relative;
width: 20px;
height: 20px;
opacity:${props=>props.opacity};
border-radius: 2px;
border-width: 1px;
background-color:${props=>props.active?'#ee4d2d':'transparent'};
border-color:${props=>props.active?'#ee4d2d':'rgba(0,0,0,.3)'};
border-style:solid;
`

const ProductOffer=(props)=>{
    const {route,navigation,updateitem,items_choice,gifts}=props
    const {items,product_type,variation,url} =route.params
    const [listitems,setListitems]=useState(()=>items)
    const [token,setToken]=useState()
    useEffect(()=>{
        (async()=>{
        const value = await AsyncStorage.getItem('token')
        setToken(value)
        })()
    },[])
    const headers=useMemo(()=>{
        return {'headers':token?{ Authorization:`JWT ${token}`,'Content-Type': 'application/json' }:{'Content-Type': 'application/json'}}
    },[token])
    const setlistitem=(itemchoice,name,value)=>{
        setListitems(current=>current.map(item=>{
            if(item.id===itemchoice.id){
                return ({...item,[name]:value})
            }
            return({...item})
        }))
    }
    const submit= async ()=>{
        const list_items_choice=product_type==='product'?items_choice:gifts
        const list_itemscheck=listitems.filter(ite=>ite.check && !list_items_choice.some(item=>item.id==ite.id))
        if(variation){
          const data={list_items:list_itemscheck.map(item=>{return item.id}),
          action:'addproduct'
          }
          axios.post(url,JSON.stringify(data),headers())
          .then(res=>{
            const list_itemschoice=res.data.map(item=>{
                return({...item,check:false,show:false,limit:false,user_item_limit:'',variations:item.variations.map(variation=>{
                    return({...variation,promotion_stock:'',enable:true,show:false,limit:false,percent_discount:0,promotion_price:''})
                })})})
            
            const dataitems=[...list_itemschoice,...list_items_choice]
            updateitem({products:dataitems,product_type:product_type})
            navigation.goBack()
          })
        }
        else{
        const list_itemschoice=list_itemscheck.map(item=>{
            return({...item,check:false,enable:true})
        })
        const dataitems=[...list_itemschoice,...items_choice]
        updateitem({products:dataitems,product_type:product_type})
        navigation.goBack()
      }
    }
    const valid=listitems.find(ite=>ite.check)
    const Item=({item})=>{
      return(
          <View style={{borderBottomWidth:0.5,flexDirection:'row',paddingBottom:8,paddingTop:8,backgroundColor:'#fff'}}>
              <View style={[{flexDirection:'row'},{width:width,paddingLeft:12,paddingRight:12,overflow:'hidden'}]}>
                  <Flex>
                      <View style={[{height:80,marginRight:8},styles.item_center]}>
                          <Checkbox onPress={()=>{
                              setlistitem(item,'check',!item.check)
                              }} opacity={item.disabled?0.5:1} disabled={item.disabled?true:false} active={item.check?true:false}>
                              <View style={[styles.icon_check,{opacity:item.check?1:0}]}></View>
                          </Checkbox>
                      </View>
                      <Pressable onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                          <ImageBackground style={styles.image} source={{uri:item.image}}></ImageBackground>
                      </Pressable>
                  </Flex>
                  <View style={{marginLeft:8,flex:1,alignItem:'flex-start',marginRight:8}}> 
                      <View style={[{marginBottom:4,height:32}]}>
                          <Text numberOfLines={2} style={{marginLeft:4,color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>{item.name}</Text>   
                      </View>
                      
                      <View style={[styles.flexcenter,{marginBottom:8}]}>
                          <Text>₫{formatter(item.min_price)}</Text>
                          {item.min_price!==item.max_price?<Text> - ₫{formatter(item.max_price)}</Text>:null}
                      </View> 
                      <View>
                          <Text style={{color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>SL: {item.total_inventory}</Text>   
                      </View>
                  </View>
              </View>
          </View> 
        )
    }
    return(
        <Container>
            <View style={styles.header}>
                <View style={[styles.item_space,{paddingTop:28,paddingBottom:12}]}>
                    <View style={styles.flexcenter}>
                        <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                            <View style={{marginRight:8,padding:4}}>
                                <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                            </View>
                        </TouchableHighlight>
                        <Text style={styles.fontbig}>Thêm sản phẩm</Text>
                    </View>
                    <Pressable>
                        <Svg height="19" viewBox="0 0 19 19" width="19" style={[styles.svg_icon3,{color:'#ee4d2d'}]}><G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G></Svg>
                    </Pressable>
                </View>
            </View> 
            <View>
                <FlatList
                    data={listitems}
                    renderItem={({item})=><Item 
                    item={item}
                    />}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.fotter}>
                <View style={[{flex:1},styles.item_center]}><Text>Đã chọn {listitems.filter(item=>item.check).length}</Text></View>
                <Pressable disabled={valid?false:true} style={[styles.btn,{flex:1,backgroundColor:valid?"#ee4d2d":"rgba(0,0,0,0.1)"}]} onPress={submit}>
                    <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Thêm</Text>
                </Pressable>
            </View>  
        </Container>
        
    )
}
const mapStateToProps = state => ({
    token:state.auth.token,items_choice:state.seller.items_choice,gifts:state.seller.gifts
});
  
export default connect(mapStateToProps,{updateitem})(ProductOffer);
