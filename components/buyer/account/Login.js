import { googleLogin,facebookLogin,login,loginotp } from "../../../actions/auths"
import { TouchableHighlight, StyleSheet, Text, StatusBar,Image,Pressable,
  View,Button,TextInput,SafeAreaView } 
from "react-native";
import { listflashsaleshopURL, listitemflashsalelURL,loginURL } from "../../../urls";
import React, { useState, useEffect } from 'react';
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
import {connect} from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login=({login, isAuthenticated,googleLogin,facebookLogin,navigation })=>{
  const [formData,setFormData]=useState({password:'',username:''})
  const [state,setState]=useState({showpass:false,showrepass:false,error_login:0})
  const { username, password } = formData;
  const [logingoogle,setLogingoogle]=useState(false)
  const [hiden,setHiden]=useState(true)
  const submit = () => {
    login(username,password)
  };
  useEffect(() => {
    if(isAuthenticated!=null){
      if(isAuthenticated){
        setState({...state,error_login:0})
        navigation.replace('Homepage')
      }
      else{
        setState({...state,error_login:state.error_login+1})
      }
    }
  },[isAuthenticated])
  
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } 
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
      } 
      else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
      } 
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
      } 
      else {
         // some other error happened
      }
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } 
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // user has not signed in yet
      } 
      else {
        // some other error
      }
    }
  };

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={hiden}/>
      <View style={styles.header}>
        <View style={styles.item_center}>
          <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
            <View style={{marginRight:8,padding:4}}>
              <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
            </View>
          </TouchableHighlight>
          <Text style={styles.fontbig}>Đăng nhập</Text>
        </View> 
        <View style={styles.flexcenter}>
          <Image style={{width:20,height:20}} source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANhSURBVHgB7ZlBTttAFIbfGydsKiTS0AU7d4cq0ronINlWQeQGSU7Q9gTACaAnCJygAbLHnKARoKo7vG6B0HbVBvv1TRK7xhnbs2htqvqTkGfsx5t5M79n5jkABQX/N6hjNGqZS/BzseUJMiEDhBCXlaOzAx3b1ABGrVWT3PIJF03IFgeNcaPS/+QkGQlIge7KPci+8xI5cL00o8QZmI3+pV8noh3IAETcCsrfjUrFHt7G2ZYS/IDrluu/p4js6uBiGzLgpllb56Gty7L3aNzhy16cbaKEBOFrv4wo9iEjCL3DoF0hNpNsYwOQ8gEkK7jxTRxCRgijvB+q1kd1aynWNu6B5xqtUPUwSYd/mkqf2yKw/fpMRkpiA0Ay2kEZ8T1kjK6MlAHkKR8fXRkpA8hTPj66MlIGkLd8fHRkNBfAQ5CPj46M5gKQm1eomot8fHRkNBeAIHgQ8vFJk9H8OzDbwqdPxSnkTERGVvR54lmIp9CJ3rtq1loCcdevu+R1nwwu7Kgdn2dOeArNaY2cx8fnjajNqLlWJxS9JF9SRjcbNb+a/g4wgea/cAOK57zEysRm+icm9UjHJguBnEnfTv0Celq+noVH3YG0APjIHGRCBojdcMOyYwJhPWzP70l70uEwdwvtqF9v0d2637FVk/93M80XuUYw23z2t6N+5/KBzxxxyTU+hG45BDDE6fTJ0VDuiGzT58stElr3luH7SF+29MH+6jG+JjYe0VcDeLAQA19oGE+jslYmNNcbz98g0C7Ec+sRdHk2ejGdmAZFcMCdAbZrJ/kiwJ2U9ng1op3q0Xw+otyJq8dne6zPLig0x72yeSReLg/O+/Iq66DqFGdv1cF5h+06s0wuzldDtucSNZQ20pfnvVV1XpKYUl69qnWEAf4qcfrDGHdWFEn2qGWZ7p1r8Vu5RIKcUqk0nGxCEeSigB6asjxeGNsqX9KmBLhFfkYGbnf5+OM+xJC4jIbhSC9XYr4QzHTppPlQLbcqm+tmraP1vQc0vko8dIoA8qYIIG+KAPKmCCBvigDy5p8PQPswR5yoXDfXtiEDUOALmUzokBiAPBoHJ27OshDQgiwIdZ5IOEmmiRKSR1vOvLR+LfwbcCL0Lu0IrnXsvtrg8zll8xOrD6eZQ5n1QUFBQSK/AOIXas82w/WyAAAAAElFTkSuQmCC'}} />
          <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.icon_back,{marginLeft:8}]} viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2zm-.012 8.238a.75.75 0 110 1.5.75.75 0 010-1.5zm.129-5.633c1.853 0 2.658 1.9 1.826 3.117-.174.254-.377.423-.672.593l-.156.084-.157.08c-.395.204-.464.28-.464.542a.5.5 0 11-1 0c0-.68.271-1.024.865-1.355l.408-.215c.175-.1.276-.185.35-.293.404-.591-.003-1.553-1-1.553-.7 0-1.289.408-1.36.948l-.007.11-.008.09a.5.5 0 01-.992-.09c0-1.22 1.122-2.058 2.367-2.058z"></Path></Svg>
        </View>
      </View>
      <View style={{marginBottom:24,marginTop:16}}>
        <View style={styles.item_center}>
          <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 109.59 122.88" enableBackground='new 0 0 109.59 122.88' xmlSpace="preserve"><G><Path d="M74.98,91.98C76.15,82.36,69.96,76.22,53.6,71c-7.92-2.7-11.66-6.24-11.57-11.12 c0.33-5.4,5.36-9.34,12.04-9.47c4.63,0.09,9.77,1.22,14.76,4.56c0.59,0.37,1.01,0.32,1.35-0.2c0.46-0.74,1.61-2.53,2-3.17 c0.26-0.42,0.31-0.96-0.35-1.44c-0.95-0.7-3.6-2.13-5.03-2.72c-3.88-1.62-8.23-2.64-12.86-2.63c-9.77,0.04-17.47,6.22-18.12,14.47 c-0.42,5.95,2.53,10.79,8.86,14.47c1.34,0.78,8.6,3.67,11.49,4.57c9.08,2.83,13.8,7.9,12.69,13.81c-1.01,5.36-6.65,8.83-14.43,8.93 c-6.17-0.24-11.71-2.75-16.02-6.1c-0.11-0.08-0.65-0.5-0.72-0.56c-0.53-0.42-1.11-0.39-1.47,0.15c-0.26,0.4-1.92,2.8-2.34,3.43 c-0.39,0.55-0.18,0.86,0.23,1.2c1.8,1.5,4.18,3.14,5.81,3.97c4.47,2.28,9.32,3.53,14.48,3.72c3.32,0.22,7.5-0.49,10.63-1.81 C70.63,102.67,74.25,97.92,74.98,91.98L74.98,91.98z M54.79,7.18c-10.59,0-19.22,9.98-19.62,22.47h39.25 C74.01,17.16,65.38,7.18,54.79,7.18L54.79,7.18z M94.99,122.88l-0.41,0l-80.82-0.01h0c-5.5-0.21-9.54-4.66-10.09-10.19l-0.05-1 l-3.61-79.5v0C0,32.12,0,32.06,0,32c0-1.28,1.03-2.33,2.3-2.35l0,0h25.48C28.41,13.15,40.26,0,54.79,0s26.39,13.15,27.01,29.65 h25.4h0.04c1.3,0,2.35,1.05,2.35,2.35c0,0.04,0,0.08,0,0.12v0l-3.96,79.81l-0.04,0.68C105.12,118.21,100.59,122.73,94.99,122.88 L94.99,122.88z"/></G></Svg>
        </View>
        <View style={{padding:8}}>
          <View style={styles.content_input}>
            <Svg style={styles.svg_icon1} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" enableBackground='new 0 0 60 60' xmlSpace="preserve">
              <Path d="M48.014,42.889l-9.553-4.776C37.56,37.662,37,36.756,37,35.748v-3.381c0.229-0.28,0.47-0.599,0.719-0.951  c1.239-1.75,2.232-3.698,2.954-5.799C42.084,24.97,43,23.575,43,22v-4c0-0.963-0.36-1.896-1-2.625v-5.319  c0.056-0.55,0.276-3.824-2.092-6.525C37.854,1.188,34.521,0,30,0s-7.854,1.188-9.908,3.53C17.724,6.231,17.944,9.506,18,10.056  v5.319c-0.64,0.729-1,1.662-1,2.625v4c0,1.217,0.553,2.352,1.497,3.109c0.916,3.627,2.833,6.36,3.503,7.237v3.309  c0,0.968-0.528,1.856-1.377,2.32l-8.921,4.866C8.801,44.424,7,47.458,7,50.762V54c0,4.746,15.045,6,23,6s23-1.254,23-6v-3.043  C53,47.519,51.089,44.427,48.014,42.889z"/>
            </Svg>
            <TextInput 
              value={formData.username}
              placeholder="Nhập vào"
              style={styles.input}
              onChangeText={text=>setFormData({...formData,username:text})}
            />  
          </View>
          <View style={[styles.content_input,{justifyContent:'space-between'}]}>
            <Svg style={styles.svg_icon1} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 203.096 203.096" enableBackground='new 0 0 203.096 203.096' xmlSpace="preserve">
              <G>
	              <Path d="M153.976,73.236h-3.308V49.115C150.669,22.033,128.634,0,101.549,0C74.465,0,52.43,22.033,52.43,49.115v24.121H49.12   c-9.649,0-17.5,7.851-17.5,17.5v94.859c0,9.649,7.851,17.5,17.5,17.5h104.856c9.649,0,17.5-7.851,17.5-17.5V90.736   C171.476,81.087,163.626,73.236,153.976,73.236z M67.43,49.115C67.43,30.304,82.736,15,101.549,15   c18.813,0,34.119,15.304,34.119,34.115v24.121H67.43V49.115z M156.476,185.596c0,1.355-1.145,2.5-2.5,2.5H49.12   c-1.355,0-2.5-1.145-2.5-2.5V90.736c0-1.355,1.145-2.5,2.5-2.5H59.93h83.238h10.808c1.355,0,2.5,1.145,2.5,2.5V185.596z"/>
	              <Path d="M101.547,116.309c-4.142,0-7.5,3.357-7.5,7.5v28.715c0,4.143,3.358,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5v-28.715   C109.047,119.666,105.689,116.309,101.547,116.309z"/>
              </G>
            </Svg>
            <TextInput 
               onChangeText={text=>setFormData({...formData,password:text})}
              value={FormData.password}
              placeholder="Nhập vào"
              style={{flex:1}}
              secureTextEntry={state.showpass?false:true}  
            />
            <Svg onPress={()=>setState({...state,showpass:!state.showpass})} style={[styles.svg_icon,{marginLeft:4}]} fill="none" viewBox="0 0 20 10"><Path stroke="none" fill="#000" fill-opacity=".54" d="M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z"></Path></Svg>
          </View>
          <Pressable onPress={()=>submit()} style={[styles.btn,{marginBottom:12,backgroundColor:username && password ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
            <Text style={{color:username && password ?'#fff':'rgba(0,0,0,.2)'}}>Đăng nhập</Text>
          </Pressable>
          <View style={styles.item_space}>
            <Pressable><Text style={styles.link}>Đăng kí</Text></Pressable>
            <Pressable><Text style={styles.link}>Dăng nhập bằng sms</Text></Pressable>
          </View>
          <View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
  
export default connect(mapStateToProps, { login,googleLogin,facebookLogin })(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content_input:{
    borderBottomColor:'rgba(0,0,0,.1)',
    borderBottomWidth:0.6,
    marginBottom:12,
    padding:8,
    flexDirection:'row',
    alignItems:'center'
  },
  header:{
    paddingLeft:8,
    paddingRight:8,
    minHeight:48,
    elevation: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    shadowColor: '#52006A',
  },
  icon_back:{
    width: 20,
    height: 20,
    color:'#ee4d2d',
    fill: 'currentColor',
    position: 'relative'
  },
  item_center:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  flexcenter:{
    flexDirection:'row',
    alignItems:'center',
  },
  item_space:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  btn:{
    alignItems:'center',
    justifyContent:'center',
    height:40
  },
  textorange:{
    color:'#ee4d2d'
  },
  textwhite:{
    color:'#fff'
  },
  svg_icon:{
    width: 18,
    fontSize: 12,
    height: 14,
    color:'#757575',
    fill: 'currentColor',
    position: 'relative'
  },
  svg_icon1:{
    width: 20,
    height: 20,
    fontSize: 20,
    marginRight:8,
    color:'#757575',
    fill: 'currentColor',
    position: 'relative'
  },
  fontbig:{
    fontSize:20,
    fontWeight:'500',
    color:'#333'
  },
  fontsmall:{
    fontSize:12
  },
  link:{
    color: '#2673dd',
    fontSize:14
  },
  input: {
    width:'100%'
  },
  icon:{
  stroke: 'currentColor',
    fill: 'currentColor',
    height: 60,
    width: 60,
    color: '#ee4d2d'
  },
})
