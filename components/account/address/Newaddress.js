import { Pressable,TextInput,View,Text,SafeAreaView,StyleSheet,TouchableHighlight } from "react-native"
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
import styled from 'styled-components'
import {useState,useRef,useEffect} from 'react'
import {connect} from 'react-redux'
import { typeaddress } from "../../../constants";
import { cityListURL,updateAddressURL} from "../../../urls";
import axios from "axios"
import { updateaddress } from "../../../actions/auths";
import {styles,Container} from "../styles"
const StyledView=styled.View`
padding:8px 12px;
background-color:#fff;
position:relative
`
const StyleBtn=styled.Pressable`
padding:4px 8px;
margin-left:8px;
border:1px solid ${props=>props.active?'#ee4d2d':'rgba(0,0,0,.1)'}
`
const Title=styled.View`
padding:8px 12px
`
const StyleSwitch=styled.View`
position:relative;
border-radius:12px;
width:36px;
margin-left:4px;
background-color:${props=>props.default?'#5c7':'#b7b7b7'};
height:20px;
`
const Swidth=styled.View`
left:${props=>props.default?18:2}px;
background-color: #fff;
border-radius: 8px;
position:absolute;
width: 16px;
height: 16px;
margin-top: 2px;
`
const Newaddress=(props)=>{
  const {navigation,addresschoice,type,addresses,route}=props
  const [address,setAddress]=useState({address:'',address_choice:'',default:false,name:'',phone_number:''}); 
  const {headers}=route.params
  useEffect(() => {
    if(type){
      setAddress(addresschoice)
    }
  }, [type])
  
  const submit= async ()=>{
    const form={...address,address_type:'S',city:city_choice.name,action:address.id?'update':'default',
    district:district_choice.name,town:town_choice.name}
    const res= await axios.post(updateAddressURL,JSON.stringify(form),headers())
    let data=res.data
    const list_addresses=data.id?addresses.map(address=>{
      if(data.default && data.id!=address.id){
          return({...address,default:false})
        }
      else{
        return({...address})
      }
    }):[...addresses,data]
    updateaddress(list_addresses)
    navigation.navigate("Listaddress")
  }
  return(
        <Container>
            <View style={styles.header}>
                <View style={styles.item_center}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Địa chỉ mới</Text>
                </View> 
            </View>
            <View>
                <View>
                    <Title><Text>Liên hệ</Text></Title>
                    <StyledView style={{borderBottomWidth:0.8,borderColor:'rgba(0,0,0,0.1)'}}>
                        <TextInput value={address.name} onChangeText={(text)=>setAddress({...address,name:text})} placeholder='Họ và tên'/>
                    </StyledView>
                    <StyledView>
                        <TextInput value={address.phone_number} onChangeText={(text)=>setAddress({...address,phone_number:text})} placeholder="Số điện thoại" />
                    </StyledView>
                </View>
                <View>
                    <Title><Text>Địa chỉ</Text></Title>
                    <StyledView style={{borderBottomWidth:0.8,borderColor:'rgba(0,0,0,0.1)'}}>
                        <Pressable style={styles.item_space} onPress={()=>navigation.navigate("FormAddress",{address})}>
                            <Text>{address.city?`${address.town}, ${address.district}, ${address.city}`:'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView>
                        <TextInput value={address.address} onChangeText={(text)=>setAddress({...address,address:text})} placeholder="Tên đường, tòa nhà, số nhà."/>
                    </StyledView>
                </View>
                <View>
                  <Title><Text>Cài đặt</Text></Title>
                    <StyledView style={[{borderBottomWidth:0.8,borderColor:'rgba(0,0,0,0.1)'},styles.item_space]}>
                        <Text>Loại địa chỉ</Text>
                        <View style={styles.flexcenter}>
                          {typeaddress.map(item=>
                            <StyleBtn active={address.address_choice==item?true:false} onPress={()=>setAddress({...address,address_choice:item})} key={item}>
                              <Text>{item}</Text>
                            </StyleBtn>
                          )} 
                        </View>
                    </StyledView>
                    <StyledView style={[styles.item_space]}>
                      <Text>Đặt làm địa chỉ mặc định</Text>
                      <Pressable onPress={()=>setAddress({...address,default:!address.default})}>
                        <StyleSwitch default={address.default}>
                          <Swidth default={address.default}/>
                        </StyleSwitch>
                      </Pressable>
                    </StyledView>
                </View>
                <View>
                  <Pressable onPress={(e)=>submit(e)} style={[styles.btn,{marginBottom:12,backgroundColor:address.address && address.name ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                  <Text style={{color:address.address && address.name ?'#fff':'rgba(0,0,0,.2)'}}>Hoàn thành</Text>
                  </Pressable>
                </View>
            </View>
        </Container>
    )
}
const mapStateToProps = state => ({
    addresschoice:state.buyer.address,type:state.buyer.type,
    addresses:state.buyer.addresses
});
  
export default connect(mapStateToProps)(Newaddress);

