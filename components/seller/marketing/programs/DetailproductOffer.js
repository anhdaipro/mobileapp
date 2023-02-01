import styled from "styled-components"
import { formatter } from '../../../../constants';
import React, { useState, useEffect,useRef,useMemo } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    FlatList,
    StyleSheet,
    TextInput,
    Alert,
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
  import {styles,StyleBtn,Styletext,Styletext2,Styletext1,Container} from "../styles"
  import {updateitem } from "../../../../actions/seller";
import axios from 'axios';
const {width} = Dimensions.get('window');

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

const DetailproductOffer=(props)=>{
    const {route,navigation,token,updateitem,items_choice}=props
    const {items} =route.params
    const [products,setProducts]=useState([])
    const [complete,setComplete]=useState(false)
    useEffect(()=>{
        setProducts(items_choice)
    },[items_choice])
    const  change=useMemo(()=>{
        if(JSON.stringify(items_choice)!=JSON.stringify(products)){
            return true
        }
        else{
            return false
        }
    },[products])
    
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


    const submit=()=>{
        
        setComplete(true)
        updateitem({products:products,product_type:'product'})
        navigation.goBack()
    }
    
    const editvariation=(itemchoice)=>{
        console.log(itemchoice)
        navigation.navigate("VariationOffers",{itemchoice:itemchoice})
    }
    const removeitem=(itemchoice)=>{
        const dataitems=items_choice.filter(item=>item.id!=itemchoice.id)
        updateitem({products:dataitems,product_type:'product'})
    }
    const additem=()=>{
        navigation.navigate("Productoffer",{items:items,product_type:'product'})
    }
    const valid=items_choice.every(item=>item.variations.every(variation=>variation.promotion_price))
    const Item=({item})=>{
        const unvalid=item.variations.find(variation=>!variation.promotion_price)
        const price=item.variations.reduce((total,obj)=>{
            return total+obj['price']
        },0)
        const max_price=item.variations.reduce((arr,obj)=>arr.price>obj.price?arr:obj).price
        const min_price=item.variations.reduce((arr,obj)=>arr.price<obj.price?arr:obj).price
        const promotion_price=item.variations.reduce((total,obj)=>{
            return total+parseInt(obj['promotion_price'])
        },0)
        return(
            <View style={{borderBottomWidth:0.5,backgroundColor:'#fff'}}>
                <View style={[{flexDirection:'row'},{width:width,padding:8,overflow:'hidden'}]}>
                    <Flex>
                        <Pressable onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                            <ImageBackground style={styles.image} source={{uri:item.image}}></ImageBackground>
                        </Pressable>
                    </Flex>
                    <View style={{marginLeft:8,flex:1,alignItem:'flex-start',marginRight:8}}> 
                        <View style={[{marginBottom:8}]}>
                            <Text numberOfLines={2} style={{marginLeft:4,color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>{item.name}</Text>   
                        </View>
                        {!unvalid &&(<View>
                            <Text>{Math.round((1-promotion_price/price)*100)}% giảm</Text>
                        </View>)}
                        <View style={styles.flexcenter}>
                            <Text>₫{formatter(min_price)}{min_price!=max_price?` - ₫${formatter(max_price)}`:''}</Text>
                            
                        </View> 
                        <View>
                            <Text>Giới hạn đặt hàng</Text>
                        </View>
                        <Text>
                            <Pressable onPress={()=>editvariation(item)} style={[styles.item_center,{backgroundColor:'rgba(0,0,0,0.1)',padding:6}]}>
                                <Text>4 phân loại hàng</Text>
                                <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></Path></Svg>  
                            </Pressable>
                        </Text>
                        
                    </View>
                    <Pressable onPress={()=>removeitem(item)}>
                        <Svg style={[styles.svg_icon3,{color:'#ee4d2d'}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M2,4 C1.72385763,4 1.5,3.77614237 1.5,3.5 C1.5,3.22385763 1.72385763,3 2,3 L6,2.999 L6,2 C6,1.44771525 6.44771525,1 7,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,2.999 L15,3 C15.2761424,3 15.5,3.22385763 15.5,3.5 C15.5,3.77614237 15.2761424,4 15,4 L14,4 L14,14 C14,14.5522847 13.5522847,15 13,15 L4,15 C3.44771525,15 3,14.5522847 3,14 L3,4 L2,4 Z M13,4 L4,4 L4,14 L13,14 L13,4 Z M6.5,7 C6.77614237,7 7,7.22385763 7,7.5 L7,11.5 C7,11.7761424 6.77614237,12 6.5,12 C6.22385763,12 6,11.7761424 6,11.5 L6,7.5 C6,7.22385763 6.22385763,7 6.5,7 Z M8.5,6 C8.77614237,6 9,6.22385763 9,6.5 L9,11.5 C9,11.7761424 8.77614237,12 8.5,12 C8.22385763,12 8,11.7761424 8,11.5 L8,6.5 C8,6.22385763 8.22385763,6 8.5,6 Z M10.5,7 C10.7761424,7 11,7.22385763 11,7.5 L11,11.5 C11,11.7761424 10.7761424,12 10.5,12 C10.2238576,12 10,11.7761424 10,11.5 L10,7.5 C10,7.22385763 10.2238576,7 10.5,7 Z M10,2 L7,2 L7,2.999 L10,2.999 L10,2 Z"></Path></Svg>
                    </Pressable>
                </View>
                {unvalid &&(<View style={{backgroundColor:'#ffdfdf',marginBottom:8}}>
                    <Text style={styles.textorange}>Bạn chưa cài đặt khuyến mãi cho sản phẩm này trước đó</Text>
                </View>)}
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
                        <Text style={styles.fontbig}>Chi tiết sản phẩm</Text>
                    </View>
                    <Pressable>
                        <Svg height="19" viewBox="0 0 19 19" width="19" style={[styles.svg_icon]}><G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G></Svg>
                    </Pressable>
                </View>
            </View> 
            <View>
                <FlatList
                    data={items_choice}
                    renderItem={({item})=><Item 
                    item={item}
                    setlistitem={(itemchoice,name,value)=>setlistitem(itemchoice,name,value)}
                    />}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={[styles.fotter,{padding:8}]}>
                <StyleBtn primary onPress={additem} style={{padding:8,marginRight:8}}>
                    <Text style={styles.textorange}>Thêm sản phẩm</Text>
                </StyleBtn>
                <Pressable disabled={valid?false:true} style={[{flex:1,backgroundColor:valid?"#ee4d2d":"rgba(0,0,0,0.1)"},styles.btn]} onPress={submit}>
                    <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Xác nhận</Text>
                </Pressable>
            </View>  
        </Container>
        
    )
}
const mapStateToProps = state => ({
    token:state.auth.token,items_choice:state.seller.items_choice
});
  
export default connect(mapStateToProps,{updateitem})(DetailproductOffer);

