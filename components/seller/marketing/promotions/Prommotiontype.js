
import { combo_type } from "../../../../constants"
import React, { useState, useEffect,useRef,useMemo } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    FlatList,
    StyleSheet,
    Alert,
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
import {connect,useDispatch,useSelector} from "react-redux"
import {updateitem,updatecombotype } from "../../../../actions/seller";
import axios from 'axios';
import styled from "styled-components"
import {styles,PressAdjust,ViewInput} from "../styles"
const Radiocontent=styled.Pressable`
width:18px;
height:18px;
border-radius:9px;
borderColor:#ee4d2d;
borderWidth:1px
position:relative
`
const Radiocheck=styled.View`
position:absolute;
left:2;
top:2;
background-color:#ee4d2d;
border-radius:6px;
width:12px;
height:12px
`
const Dot=styled.View`
width:100%;
margin-left:40px
height:1px;
background-color:rgba(0,0,0,0.1)
`
const Styleitem=styled.View`
padding:8px 0
`

const Promotiontype=(props)=>{
    const {navigation,route}=props
    const combo=useSelector(state=>state.seller.combo)
    const [formData,setformData]=useState(()=>combo)
    const [complete,setComplete]=useState(false)
    
    const  change=useMemo(()=>{
        if(JSON.stringify(combo)!=JSON.stringify(formData)){
            return true
        }
        else{
            return false
        }
    },[formData])
    
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (!complete && change) {
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
                    navigation.dispatch(e.data.action)
                  },
                },
              ]
            );
          }),
        [navigation, complete]
    );
    const dispatch=useDispatch()
    const submit= async ()=>{
        const action=updatecombotype({...formData})
        dispatch(action)
        navigation.navigate("Detailpromotion")
    }
    return(
        <SafeAreaView>
            <View style={styles.header}>
                <View style={[styles.item_space,{paddingTop:28,paddingBottom:12}]}>
                    <View style={styles.flexcenter}>
                        <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                            <View style={{marginRight:8,padding:4}}>
                                <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                            </View>
                        </TouchableHighlight>
                        <Text style={styles.fontbig}>Loại chương trình</Text>
                    </View>
                    <View>
                        <Svg height="19" viewBox="0 0 19 19" width="19" style={[styles.svg_icon]}><G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G></Svg>
                    </View>
                </View>
            </View> 
            <View style={{backgroundColor:'#fff'}}>
                {combo_type.map((combos,index)=>
                <View key={index}>
                    <View>
                        <Styleitem>
                            <View style={[styles.item_center,{width:40}]}>
                                <Radiocontent onPress={()=>setcombotype(combos)}>
                                    <Radiocheck/>
                                </Radiocontent>
                            </View>
                            <View>Giảm giá theo phần trăm</View>
                        </Styleitem>
                        {combos.value==combo.combo_type?
                        <>
                        <Styleitem style={[{marginLeft:40,borderTopWidth:1,borderColor:'rgba(0,0,0,0.1)'},styles.item_space]}>
                            <Text>Mua</Text>
                            <View style={{flexDirection:'row'}}>
                              <PressAdjust onPress={e=>setQuantity(quantity+1)} disabled={valid && quantity>1?false:true}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:valid&&quantity>1?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></Polygon></Svg>
                              </PressAdjust>
                              <ViewInput 
                                keyboardType='numeric'
                                maxLength={3}
                                value={quantity.toString()}
                                onChangeText={(text)=>setform('quantity_to_reduced',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                style={{color:'#ee4d2d',textAlign:'center'}}
                              />
                            
                              <PressAdjust onPress={e=>setQuantity(quantity+1)}  disabled={valid?false:true}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:valid?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></Polygon></Svg>
                              </PressAdjust>
                            </View>
                            <View className="input__inner input__inner--normal    item-center">
                                <TextInput 
                                onChangeText={(text)=>setform('quantity_to_reduced',text)}  value={combo.quantity_to_reduced}  placeholder=" "  maxLength="9" />
                            </View>
                        </Styleitem>
                        
                        <Styleitem style={[{marginLeft:40,borderTopWidth:1,borderColor:'rgba(0,0,0,0.1)'},styles.item_space]}>
                            {combos.value=='1'?<>
                                <View className="input__suffix">
                                    <Text className="input__suffix-split"></Text>%GIẢM
                                </View>
                                <View className="input__inner input__inner--normal    item-center">
                                    <TextInput 
                                    value={combo.discount_percent} 
                                    style={styles.input}
                                    keyboardType='numeric'
                                    onChangeText={(text)=>setform('discount_percent',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}  
                                    placeholder=" "/> 
                                    
                                </View>
                                
                                </>:<>
                                <View className="input__prefix">
                                    <Text className="input__prefix-split">₫</Text>
                                </View> 
                                <View className="input__inner input__inner--normal    item-center">
                                    <TextInput 
                                    keyboardType='numeric'
                                    style={styles.input}
                                    onChangeText={(text)=>setform(combos.value=='2'?'discount_price':'price_special_sale',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))} 
                                    value={combo.combo_type=='1'?'':combo.combo_type=='2'?combo.discount_price:combo.price_special_sale} placeholder=" "  
                                    maxLength={13} 
                                    />
                                </View>
                            </>} 
                        </Styleitem> 
                        </>
                        :null}
                    </View>
                    {index<combo_type.length-1?
                    <Dot/>:null}
                </View>
                )}
            </View>
            <View style={[styles.fotter,{padding:8}]}>
            
                <Pressable onPress={submit} style={[styles.btn,{marginBottom:12,backgroundColor:address.address && address.name ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                  <Text style={{color:address.address && address.name ?'#fff':'rgba(0,0,0,.2)'}}>Lưu</Text>
                </Pressable>
                
            </View>
        </SafeAreaView>
    )
}

export default Promotiontype