import { Container, styles } from "../marketing/styles"
import React,{useState,useEffect,useMemo} from 'react';
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
  import {
    View,
    Text,
    Pressable,
    StatusBar,
    ScrollView,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    TextInput,
    Dimensions,
    StyleSheet,
    ImageBackground
  } from 'react-native';
  import axios from 'axios';
import { updateiteminfo, updateshipping, updatevariation } from "../../../actions/seller";
import {listshippingURL, shippingshopURL} from "../../../urls"
import {groupBy} from "../../../constants"
import styled from "styled-components"
import {useSelector,useDispatch} from "react-redux"
const StyleSwitch=styled.View`
position:relative;
border-radius:16px;
width:48px;
margin-left:4px;
background-color:${props=>props.open?'#5c7':'#b7b7b7'};
height:28px;
`
const Swidth=styled.View`
left:${props=>props.open?22:2}px;
background-color: #fff;
border-radius: 12px;
position:absolute;
width: 24px;
height: 24px;
margin-top: 2px;
`
const Dot=styled.View`
margin-left:12px;
height:1px;
width:100%;
background-color:rgba(0,0,0,0.1)
`
const StyledView=styled.View`
padding:12px 0;
position:relative;
border-color:rgba(0,0,0,0.1);
border-bottom-width:${props=>props.second?0:1}px
`
const Feeship=(props)=>{
    const {navigation,route}=props
    const {shipping}=route.params
    const iteminfo=useSelector(state => state.seller.iteminfo)
    const [formData,setformData]=useState(()=>iteminfo)
    const datashipping= useSelector(state => state.seller.shippings)
    const [shipping_item,setShippingitem]=useState(()=>datashipping)
    const dispatch = useDispatch()
    const [loading,setLoading]=useState(false)
    const [complete,setComplete]=useState(false)

    const  change=useMemo(()=>{
        if(JSON.stringify(shipping_item)!=JSON.stringify(datashipping)){
            return true
        }
        else{
            return false
        }
    },[shipping_item])

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
        [navigation, complete,change]
    );
    
    useEffect(()=>{
        setShippingitem(datashipping)
    },[datashipping])

    
    const setenabled=(key)=>{
        const datashipping_item=shipping_item.map(item=>{
            if(item.method==key){
                return({...item,enabled:!item.enabled})
            }
            return({...item})
        })
        
        setShippingitem(datashipping_item)
    }
    const valid=shipping_item.find(item=>item.enabled)
    const setshipping=()=>{
        dispatch(updateshipping(shipping_item))
        dispatch(updateiteminfo(formData))
        navigation.goBack()
    }
    console.log(shipping_item)
    return(
        <Container>
            <View style={styles.flexcenter}>
                <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                    <View style={{marginRight:8,padding:4}}>
                        <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" strokeWidth="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                    </View>
                </TouchableHighlight>
                <Text style={styles.fontbig}>Phí vận chuyển</Text>
            </View>
            <View style={[{marginTop:8,backgroundColor:'#fff',padding:12},styles.item_space]}>
                <View style={styles.item_space}>
                    <Text style={styles.textorange}><Text style={styles.textnomal}>Cân nặng sản phẩm </Text>*</Text>
                </View>
                <View>
                    <TextInput 
                        maxLength={8}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="Nhập cân nặng"
                        onChangeText={text=>setformData({...formData,weight:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                        value={formData.weight?formData.weight.toString():''}
                    />
                </View>
            </View>
            <View style={{marginTop:8,backgroundColor:'#fff',paddingLeft:12,paddingRight:12}}>
                <StyledView style={styles.item_space}>
                    <View>
                        <Text style={styles.textnomal}>Chiều rộng (cm)</Text>
                    </View>
                    <View>
                        <TextInput 
                            maxLength={8}
                            keyboardType="numeric"
                            style={styles.input}
                            placeholder="Nhập chiều rộng"
                            onChangeText={text=>setformData({...formData,width:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                            value={formData.width?formData.width.toString():''}
                        />
                    </View>
                </StyledView>
                <StyledView  style={styles.item_space}>
                    <View>
                        <Text style={styles.textnomal}>Chiều dài (cm)</Text>
                    </View>
                    <View>
                        <TextInput 
                            maxLength={8}
                            keyboardType="numeric"
                            style={styles.input}
                            placeholder="Nhập chiều dài"
                            onChangeText={text=>setformData({...formData,length:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                            value={formData.length?formData.length.toString():''}
                        />
                    </View>
                </StyledView>
                <StyledView second style={styles.item_space}>
                    <View>
                        <Text style={styles.textnomal}>Chiều cao (cm)</Text>
                    </View>
                    <View>
                        <TextInput 
                            maxLength={8}
                            keyboardType="numeric"
                            style={styles.input}
                            placeholder="Nhập chiều cao"
                            onChangeText={text=>setformData({...formData,height:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                            value={formData.height?formData.height.toString():''}
                        />
                    </View>
                </StyledView>
                
            </View>
            <View style={{marginTop:12}}>
                {shipping &&(
                <ScrollView>
                    {shipping.map(ship=>
                    <View key={ship.method} style={{marginBottom:12}}>
                        <View style={[{padding:12},styles.item_space]}>
                            <View>
                                <Text>{ship.method}</Text>
                                {!formData.weight?<Text style={[styles.textorange,{lineHeight:20}]}>Dơn vị vận chuyển không được hỗ trợ</Text>:null}
                            </View>
                            <Pressable disabled={formData.weight?false:true} onPress={()=>setenabled(ship.method)}>
                                <StyleSwitch open={shipping_item.some(item=>item.enabled && ship.method==item.method)?true:false}>
                                    <Swidth open={shipping_item.some(item=>item.enabled && ship.method==item.method)?true:false}/>
                                </StyleSwitch>
                            </Pressable>
                        </View>
                        <Dot/>
                        <View>
                        {ship.unit.map((item,index)=>
                            <View key={index} style={[styles.item_space,{padding:12}]}>
                                <View>
                                    <Text style={styles.textsecond}>{item.shipping_unit}</Text> 
                                    {!formData.weight || formData.weight>item.allowable_volume?<Text style={[styles.textorange,{lineHeight:20}]}>Bắt buộc nhập cân nặng</Text>:null}
                                </View>
                                <View>
                                    <Text >(Tối đa {item.allowable_volume}g)</Text>
                                </View>
                                
                            </View>
                        )}
                        </View>
                    </View>
                    )}
                </ScrollView>)}
            </View>
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={valid?false:true} onPress={setshipping} style={[styles.btn,{flex:1,backgroundColor:valid?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                    <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Lưu</Text>
                </Pressable>
            </View>
        </Container>
    )
}
export default Feeship