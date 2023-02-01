import axios from 'axios';
import React, {useState,useEffect,useMemo} from 'react'
import {detailvoucherURL, vouchershopURL} from "../../../../urls"
import {timesubmit,valid_from,valid_to,time_end,timevalue,timepromotion,formatter } from '../../../../constants';
import { Pressable, FlatList,TextInput,Text,TouchableHighlight,View,Dimensions,StyleSheet,ImageBackground } from 'react-native';
import styled from "styled-components"
import {URL} from "react-native-url-polyfill"
import {styles,Container, Styletext,PressAdjust,ViewInput} from "../styles"
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
import { updateitem,updatedate } from '../../../../actions/seller';

const StyledView=styled.View`
padding:12px;
background-color:#fff;
position:relative;
flex-direction:row;
border-color:rgba(0,0,0,0.1);
border-bottom-width:${props=>props.second?0:1}px
`
const StyleBtn1=styled.Pressable`
padding:4px 8px;
margin-right:8px;
border:1px solid ${props=>props.active?'#ee4d2d':'rgba(0,0,0,.1)'}
`
const Title=styled.View`
padding:8px 12px
`

const list_discount_type=[{value:'2',name:'Mức giảm'},{value:'1',name:'Theo %'},{value:'3',name:'Hoàn xu'}]
const Productvoucher=(props)=>{
    const {route,navigation,token,items_choice,updateitem}=props
    const {items} = route.params; 
    const [products,setProducts]=useState(()=>items_choice)
    const [complete,setComplete]=useState(false)

    const removeitem=(item_id)=>{
        const dataitems=items_choice.filter(item=>item.id!==item_id)
        setProducts(dataitems)
    }

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
            if (change && !complete) {
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
                { text: "Don't leave", style: 'cancel', onPress: () => {} },
                {
                  text: 'Discard',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
          }),
        [navigation, change]
      );
    
    
    const list_items=(listitems)=>{
        return listitems.map(item=>{
            if(items_choice.some(product=>product.id==item.id)){
                return({...item,check:true,disabled:true})
            }
            return({...item,check:false})
        })
    }
    
    const comfirm=()=>{
        setComplete(true)
        updateitem({products:products,product_type:'product'})
    }

    const Item=({item})=>{
        return(
            <View style={{borderBottomWidth:0.5,flexDirection:'row',paddingBottom:8,paddingTop:8,backgroundColor:'#fff'}}>
                <View style={[{flexDirection:'row'},{width:'100%',paddingLeft:12,paddingRight:12,overflow:'hidden'}]}>
                    <View style={styles.flexrow}>
                        <Pressable onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                            <ImageBackground style={styles.image} source={{uri:item.image}}></ImageBackground>
                        </Pressable>
                    </View>
                    <View style={{marginLeft:8,flex:1,alignItem:'flex-start',marginRight:8}}> 
                        <View style={[{marginBottom:4,height:32}]}>
                            <Text numberOfLines={2} style={{color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>{item.name}</Text>   
                        </View>
                        
                        <View style={[styles.flexcenter,{marginBottom:8}]}>
                            <Text>₫{formatter(item.min_price)}</Text>
                            {item.min_price!==item.max_price?<Text>₫{formatter(item.max_price)}</Text>:null}
                        </View> 
                        <View>
                            <Text style={{color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>SL: {item.inventory}</Text>   
                        </View>
                    </View>
                    <Pressable  onPress={()=>removeitem(item.id)}>
                        <Svg style={[styles.svg_icon3,{color:'#ee4d2d'}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M2,4 C1.72385763,4 1.5,3.77614237 1.5,3.5 C1.5,3.22385763 1.72385763,3 2,3 L6,2.999 L6,2 C6,1.44771525 6.44771525,1 7,1 L10,1 C10.5522847,1 11,1.44771525 11,2 L11,2.999 L15,3 C15.2761424,3 15.5,3.22385763 15.5,3.5 C15.5,3.77614237 15.2761424,4 15,4 L14,4 L14,14 C14,14.5522847 13.5522847,15 13,15 L4,15 C3.44771525,15 3,14.5522847 3,14 L3,4 L2,4 Z M13,4 L4,4 L4,14 L13,14 L13,4 Z M6.5,7 C6.77614237,7 7,7.22385763 7,7.5 L7,11.5 C7,11.7761424 6.77614237,12 6.5,12 C6.22385763,12 6,11.7761424 6,11.5 L6,7.5 C6,7.22385763 6.22385763,7 6.5,7 Z M8.5,6 C8.77614237,6 9,6.22385763 9,6.5 L9,11.5 C9,11.7761424 8.77614237,12 8.5,12 C8.22385763,12 8,11.7761424 8,11.5 L8,6.5 C8,6.22385763 8.22385763,6 8.5,6 Z M10.5,7 C10.7761424,7 11,7.22385763 11,7.5 L11,11.5 C11,11.7761424 10.7761424,12 10.5,12 C10.2238576,12 10,11.7761424 10,11.5 L10,7.5 C10,7.22385763 10.2238576,7 10.5,7 Z M10,2 L7,2 L7,2.999 L10,2.999 L10,2 Z"></Path></Svg>
                    </Pressable>
                </View>
            </View> 
          )
    }

    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Chi tiết sản phẩm</Text>
                </View>
                <Pressable>
                    <Svg height="19" viewBox="0 0 19 19" width="19" style={[styles.svg_icon3,{color:'#ee4d2d'}]}><G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G></Svg>
                </Pressable>
            </View>
            <View>
                <FlatList
                    data={products}
                    renderItem={({item})=><Item 
                    item={item}
                    />}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={[styles.fotter,{padding:8}]}>
                <StyleBtn1 onPress={()=>navigation.navigate("ProductOffer",{items:list_items(items),product_type:'product'})} active style={[{flex:1},styles.item_center]}><Text>Thêm sản phẩm</Text></StyleBtn1>
                <Pressable onPress={comfirm} style={[styles.btn,{flex:1,backgroundColor:"#ee4d2d"}]}>
                    <Text style={{color:'#fff'}}>Xác nhận</Text>
                </Pressable>
            </View>  
        </Container>
    )
}

const mapStateToProps = state => ({
    token:state.auth.token,items_choice:state.seller.items_choice,date:state.seller.date,indexchoice:state.seller.indexchoice
});
  
export default connect(mapStateToProps,{updateitem,updatedate})(Productvoucher);

