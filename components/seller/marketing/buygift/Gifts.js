import styled from "styled-components"
import { formatter, itemvariation } from '../../../../constants';
import React, { useState, useEffect,useMemo } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
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
  import {styles,StyleBtn,Styletext,Styletext2,Styletext1} from "../styles"
  import {updateitem } from "../../../../actions/seller";
  import { headers } from '../../../../actions/auths';
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

const Gifts=(props)=>{
    const {route,navigation,token,updateitem,gifts_choice}=props
    const {itemchoice} =route.params
    const [product,setProduct]=useState(()=>itemchoice)
    const [complete,setComplete]=useState(false)
    const [show,setShow]=useState(false)
    const [check,setCheck]=useState(false)
    const [variations,setVariaitons]=useState(()=>itemchoice.variations)
    const  change=useMemo(()=>{
        if(JSON.stringify(itemchoice.variations)!=JSON.stringify(variations)){
            return true
        }
        else{
            return false
        }
    },[variations])

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
        [navigation, complete]
      );
    
    const setlistitem=(itemchoice,name,value)=>{
        setVariaitons(current=>current.map(item=>{
            if(item.variation_id===itemchoice.variation_id){
                return({...item,[name]:value})
            }
            return({...item,})
        }))
    }
    const comfirm=()=>{
        setComplete(true)
        const products=gifts_choice.map(item=>{
            if(item.id==product.id){
                return({...item,variations:products})
            }
            return({...item})
        })
        updateitem({products:products,product_type:'gift'})
        navigation.navigate("DetailGift",{})
    }

    const additem=()=>{
        navigation.navigate("Productoffer",{items:items,product_type:'gift'})
    }

    const valid=gifts.every(item=>item.variations.every(variation=>variation.percent_discount))
    const checkall=()=>{
        setVariaitons(current=>current.map(item=>{
            return({...item,check:true})
        }))
    }

    const choicevariation=()=>{
        setVariaitons(current=>current.map(item=>{
            return({...item,check:item.enable})
        }))
    }
    const setenable=()=>{
        setVariaitons(current=>current.map(item=>{
            return({...item,enable:item.check})
        }))
    }
    const list_enable_on=variation.filter(item=>item.enable)
    const Item=({item})=>{
        return(
            <View style={{borderBottomWidth:0.5,flexDirection:'row',padding:12,backgroundColor:'#fff'}}>
                <Flex>
                    <View style={[{height:80,marginRight:8},styles.item_center]}>
                        <Checkbox onPress={()=>{
                            setlistitem(item,'check',!item.check)
                            }} opacity={item.disabled?0.5:1} disabled={item.disabled?true:false} active={item.check?true:false}>
                            <View style={[styles.icon_check,{opacity:item.check?1:0}]}></View>
                        </Checkbox>
                    </View>
                    <Pressable onPress={() =>navigation.navigate('Product', { productID: item.item_id })}>
                        <ImageBackground style={styles.image} source={{uri:itemchoice.image}}></ImageBackground>
                    </Pressable>
                </Flex>
                <View style={{marginLeft:8,flex:1,alignItem:'flex-start',marginRight:8}}> 
                    <View style={[{marginBottom:4,height:32}]}>
                        <Text numberOfLines={2} style={{marginLeft:4,color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>{itemvariation(item)}</Text>   
                    </View>
                    
                    <View style={[styles.flexcenter,{marginBottom:8}]}>
                        <Text>₫{formatter(item.price)}</Text>
                    </View> 
                    <View>
                        <Text style={{color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>SL: {item.inventory}</Text>   
                    </View>
                    <View style={styles.flexcenter}>
                        <Text style={styles.textorange}>Đã chọn {list_enable_on.length} phân loại hàng</Text>
                        <Svg style={[styles.svg,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
                    </View>
                </View>
            </View>   
        )
    }
    return(
        <SafeAreaView>
            <Header>
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
            </Header> 
            <View>
                <FlatList
                    data={gifts_choice}
                    renderItem={({item})=><Item 
                    item={item}
                    setlistitem={(itemchoice,name,value)=>setlistitem(itemchoice,name,value)}
                    />}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.fotter}>
                <StyleBtn onPress={additem}>
                    <Text style={styles.textorange}>Thêm sản phẩm</Text>
                </StyleBtn>
                <Pressable onPress={comfirm} disabled={valid?false:true} style={[{flex:1,backgroundColor:valid?"#ee4d2d":"rgba(0,0,0,0.1)"},styles.btn]} onPress={submit}>
                    <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Xác nhận</Text>
                </Pressable>
            </View>  
            <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
                <TouchableWithoutFeedback onPress={(event) => event.target == event.currentTarget && setShow(false)}>
                    <View style={[styles.modal,{backgroundColor:'rgba(0,0,0,0.4)',borderRadius:4}]}>
                        <StyleModalContent>
                            <Headermodal>
                                <Text>Tình trạng</Text>
                            </Headermodal>
                            <View>
                                <View></View>
                                <FlatList
                                    data={variations}
                                    renderItem={({item})=><Item
                                    item={item}
                                    />}
                                    keyExtractor={item=>item.product_id}
                                />
                            </View> 
                            <View>
                                <View style={[styles.flexcenter]}>
                                    <Checkbox onPress={checkall} active={variations.some(item => !item.check)?false:true}>
                                        <View style={[styles.icon_check,{opacity:variations.some(item => !item.check)?0:1}]}></View>
                                    </Checkbox>
                                    <Text style={{color:'#757575',marginLeft:4}}>Chọn tất cả</Text>
                                </View>
                                <Pressable onPress={setenable} style={[{height:32},styles.item_center]}>
                                    <Text >Xác nhận</Text>
                                </Pressable>
                            </View>
                            
                        </StyleModalContent>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
        
    )
}
const mapStateToProps = state => ({
    token:state.auth.token,gifts_choice:state.seller.gifts_choice
});
  
export default connect(mapStateToProps,{updateitem})(Gifts);

