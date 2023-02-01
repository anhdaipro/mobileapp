import { TouchableHighlight, StyleSheet,Dimensions, Text, StatusBar,Image,Pressable,Modal,TouchableNativeFeedback,
    View,SafeAreaView, ImageBackground, ScrollView,TouchableWithoutFeedback } 
  from "react-native";
  import {styles,Container} from "../styles"
  import {profiledURL } from "../../../urls";
  import React, { useState, useEffect,useRef, useMemo } from 'react';
  import axios from "axios"
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
import {connect,useSelector} from "react-redux"
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateString } from "../../../constants";
import styled from "styled-components"
import { updateprofile,updateuser } from "../../../actions/auths";
import ScrollPicker from "../../../hocs/Picker";
const BoxItem=styled.Pressable`
padding:8px;
flex-direction:row;
align-items:center;
justify-content:space-between
`
const StyleModalContent=styled.View`
width:100%
`
const Scrollbar=styled.View`
margin:4px;
flex:1;
flex-direction:row;
position:relative
`
const Timelist=styled.View`
margin:0
`

const {width} = Dimensions.get('window');
const height = width*0.6;
const genders=['MALE','FEMALE','OTHER']
const Profile=(props)=>{
  const {profile,navigation,updateprofile,updateuser}=props
  const [avatar, setAvatar] = useState(null);
  const [state,setState]=useState({action:'gender'})
  const[show,setShow]=useState(false)
  const [loading,setLoading]=useState(false)
  
  const [formData,setformData]=useState({phone:'',date:1,month:1,year:2000,username:'',name:'',email:'',avatar:null})
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
  
  useEffect(() => {
    (async()=>{
      try{
      if(token){
        const res = await axios.get(profiledURL,headers())
        const data = res.data
        setLoading(true)
        setAvatar(data.avatar)
        updateprofile({...data,date:data.date_of_birth!=null?new Date(data.date_of_birth).getDate():1,month:data.date_of_birth!=null?new Date(data.date_of_birth).getMonth()+1:1,year:data.date_of_birth!=null?new Date(data.date_of_birth).getFullYear():2020})
      }
    }
      catch(e){
        console.log(e)
      }
    })()
  },[token])
  
  const setdate=(name,value)=>{
    setformData({...formData,[name]:value})
    if(new Date(value,profile.month,profile.date)=="Invalid Date"){  
        setState({...state,valid_date:true}) 
    }
    else{
      setState({...state,valid_date:false}) 
    }
    
  }
  const saveinfo= async ()=>{
    let form=new FormData()
    let photo = {
        uri: avatar,
        name:generateString(12),
        type: 'image/*',
      };
    form.append('file',photo)
    const res = await axios.post(profiledURL,form,{headers:{ Authorization:`JWT ${token}`,'Content-Type': 'multipart/form-data'}})
      updateprofile({avatar:avatar})
      updateuser({avatar:avatar})
    }
    
    const year_now=new Date().getFullYear()
    const list_year=Array(year_now).fill().map((_, i) => i).filter(item=>item>year_now-100).reverse()
    const indexyear=list_year.findIndex(item=>item==formData.year)
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        setAvatar(result.uri);
      }
    };
    const editgender=()=>{
      setShow(true)
      setState({...state,action:'gender'})
    }
    const editbirdthday=()=>{
      setShow(true)
      setState({...state,action:'birthday'})
      setformData({...formData,date:profile.date,month:profile.month,year:profile.year})
    }
    const updategender=(item)=>{
      let form=new FormData()
      form.append('gender',item)
      axios.post(profiledURL,form,{headers:{ Authorization:`JWT ${token}`,'Content-Type': 'multipart/form-data'}})
      .then(res=>{
        updateprofile({gender:item})
        setShow(false)
      })
    }
    const onchangedate=(nativeEvent)=>{
      if(nativeEvent){
        const index=Math.round(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
        setdate('date',index+1)
      }
    }
    const onchangemonth=(nativeEvent)=>{
      if(nativeEvent){
        const index=Math.round(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
        setdate('month',index+1)
      }
    }
    const onchangeyear=(nativeEvent)=>{
      if(nativeEvent){
        const index=Math.round(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
        setdate('year',list_year[index])
      }
      console.log(nativeEvent)
    }
    const {date,month,year}=formData
    console.log(headers)
    const updatebirthday=()=>{
      let form=new FormData()
      form.append('date_of_birth',`${year}-${('-'+month).slice(-2)}-${('-'+date).slice(-2)}`)
      axios.post(profiledURL,form,{headers:{ Authorization:`JWT ${token}`,'Content-Type': 'multipart/form-data'}})
      .then(res=>{
        updateprofile({date_of_birth:`${year}-${('-'+month).slice(-2)}-${('-'+date).slice(-2)}`,year,month,date})
        setShow(false)
      })
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
                    <Text style={styles.fontbig}>Sửa hồ sơ</Text>
                </View>
                {profile?
                <Pressable disabled={avatar && profile &&  profile.avatar!=avatar?false:true} onPress={saveinfo}>
                    <Svg enableBackground="new 0 0 12 12" style={[styles.svg_icon1,{color:avatar && profile.avatar!=avatar?'#757575':'rgba(0,0,0,0.1)'}]} viewBox="0 0 12 12" x="0" y="0"><G><Path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></Path></G></Svg>
                </Pressable>:null}
            </View>
            {profile?
            <View>
                <View>
                    <Pressable onPress={pickImage}>
                        <View style={[{backgroundColor:'#ee4d2d',width,height},styles.item_center]}>
                            <View style={{width: 80, height: 80,borderRadius:40,overflow:'hidden',position:'relative',backgroundColor:'#fff'}}>
                                
                                <View style={[{zIndex:10,width:'100%',position:'absolute',bottom:0,padding:1,backgroundColor:'rgba(0,0,0,0.5)'},styles.item_center]}>
                                   <Text style={styles.textwhite}> Sửa</Text>
                                </View>
                                {avatar && <ImageBackground source={{ uri: avatar }} resizeMode="contain" style={{ width: 80, height: 80}} />}
                            </View>
                            
                        </View>
                        <View style={{backgroundColor:'rgba(0,0,0,0.1)',padding:2,flex:1}}>
                            <Text style={styles.textwhite}>Chọn để thay đổi</Text>
                        </View>
                    </Pressable>
                </View>
                <View>
                    <BoxItem onPress={()=>navigation.navigate("Editname",{name:profile.name,token:token})}>
                        <Text>Tên</Text>
                        <View style={styles.flexcenter}>
                            <Text style={{color:profile.name?'#333':'rgba(0,0,0,0.2)'}}>{profile.name?profile.name:"Thiết lập ngay"}</Text>
                            <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </View>
                    </BoxItem>
                    <BoxItem onPress={()=>navigation.navigate("EditBio",{bio:profile.bio,token:token})}>
                        <Text>Bio</Text>
                        <View style={styles.flexcenter}>
                            <Text style={{color:profile.bio?'#333':'rgba(0,0,0,0.2)'}}>{profile.bio?profile.bio:"Thiết lập ngay"}</Text>
                            <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </View>
                    </BoxItem>
                </View>
                <View>
                    <BoxItem onPress={editgender}>
                        <Text>Gới tính</Text>
                        <View style={styles.flexcenter}>
                            <Text>{profile.gender}</Text>
                            <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </View>
                    </BoxItem>
                    <BoxItem onPress={editbirdthday}>
                        <Text>Ngày sinh</Text>
                        <View style={styles.flexcenter}>
                            <Text>{('0'+profile.date).slice(-2)}-{('0'+profile.month).slice(-2)}-{profile.year}</Text>
                            
                            <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </View>
                    </BoxItem>
                </View>
                <Pressable onPress={saveinfo} style={styles.btn}>
                    <Text>Save</Text>
                </Pressable>
            </View>:null}
            <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
              <TouchableWithoutFeedback >
                <View style={styles.modal}>
                    
                    <View style={styles.modal_content}>
                      <View style={[{marginBottom:8,padding:8,width:'100%'},styles.item_center]}><Text style={{fontWeight:'500',fontSize:16}}>{state.action==='gender'?"Giới tính":"Chọn ngày"}</Text></View> 
                      {state.action==='gender'?
                      <View>
                        {genders.map((item,i)=>
                          <Pressable onPress={()=>updategender(item)} key={i}>
                            <View style={{padding:8}}>
                              <Text>{item}</Text>
                            </View>
                          </Pressable>
                        )}
                      </View>:
                      <View>
                        <View style={[{padding:12,borderColor:'rgba(0,0,0,0.1)',borderBottomWidth:1},styles.flexcenter]}>  
                          <Scrollbar>
                          <ScrollPicker
                            dataSource={Array(31).fill().map((_, i)=>i+1)}   
                            renderItem={(data, index, isSelected) => <Pressable onPress={()=>setdate('date',data)}>
                              <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{data}</Text>
                            </Pressable>}
                              selectedIndex={formData.date-1}
                              itemHeight={40}
                              style={{marginRight:4}}
                              wrapperHeight={200}
                              wrapperColor={'#ffffff'}
                              highlightColor={'#d8d8d8'}
                              onValueChange={(data, selectedIndex) => {
                              setdate('date',selectedIndex+1)
                            }} 
                          />
                          </Scrollbar>
                          <Scrollbar>
                          <ScrollPicker
                              dataSource={Array(12).fill().map((_, i)=>i+1)}   
                              renderItem={(data, index, isSelected) => <Pressable>
                                <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{data}</Text>
                            </Pressable>}
                            selectedIndex={formData.month-1}
                            itemHeight={40}
                            wrapperHeight={200}
                            wrapperColor={'#ffffff'}
                            highlightColor={'#d8d8d8'}
                            onValueChange={(data, selectedIndex) => {
                              setdate('month',selectedIndex+1)
                            }} 
                          />
                          </Scrollbar>
                          <Scrollbar>
                          <ScrollPicker
                              dataSource={list_year}   
                              renderItem={(data, index, isSelected) => <Pressable>
                                <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{data}</Text>
                            </Pressable>}
                            selectedIndex={indexyear}
                            itemHeight={40}
                            wrapperHeight={200}
                            wrapperColor={'#ffffff'}
                            highlightColor={'#d8d8d8'}
                            onValueChange={(data, selectedIndex) => {
                              setdate('year',list_year[selectedIndex])
                            }} 
                          />  
                          </Scrollbar>
                        </View>
                        <View style={styles.flexcenter}>
                          <Pressable onPress={()=>setShow(false)} style={[{flex:1,borderColor:'rgba(0,0,0,0.1)',borderRightWidth:1,padding:8},styles.item_center]}>
                            <Text>Hủy</Text>
                          </Pressable>
                          <Pressable onPress={updatebirthday} style={[{flex:1},styles.item_center]}>
                            <Text style={styles.textorange}>Hoàn thành</Text>
                          </Pressable>
                        </View>
                      </View>}
                    </View>
                    
                </View>
              </TouchableWithoutFeedback>
            </Modal>
        </Container>
    )
}

const mapStateToProps = state => ({
   profile:state.auth.profile
});
  
export default connect(mapStateToProps,{updateprofile,updateuser})(Profile);
