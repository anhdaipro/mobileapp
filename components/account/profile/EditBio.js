import { TouchableHighlight, StyleSheet,Dimensions, Text, StatusBar,Image,Pressable,
    View,SafeAreaView, ImageBackground, TextInput } 
  from "react-native";
  import {styles,Container} from "../styles"
  import {profiledURL } from "../../../urls";
  import React, { useState, useEffect,useRef } from 'react';
  import axios from "axios"
  import AsyncStorage from '@react-native-async-storage/async-storage';
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
import styled from "styled-components"
import { updateprofile } from "../../../actions/auths";
const {width} = Dimensions.get('window');
const height = width*0.6;
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
const EditBio=(props)=>{
    const {navigation,route,updateprofile}=props
    const {bio,token}=route.params
    const [formData,setformData]=useState({bio:bio})
   
    const saveinfo=()=>{
        let form=new FormData()
        form.append('bio',formData.bio)
        axios.post(profiledURL,form,{headers:{ Authorization:`JWT ${token}`,'Content-Type': 'multipart/form-data'}})
        .then(res=>{
          updateprofile({bio:formData.bio})
            navigation.navigate('Profile')
            
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
                <Pressable onPress={saveinfo}>
                   <Text style={{color:'#ee4d2d'}}>Lưu</Text>
                </Pressable>
            </View>
            <View style={{flex:1,padding:16}}>
                
                <TextInput style={{width:'100%'}} onChangeText={text=>setformData({...formData,bio:text})} value={formData.bio}/>
                
            </View>
            
        </Container>
    )
}

const mapStateToProps = state => ({
    user:state.auth.user
});
  
export default connect(mapStateToProps,{updateprofile})(EditBio);
