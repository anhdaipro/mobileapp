import { Pressable,TextInput,View,Text,SafeAreaView,
  StyleSheet,TouchableHighlight, ScrollView } 
from "react-native"
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
import {useState,useRef,useEffect,useTransition,useMemo} from 'react'
import {connect} from 'react-redux'
import { cityListURL } from "../../../urls";
import axios from "axios"
import { updatecity } from "../../../actions/auths";
import {styles,Container} from "../styles"
const Contentinput=styled.View`
padding:4px 8px;
background-color:rgba(0,0,0,0.08);
flex:1;
flex-direction:row;
align-items:center
`
const StyleBtn=styled.Pressable`
padding:4px 8px;
border:1px solid ${props=>props.active?'#ee4d2d':'rgba(0,0,0,.1)'}
`
const Boxchoice=styled.View`
border:1px solid rgba(0,0,0,0.1);
flex-direction:row;
align-items:center;
padding:8px
`
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`

const Editcity=(props)=>{
  const {type,navigation,route,updatecity}=props
  const [state, setState] = useState({showcity:false,level:1,administrative_units:['Tỉnh/Thành phố','Quận/Huyện','Phường/Xã'], message:'',errors: {},address_chocie:''})
  const [addresschoice,setAddressChoice]=useState({city_choice:{'name':null,'matp':null,level:1},
  district_choice:{'name':null,'matp':null,level:2,'maqh':null},
  town_choice:{'name':null,'maqh':null,level:3},showcity:false})
  const [cities,setCities]=useState([])
  const {city_choice,district_choice,town_choice}=addresschoice
  const [keyword,setKeyword]=useState('')
  const [isPending,startTransition]=useTransition()
  const {address}=route.params
  useEffect(() => {
    (async ()=>{
      const res =await axios.get(cityListURL)
      const data=res.data
      setCities(data)
      if(type=='update'){
        const datacity=data.find(item=>item.name==address.city && item.level==1)    
        const datadistrict=data.find(item=>item.name==address.district && item.matp==datacity.matp && item.level==2)
        const datatown=data.find(item=>item.name==address.town && item.maqh==datadistrict.maqh && item.level==3)
        setAddressChoice(prev=>{return{...prev,city_choice:{name:address.city,matp:datacity.matp,level:1},district_choice:{name:address.district,matp:datadistrict.matp,level:2,maqh:datadistrict.maqh},town_choice:{name:address.town,maqh:datatown.maqh,level:3}}})
      }
    })()
  }, [type])
  const datacity=useMemo(()=>{
    return keyword?cities.filter(item=>item.name.indexOf(keyword)!==-1):cities
  },[keyword])

  const setcity=(city)=>{
    setAddressChoice({...addresschoice,city_choice:{'name':city.name,'matp':city.matp,level:1},district_choice:{'name':null,'matp':null,level:2,'maqh':null},
    town_choice:{'name':null,'maqh':null,level:3}})
    setState({...state,change:true,level:2})
  }

  const setdistrict=(district)=>{
    setAddressChoice({...addresschoice,district_choice:{'name':district.name,'matp':district.matp,level:2,'maqh':district.maqh},town_choice:{'name':null,'maqh':null,level:3}})
    setState({...state,change:true,level:3})
  }
  
  const settown=(town)=>{
    setAddressChoice({...addresschoice,town_choice:{'name':town.name,'maqh':town.maqh,level:3}})
    setState({...state,change:false,level:1,showcity:false})
    updatecity({town:town.name,district:district_choice.name,city:city_choice.name})
    navigation.navigate("Newaddress")
  }

  const clearAddress=()=>{
      setState({...state,change:false,level:1})
      setAddressChoice({city_choice:{'name':null,'matp':null,level:1},
      district_choice:{'name':null,'matp':null,level:2,'maqh':null},
      town_choice:{'name':null,'maqh':null,level:3},showcity:false})
  }
  const handesearch=(text)=>{
    startTransition(()=>{
      setKeyword(text)
    })
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
          <Contentinput>
            <Svg height="19" viewBox="0 0 19 19" width="19" style={[styles.svg_icon,{marginRight:4}]}><G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G></Svg>
            <TextInput style={{flex:1}} onChangeText={text=>handesearch(text)} value={keyword} placeholder="Tìm kiếm Quận/Huyện,Phường/Xã"/>
          </Contentinput>
        </View> 
        <View style={{paddingTop:8,paddingBottom:8}}>
          <View style={styles.item_space}>
            <Styletext second>Khu vực được chọn</Styletext>
            <Pressable onPress={clearAddress}><Styletext primary>Thiết lập lại</Styletext></Pressable>
          </View>
          <View>
            {city_choice.name?
            <View style={[styles.flexcenter,{padding:4}]}>
              <View style={{width:10,height:10,borderRadius:5,backgroundColor:'rgba(0,0,0,0.1)',marginRight:8}}></View>
              <View>
                <Text> {city_choice.name}</Text>
              </View>
            </View>:null}
            {district_choice.name?
            <View style={[styles.flexcenter,{padding:4}]}>
              <View style={{width:10,height:10,borderRadius:5,backgroundColor:'rgba(0,0,0,0.1)',marginRight:8}}></View>
              <View>
                <Text>{district_choice.name}</Text> 
              </View>
            </View>:null}
            {town_choice.name?
            <View style={[styles.flexcenter,{padding:4}]}>
              <View style={{width:10,height:10,borderRadius:5,backgroundColor:'rgba(0,0,0,0.1)',marginRight:8}}></View>
              <View>
                <Text>{town_choice.name}</Text> 
              </View>
            </View>:null}
            <Boxchoice>
              <View style={{width:18,height:18,borderRadius:9,borderColor:'#ee4d2d',borderWidth:1,position:'relative',marginRight:8}}>
                <View style={{position:'absolute',left:2,top:2,backgroundColor:'#ee4d2d',borderRadius:6,width:12,height:12,}}></View>
              </View>
              <View>
                <Text style={styles.textorange}>Chọn {state.level==2?'Quận/Huyện':"Phường/Xã"}</Text>
              </View>
            </Boxchoice>
          </View>
        </View>
      </View>
      <View>
        <View>
          <View>
            <Text>Sử dụng vị trí hiện tại của tôi</Text>
          </View>
          <View style={{borderBottomWidth:1,borderColor:'rgba(0,0,0,0.08)'}}> 
            <Text>{state.level==1?'Tỉnh/Thành phố':state.level==2?'Quận/Huyện':"Phường/Xã"}</Text>      
          </View>
        </View>
        <View>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{padding:12}}
          >
          {state.level==1?
          <>
            {datacity.map((city,i)=>{
              if(city.level==1){
                return(
                <Pressable key={i} onPress={()=>setcity(city)} style={{paddingLeft:0,padding:8,borderBottomWidth:1,borderColor:'rgba(0,0,0,0.1)'}} className={`_8jiI7u ${city.name==city_choice.name?'_1xBdI3':''}`}>
                 <Text>{city.name}</Text>
                </Pressable>)
              }
            })}</>:
            state.level==2?
            <>
            {datacity.map((city,i)=>{
              if(city.level==2 && city.matp==city_choice.matp){
                return(
                <Pressable key={i} onPress={()=>setdistrict(city)} style={{paddingLeft:0,padding:8,borderBottomWidth:1,borderColor:'rgba(0,0,0,0.1)'}} className={`_8jiI7u ${city.name==district_choice.name?'_1xBdI3':''}`}>
                  <Text>{city.name}</Text>
                </Pressable>)
              }
            })}</>
            :<>
            {datacity.map((city,i)=>{
              if(city.level==3 && city.maqh==district_choice.maqh){
                return(
                <Pressable key={i} onPress={()=>settown(city)} style={{paddingLeft:0,padding:8,borderBottomWidth:1,borderColor:'rgba(0,0,0,0.1)'}} className={`_8jiI7u ${city.name==town_choice.name?'_1xBdI3':''}`}>
                  <Text>{city.name}</Text>
                </Pressable>)
              }
            })}
          </>}
          </ScrollView>
        </View>
      </View>
    </Container>
  )
}
const mapStateToProps = state => ({
    type:state.buyer.type
});
  
export default connect(mapStateToProps,{updatecity})(Editcity);
