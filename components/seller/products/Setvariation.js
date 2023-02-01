
import { updatevariationURL } from "../../../urls"
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
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Image,
    Alert,
    FlatList,
    TextInput,
    Dimensions,
    StyleSheet,
    ImageBackground
  } from 'react-native';
  import axios from 'axios';
import { updatevariation } from "../../../actions/seller";
import {useSelector,useDispatch} from "react-redux"
const Setvariation=(props)=>{
    const {route,navigation}=props
    const datavariations = useSelector(state => state.seller.variations)
    const [variations,setVariations]=useState([])
    const datacolors = useSelector(state => state.seller.colors)
    const dispatch = useDispatch()
    const colors=datacolors.filter(color=>color.choice)
    const [complete,setComplete]=useState(false)
    useEffect(()=>{
        setVariations(datavariations)
    },[datavariations])
    const  change=useMemo(()=>{
        if(JSON.stringify(variations)!=JSON.stringify(datavariations)){
            return true
        }
        else{
            return false
        }
    },[variations])
    console.log(change)
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (complete ||(complete && !change)) {
                console.log(complete)
                console.log(change)
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
    const setvariation=(itemchoice,name,value)=>{
        setVariations(current=>current.map(variation=>{
            if(variation.variation_id===itemchoice.variation_id){
                return({...variation,[name]:value})
            }
            return({...variation})
        }))
    }
    const valid=variations.every(variation=>variation.price &&variation.inventory)
    const submit= ()=>{
        setComplete(true)
        dispatch(updatevariation(variations))
        
        navigation.goBack()
    }
    console.log(variations)
    return(
        <Container style={{backgroundColor:'transparent'}}>
            <View style={styles.flexcenter}>
                <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                    <View style={{marginRight:8,padding:4}}>
                        <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                    </View>
                </TouchableHighlight>
                <Text style={styles.fontbig}>Sửa nhanh</Text>
            </View>
            <View>
                <View>
                    <Text>Đặt đồng giá, số lượng hàng cho tất cả phân loại</Text>
                    <Text>Thay đổi hàng loạt</Text>
                </View>
                <View style={[styles.flexcenter,{padding:8,paddingLeft:12,backgroundColor:'rgba(0,0,0,0.1)'}]}>
                    <View style={{flex:2}}>
                        <Text>Phân loại hàng</Text>
                    </View>
                    <View style={{flex:1,marginRight:12}}>
                        <Text>Giá</Text>
                    </View>
                    <View style={[{flex:1},styles.flexcenter]}>
                        <Text>Kho hàng</Text>
                        <Svg style={[styles.svg_icon,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
                    </View>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <ScrollView>
                        {colors.map(color=>
                        <View key={color.value} style={{paddingBottom:8,paddingTop:8,marginBottom:8,paddingLeft:12}}>
                            <View style={{paddingBottom:8,borderColor:'rgba(0,0,0,0.1)',borderBottomWidth:1}}>
                               <Text>{color.value}</Text>
                            </View>
                            <View>
                            {variations.filter(variation=>variation.color_value==color.value).map((variation,index)=>
                                <View key={variation.variation_id} style={[styles.flexcenter,{padding:8,borderColor:'rgba(0,0,0,0.1)',borderBottomWidth:1}]}>
                                    <View style={{flex:2}}>
                                        <Text>{variation.size_value}</Text>
                                    </View>
                                    <View style={[{flex:1,borderColor:'rgba(0,0,0,0.1)',borderWidth:1,marginRight:12},styles.flexcenter]}>
                                        <Text style={{padding:2}}>đ </Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            maxLength={8}
                                            style={styles.input}
                                            onChangeText={(text)=>setvariation(variation,'price',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                            value={variation.price?variation.price.toString():''}
                                        />
                                    </View>
                                    <View style={{flex:1,borderColor:'rgba(0,0,0,0.1)',borderWidth:1}}>
                                        <TextInput
                                            keyboardType="numeric"
                                            maxLength={8}
                                            style={styles.input}
                                            onChangeText={(text)=>setvariation(variation,'inventory',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                            value={variation.inventory?variation.inventory.toString():''}
                                        />
                                    </View>
                                </View>
                            )}
                            </View>
                        </View>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={valid?false:true} onPress={submit} style={[styles.btn,{flex:1,backgroundColor:valid?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                    <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Xác nhận</Text>
                </Pressable>
            </View>
        </Container>
    )
}
export default Setvariation