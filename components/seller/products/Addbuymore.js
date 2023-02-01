
import React,{useState,useEffect,useMemo} from 'react';
import {useDispatch,useSelector} from "react-redux"
import styled from 'styled-components'
import { Btnorange, Container,Flexrow,styles,Styletext } from "../marketing/styles"
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
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TextInput,
  Alert,
  Modal,
  Dimensions,
  StyleSheet,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import { generateString } from '../../../constants';
import { v4 as uuid } from 'uuid';
import { updatebuymore } from '../../../actions/seller';
const Contentinput=styled.View`
flex:1;
padding:2px 4px;
border:1px solid rgba(0,0,0,0.1);
margin-right:12px
`
const Item=styled(Flexrow)`
padding:8px;
`
const Addbuymore=(props)=>{
    const unique_id = uuid();
    const {navigation,route}=props
    const {price}=route.params
    const small_id = unique_id.slice(0,8)
    const dispatch = useDispatch()
    const databuymore=useSelector(state=>state.seller.buymores)
    const [buymores,setBuymores]=useState(()=>databuymore)
    const [complete,setComplete]=useState(false)

    const  change=useMemo(()=>{
        if(JSON.stringify(buymores)!=JSON.stringify(databuymore)){
            return true
        }
        else{
            return false
        }
    },[buymores])

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
    const setbuymore=(itemchoice,name,value)=>{
        setBuymores(current=>current.map(item=>{
            if(item.id===itemchoice.id){
                return({...item,[name]:value})
            }
            return({...item,})
        }))
    }
    const addbuymore=()=>{
        const buymoreadd={id:small_id,from_quantity:buymores.length>0?buymores[buymores.length-1].to_quantity+1:buymores.length+1,to_quantity:'',price:''}
        setBuymores([...buymores,buymoreadd])
    }
    const removeitem=(itemchoice)=>{
        setBuymores(buymores.filter(item=>item.id!==itemchoice.id))
    }
    const editbuymore= ()=>{
        dispatch(updatebuymore(buymores))
        setComplete(true)
        navigation.goBack()
    }
    const valid=buymores.every(item=>item.price && item.price<price && item.from_quantity>1)
    const arr=buymores.reduce((arr,obj)=>{
        const item=[obj['from_quantity'],obj['to_quantity']]
        return [...arr,...item]
    },[])
    const isAscending=arr.filter((item,i)=>item>=arr[i+1]).length==0
    
    return(
        <Container>
            <View style={styles.flexcenter}>
                <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                    <View style={{marginRight:8,padding:4}}>
                        <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                    </View>
                </TouchableHighlight>
                <Text style={styles.fontbig}>Mua nhiều giảm giá</Text>
            </View>
            <View>
                <View>
                    <Text>Đặt đồng giá, số lượng hàng cho tất cả phân loại</Text>
                    <Text>Thay đổi hàng loạt</Text>
                </View>
                <View style={[styles.flexcenter,{padding:8,backgroundColor:'rgba(0,0,0,0.1)'}]}>
                    <View style={{flex:1,marginRight:12}}>
                        <Text>Đơn tối thiểu</Text>
                    </View>
                    <View style={{flex:1,marginRight:12}}>
                        <Text>Đơn tối đa</Text>
                    </View>
                    <View style={[{flex:2},styles.item_center]}>
                        <Text>Giá sản phẩm</Text>
                        <Svg style={[styles.svg_icon,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
                    </View>
                </View>
                <View style={{paddingBottom:8,backgroundColor:'#fff'}}>
                    <ScrollView>
                        {buymores.map(item=>
                        <Item key={item.id}>
                            <View style={{flex:1,marginRight:12}}>
                            <Contentinput style={styles.flexcenter}>
                                <TextInput
                                    keyboardType="numeric"
                                    maxLength={4}
                                    style={styles.input}
                                    placeholder="Tối thiểu"
                                    onChangeText={(text)=>setbuymore(item,'from_quantity',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                    value={item.from_quantity?item.from_quantity.toString():''}
                                />
                            </Contentinput>
                            </View>
                            <View style={{flex:1,marginRight:12}}>
                            <Contentinput style={[styles.flexcenter]}>
                                <TextInput
                                    keyboardType="numeric"
                                    maxLength={4}
                                    style={styles.input}
                                    placeholder="Tối đa"
                                    onChangeText={(text)=>setbuymore(item,'to_quantity',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                    value={item.to_quantity?item.to_quantity.toString():''}
                                />
                            </Contentinput>
                            </View>
                            <View style={[{flex:2,},styles.flexcenter]}>
                                <Contentinput style={[styles.flexcenter]}>
                                    <Text>đ </Text>   
                                    <TextInput
                                        keyboardType="numeric"
                                        maxLength={8}
                                        placeholder="0"
                                        style={styles.input}
                                        onChangeText={(text)=>setbuymore(item,'price',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                        value={item.price?item.price.toString():''}
                                    />
                                </Contentinput>
                                <Pressable onPress={()=>removeitem(item)}>
                                    <Svg style={styles.svg_icon3} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><G fill-rule="nonzero"><Path d="M14.516 3.016h-4v-1a.998.998 0 0 0-.703-.955.99.99 0 0 0-.297-.045h-3a.998.998 0 0 0-.955.703.99.99 0 0 0-.045.297v1h-4a.5.5 0 1 0 0 1h1v10a.998.998 0 0 0 .703.955.99.99 0 0 0 .297.045h9a.998.998 0 0 0 .955-.703.99.99 0 0 0 .045-.297v-10h1a.5.5 0 1 0 0-1zm-8-1h3v1h-3v-1zm6 12h-9v-10h9v10z"></Path><Path d="M5.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5zM8.016 12.016a.5.5 0 0 0 .5-.5v-5a.5.5 0 1 0-1 0v5a.5.5 0 0 0 .5.5zM10.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5z"></Path></G></Svg>
                                </Pressable>
                            </View>
                        </Item>
                        )}
                    </ScrollView>
                    
                </View>
                {buymores.length<5 && (
                <View style={{marginTop:8,backgroundColor:'#fff',padding:12}}>
                    <Pressable style={styles.flexcenter} onPress={addbuymore}>
                        <Svg style={[styles.svg_icon3,{color:'#ee4d2d',marginRight:8}]} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fillRule="evenodd" clipRule="evenodd" d="M12.387 5.807a.387.387 0 1 0-.774 0v5.806H5.806a.387.387 0 1 0 0 .774h5.807v5.807a.387.387 0 1 0 .774 0v-5.807h5.807a.387.387 0 1 0 0-.774h-5.807V5.807z"></Path><Path fillRule="evenodd" clipRule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-.774c6.2 0 11.226-5.026 11.226-11.226C23.226 5.8 18.2.774 12 .774 5.8.774.774 5.8.774 12 .774 18.2 5.8 23.226 12 23.226z"></Path></Svg>
                        <Text>Thêm khoảng giá</Text>
                    </Pressable>   
                </View>)}
            </View>
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={valid&&isAscending?false:true} onPress={editbuymore} style={[styles.btn,{flex:1,backgroundColor:valid&&isAscending?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                    <Text style={{color:valid&&isAscending ?'#fff':'rgba(0,0,0,.2)'}}>Lưu</Text>
                </Pressable>
            </View>
        </Container>
    )
}
export default Addbuymore