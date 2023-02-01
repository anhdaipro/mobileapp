import React, { useState, useEffect ,useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Easing,
  SafeAreaView,
  Animated,
  StyleSheet
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
import axios from 'axios';
import { headers } from '../../actions/auths';
import {connect} from "react-redux"
const NavBar=(props)=>{
    const {navigation,count_message_unseen,background,color,user}=props
    const [cartitem,setCartitem]=useState()
    return(
        <View style={[styles.searchwrap,{backgroundColor:background}]}>
            <View style={[styles.center,{flexDirection:'row'}]}>
                <View style={[styles.search,{width:'80%',backgroundColor:color.background}]}>
                    <View style={[{flex:1},styles.flexspace]}>
                        <Text style={[styles.textorange,{textTransform:'uppercase'}]}>Ở đây có mã free ship</Text>
                        <Svg style={styles.svg_icon2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M19,6.5H17.72l-.32-1a3,3,0,0,0-2.84-2H9.44A3,3,0,0,0,6.6,5.55l-.32,1H5a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3v-8A3,3,0,0,0,19,6.5Zm1,11a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v-8a1,1,0,0,1,1-1H7a1,1,0,0,0,1-.68l.54-1.64a1,1,0,0,1,.95-.68h5.12a1,1,0,0,1,.95.68l.54,1.64A1,1,0,0,0,17,8.5h2a1,1,0,0,1,1,1Zm-8-9a4,4,0,1,0,4,4A4,4,0,0,0,12,8.5Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14.5Z"/></Svg>
                    </View>
                </View>
                <View style={[styles.flexcenter]}>
                    <View style={{position:'relative',marginRight:8,marginLeft:8}}>
                        <Pressable onPress={()=>navigation.navigate('Cart')}>
                            <Svg viewBox="0 0 26.6 25.6" style={[styles.svg_icon1,{stroke:color.color,color:color.color}]}><Polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"></Polyline><Circle cx="10.7" cy="23" r="2.2" stroke="none"></Circle><Circle cx="19.7" cy="23" r="2.2" stroke="none"></Circle></Svg>
                        </Pressable>
                        {user?
                        <View style={styles.cart_number}><Text style={{textAlign: 'center',color:'#fff',width:'100%',lineHeight:14,fontSize:12}}>6</Text></View>:null}
                    </View>
                    <View style={{position:'relative'}}>
                        <Pressable onPress={()=>navigation.navigate('Draggable')}>
                            <Svg style={[styles.svg_icon1,{color:color.color,stroke:color.color}]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                            <G><Path d="M722.7,388.6c-36.9,0-66.8,29.9-66.8,66.9c0,36.8,29.9,66.8,66.8,66.8c36.9,0,66.8-29.9,66.8-66.8C789.5,418.6,759.6,388.6,722.7,388.6L722.7,388.6z M500,811.9c-42.4,0-85.2-5.1-127.1-15.2c-3.4-0.8-6.9-1.2-10.4-1.2c-5.7,0-11.3,1.1-16.6,3.2l-183.9,73.6l30-127.5c3.9-16.4-1.8-33.5-14.7-44.2c-79.2-66.8-122.8-153.8-122.8-245C54.6,259,254.4,99.1,500,99.1c245.7,0,445.5,159.8,445.5,356.4C945.5,652,745.6,811.9,500,811.9L500,811.9z M500,54.6c-270.6,0-490,179.5-490,401C10,564,62.9,662.5,148.7,734.7L99.1,945.4l263.5-105.3c43.7,10.4,89.7,16.3,137.5,16.3c270.7,0,490-179.4,490-400.8C990,234.1,770.7,54.6,500,54.6L500,54.6z M500,388.6c-36.9,0-66.8,29.9-66.8,66.9c0,36.8,29.9,66.8,66.8,66.8c36.9,0,66.8-29.9,66.8-66.8C566.8,418.6,536.9,388.6,500,388.6L500,388.6z M277.3,388.6c-36.9,0-66.9,29.9-66.9,66.9c0,36.8,30,66.8,66.9,66.8c36.9,0,66.8-29.9,66.8-66.8C344.1,418.6,314.1,388.6,277.3,388.6L277.3,388.6z"/></G>
                            </Svg>
                        </Pressable>
                        {count_message_unseen?
                        <View style={styles.count_unread}>
                            <Text style={[styles.textwhite,{textAlign: 'center',color:'#fff',width:'100%',lineHeight:14,fontSize:12}]}>6</Text>
                        </View>:null}
                    </View>
                </View>
            </View>
        </View>
    )
}
const mapStateToProps = state => ({
    token: state.auth.token,user:state.auth.user,count_message_unseen:state.auth.count_message_unseen
  });
  
export default connect(mapStateToProps)(NavBar);

const styles = StyleSheet.create({
    flexspace:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    center:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    search:{
      backgroundColor:'#fff',
      padding:8,
      paddingTop:8,
      paddingBottom:8,
      flexDirection:'row',
      borderRadius:4,
    },
    count_unread:{
      position:'absolute',
      top:-6,
      right:-4,
      width:16,
      height:16,
      zIndex:100,
      borderRadius:8,
      backgroundColor:'#ee4d2d',
      borderColor:'#fff',
      borderWidth:1
    },
    cart_number:{
      position:'absolute',
      top:-6,
      right:-6,
      zIndex:100,
      width:24,
      height:16,
      backgroundColor:'#ee4d2d',
      borderRadius:8,
      borderColor:'#fff',
      borderWidth:1
    },
    searchwrap:{
      position:'absolute',
      top:0,
      minHeight:76,
      flexDirection:'row',
      elevation:10,
      paddingBottom:4,
      zIndex:1,
      left:0,
      alignItems:'flex-end',
      right:0
    },
    flexcenter:{
      flexDirection:'row',
      alignItems:'center'
    },
  
    wrapdot:{
      position:'absolute',
      flexDirection:'row',
      bottom:0,
      alignSelf:'center'
    },
    textorange:{
      color:'#ee4d2d'
    },
    textwhite:{
      color:'#fff'
    },
    active:{
      color:'#ee4d2d',
    },
    fontbig:{
      fontSize:20,
      fontWeight:'800'
    },
    fontsmall:{
      fontSize:12
    },
    fontsmallest:{
      fontSize:10
    },
    dot:{
      margin:3,
      color:'#fff'
    },
    dotActive:{
      color:'#ee4d2d',
      margin:3,
    }
    ,
    svg_icon2:{
      width: 20,
      color: '#757575',
      height: 20,
      fill: 'currentColor',
    },
    svg_icon:{
      width: 12,
      fontSize: 12,
      color: '#ee4d2d',
      height: 12,
      fill: 'currentColor',
      position: 'relative'
    },
    svg_icon1:{
      width: 24,
      height: 24,
      color:'#fff',
      stroke:'#fff',
      fill: 'currentColor',
  
    },
    icon_large:{
      width:16,height:16,
      color: '#d0011b',
      fontSize: 12,
      fill: 'currentColor',
      position: 'relative'
    }
  });
  