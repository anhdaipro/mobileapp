import { Pressable, View,Text,Image,ScrollView,StyleSheet } from "react-native"
import { listflashsaleshopURL, listitemflashsalelURL,loginURL } from "../../../urls";
import React, { useState, useEffect } from 'react';
import axios from "axios"
import styled from 'styled-components'
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
import { headers,logout } from "../../../actions/auths";
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
const StyleName=styled.Text`
color:#fff;
font-weight:500;
margin-bottom:4px;
font-size:18px
`
const Flex=styled.View`
flex-direction:row
`
const Header=styled.View`
background-color:#ee4d2d;
padding:8px 16px
`
const Btn=styled.Pressable`
    align-items:center;
    border:1px solid #fff;
    background-color:${props=>props.primary?'#fff':'#ee4d2d'};
    padding:0 10px;
    border-radius:4px;
    justify-content:center;
    height:32px
`
const StyleView=styled.View`
background-color:#fff;
padding:8px 16px ;
`
const Dot=styled.View`
opacity:0.5;
background-color:#fff;
height:100%;
width:1px
`
const listitem=[
    {name:'',image:'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi'},
    {name:'',image:'https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi'},
    {name:'',image:'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi'},
    {name:'',image:'https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi'},
]
const Homeaccount=(props)=>{
    const [background,setBackground]=useState('transparent')
    const [color,setColor]=useState({color:'#fff',background:'#fff'})
    const {navigation,user,count_message_unseen}=props
    const showprofile=()=>{
        if(user){
            navigation.navigate('Profile')
        }
        else{
        navigation.navigate('Login')
        }
    }
    console.log(user)
    return(
        <View>
            <Header>
                <View style={[styles.flexcenter,{paddingTop:28,paddingBottom:12,justifyContent:'flex-end'}]}>
                    <View style={{position:'relative',marginRight:8,marginLeft:8}}>
                        <Pressable>
                            <Svg style={[styles.svg_icon1,{stroke:color.color,color:color.color}]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                                <G><G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><Path d="M4261.5,4986.6c-107.1-38.3-241.1-160.7-296.6-271.7c-42.1-86.1-44-111-53.6-677.3c-11.5-673.5-5.7-652.4-191.3-746.2c-109.1-57.4-193.3-67-281.3-32.5c-28.7,11.5-225.8,191.3-436.2,399.9c-432.4,430.5-486,466.8-698.4,466.8c-218.1,0-260.2-30.6-769.2-539.6c-508.9-508.9-539.6-551-539.6-769.2c0-212.4,36.4-266,466.9-698.4c208.5-210.5,388.4-407.5,399.9-436.2c34.5-88,24.9-172.2-30.6-281.3c-95.7-185.6-74.6-179.9-748.1-191.3c-566.4-9.6-591.2-11.5-677.3-53.6C291.3,1098.8,172.7,966.8,134.4,852c-45.9-132-45.9-1333.6,0-1465.6C172.7-728.4,285.6-854.7,402.3-914c91.8-47.8,101.4-47.8,681.2-57.4c673.5-11.5,652.4-5.7,748.1-191.3c55.5-109.1,65.1-193.3,30.6-281.3c-11.5-28.7-195.1-229.6-409.4-445.8c-256.4-258.3-399.9-419-420.9-468.8c-19.1-45.9-34.4-130.1-34.4-210.5c-1.9-227.7,22.9-264,537.6-778.7c508.9-508.9,551-539.6,769.2-539.6c212.4,0,265.9,36.4,698.4,466.9c210.5,208.6,407.5,388.4,436.2,399.9c88,34.4,172.2,24.9,281.3-30.6c185.6-95.7,179.8-74.6,191.3-748.1c9.6-566.4,11.5-591.2,53.6-677.3c24.9-49.7,84.2-124.4,130.1-166.5c149.2-132,179.9-135.8,906.9-135.8c744.3,0,773,3.8,918.4,151.2c160.7,162.6,160.7,162.6,172.2,828.5c11.5,673.5,5.7,652.4,191.3,748.1c109.1,55.5,193.2,65.1,281.3,30.6c28.7-11.5,225.8-191.3,436.3-399.9c432.4-430.5,486-466.9,698.4-464.9c220,0,260.2,28.7,769.1,537.6c508.9,509,537.6,549.1,537.6,769.2c1.9,212.4-34.4,265.9-464.9,698.4c-208.6,210.5-388.4,407.5-399.9,436.2c-34.4,88-24.9,172.2,32.5,281.3c93.8,185.6,72.7,179.8,746.2,191.3c665.8,11.5,665.8,11.5,828.5,172.2C9896.2-653.8,9900-625.1,9900,119.2c0,727.1-3.8,757.7-135.8,906.9c-42.1,45.9-116.7,105.2-166.5,130.1c-86.1,42.1-111,44-677.3,53.6c-673.5,11.5-652.4,5.7-746.2,191.3c-57.4,109.1-67,193.2-32.5,281.3c11.5,28.7,191.3,225.8,399.9,436.2c430.5,432.4,466.9,486,466.9,698.4c0,218.1-30.6,260.2-539.6,769.2c-514.7,514.7-551,539.6-778.7,537.6c-80.4,0-164.6-15.3-210.5-34.4c-49.7-21-210.5-164.6-468.8-420.9c-216.2-214.3-417.1-398-445.8-409.4c-88-34.4-172.2-24.9-281.3,32.5c-185.6,93.8-179.9,72.7-191.3,746.2c-9.6,579.7-9.6,589.3-57.4,681.1c-59.3,116.7-185.6,229.6-300.4,267.9C5608.4,5030.7,4383.9,5028.7,4261.5,4986.6z M5683,4626.9c34.5-26.8,36.3-61.2,45.9-618l9.6-589.3l55.5-114.8c68.9-139.7,218.1-290.8,346.3-354c82.3-42.1,122.5-47.8,296.6-47.8c308,0,338.7,19.1,822.7,497.5c292.7,288.9,407.5,392.2,442,392.2c65.1,0,973.9-908.8,973.9-973.9c0-34.4-99.5-147.3-392.2-442c-453.5-457.3-489.8-512.8-503.2-776.8c-13.4-264,76.5-461.1,279.3-610.3c174.1-128.2,264-143.5,866.7-143.5c508.9,0,535.7-1.9,572.1-38.3c36.3-36.4,38.3-63.1,38.3-685c0-528.1-5.7-654.4-26.8-685c-26.8-34.4-61.2-36.3-618-45.9l-589.3-9.6L8187.6-673c-158.8-78.4-319.5-244.9-373.1-388.4c-34.4-91.8-40.2-139.7-34.4-283.2c11.5-281.3,42.1-327.2,503.2-794c288.9-292.7,392.2-407.5,392.2-442c0-65.1-908.8-973.9-973.9-973.9c-34.4,0-149.2,103.3-442,392.2c-466.9,461.1-512.8,491.7-794,503.2c-143.5,5.7-191.3,0-283.2-34.4c-143.5-53.6-310-214.3-388.4-373.1l-55.5-114.8l-9.6-589.3c-9.6-556.8-11.5-591.2-45.9-618c-30.6-21.1-156.9-26.8-685-26.8c-621.8,0-648.6,1.9-685,38.3c-36.4,36.4-38.3,63.1-38.3,572.1c0,602.7-15.3,692.6-143.5,866.7C3982.1-2735.5,3785-2645.6,3521-2659c-264-13.4-319.5-49.7-776.8-503.2c-294.7-292.7-407.5-392.2-442-392.2c-65,0-973.9,908.8-973.9,973.9c0,34.4,103.3,149.2,392.2,442c478.3,484.1,497.5,514.7,497.5,822.7c0,174.1-5.7,214.3-47.8,296.6c-63.1,128.2-214.3,277.4-354,346.3l-114.8,55.5l-589.3,9.6c-556.8,9.6-591.2,11.5-618,45.9c-21,30.6-26.8,156.9-26.8,685c0,621.8,1.9,648.6,38.3,685c36.3,36.4,63.1,38.3,572.1,38.3c602.7,0,692.6,15.3,866.7,143.5c202.8,149.2,292.7,346.3,279.3,610.3c-13.4,262.1-49.7,317.6-503.2,776.8c-288.9,292.7-392.2,407.5-392.2,442c0,65.1,908.8,973.9,973.9,973.9c34.5,0,149.3-103.3,442-392.2c459.2-453.5,514.7-489.8,776.8-503.2c264-13.4,461.1,76.5,610.4,279.3c128.2,174.1,143.5,264,143.5,866.7c0,508.9,1.9,535.7,38.3,572.1c36.3,36.3,63.1,38.3,685,38.3C5526.2,4653.7,5652.4,4648,5683,4626.9z"/><Path d="M4680.5,1716.8c-390.3-84.2-736.6-311.9-993-650.5C3350.7,622.4,3278-16.7,3507.6-521.8c78.5-172.2,231.5-386.5,371.2-520.4c308-294.7,639.1-440.1,1038.9-459.2c248.7-13.4,403.7,9.6,631.4,91.8c533.8,193.3,964.3,709.9,1061.9,1272.4c34.5,200.9,13.4,520.4-49.7,715.6c-63.1,199-101.4,275.5-223.8,451.5c-229.6,334.8-591.2,585.5-977.7,677.3C5174.1,1751.2,4864.2,1757,4680.5,1716.8z M5334.8,1343.7c440.1-112.9,778.7-451.5,891.6-891.6c78.4-308,38.3-667.7-109.1-950.9c-95.7-185.6-311.9-401.8-497.5-497.5c-380.7-199-855.2-199-1236,0c-185.6,95.7-401.8,311.9-497.5,497.5c-199,380.7-199,855.2,0,1236c95.7,185.6,311.9,401.8,497.5,497.5C4667.1,1382,5026.8,1422.1,5334.8,1343.7z"/></G></G>
                            </Svg>
                        </Pressable> 
                    </View>
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
                <View style={styles.item_space}>
                    <Flex>
                        <Pressable onPress={showprofile} style={{marginRight:12}}>
                            <Image style={styles.avatar} source={{uri:user?user.avatar:''}} />
                        </Pressable>
                        {user?
                        <View>
                            <StyleName>{user.username}</StyleName>
                            <Text>
                                <View style={[{backgroundColor:'#fff',borderRadius:6,padding:2},styles.flexcenter]}>
                                    <Styletext primary>Thành viên</Styletext>
                                    <Svg style={[styles.svg_icon2,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                                </View>
                                
                            </Text>
                            <View style={[styles.flexcenter,{marginTop:4}]}>
                                <Flex style={{paddingRight:8}}>
                                    <Styletext>người theo </Styletext>
                                    <Styletext style={{fontWeight:'500'}}>4</Styletext>
                                </Flex>
                                <Dot/>
                                <Flex style={{paddingLeft:8,}}>
                                    <Styletext >Đang theo dõi </Styletext>
                                    <Styletext style={{fontWeight:'500'}}>8</Styletext>
                                </Flex>
                            </View>
                        </View>:null}
                    </Flex>
                    {user?null:
                    <Flex>
                        <Btn onPress={()=>navigation.navigate('Login')} primary style={{marginRight:8}}>
                            <Text style={styles.textorange}>Đăng nhập</Text>
                        </Btn>
                        <Btn onPress={()=>navigation.navigate('Signup')}>
                            <Text style={styles.textwhite}>Đăng kí</Text>
                        </Btn>
                    </Flex>}
                </View>
                
            </Header>
            <StyleView style={{margin:8}}>
                <Svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 122.88 88.86"><Path d="M7.05,0H115.83a7.07,7.07,0,0,1,7,7.05V81.81a7,7,0,0,1-1.22,4,2.78,2.78,0,0,1-.66,1,2.62,2.62,0,0,1-.66.46,7,7,0,0,1-4.51,1.65H7.05a7.07,7.07,0,0,1-7-7V7.05A7.07,7.07,0,0,1,7.05,0Zm-.3,78.84L43.53,40.62,6.75,9.54v69.3ZM49.07,45.39,9.77,83.45h103L75.22,45.39l-11,9.21h0a2.7,2.7,0,0,1-3.45,0L49.07,45.39Zm31.6-4.84,35.46,38.6V9.2L80.67,40.55ZM10.21,5.41,62.39,47.7,112.27,5.41Z"/></Svg>
                <Text>vui lòng xác nhận email của bạn để bảo vệ tài khoản và nhận những cập nhật đơn hàng quan trọng.<Text>Xác minh ngay</Text></Text>
                <Pressable style={styles.btn_close} onPress={()=>setShow(false)}>
                    <Svg  xmlns="http://www.w3.org/2000/svg" style={styles.icon_close} viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></Path></Svg>
                </Pressable>
            </StyleView>
            <StyleView>
                <View>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </View>
                <View></View>
                <View>
                    <View style={styles.flexcenter}>
                        <View>
                            <Image source={{uri:"https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"}}/>
                        </View>
                        <View>
                            <Text>Đơn Mua</Text>
                        </View>
                    </View>
                    <View style={styles.flexcenter}>
                        <Styletext></Styletext>
                        <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                    </View>
                </View>
                <View>

                </View>
                <View>
                    <View>

                    </View>
                    <View>
                        <Svg style={[styles.svg_icon,{color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                    </View>
                </View>
            </StyleView>
            <StyleView>
                <View></View>
                <View></View>   
            </StyleView>
            <View>
                <View>
                    <View style={styles.flexcenter}>
                        <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                            <G>
                                <Path d="m417.9,104.4h-65.5c-2.2-51-44.8-92.4-96.4-92.4s-94.2,41.3-96.5,92.4h-66.5l-30.1,395.6h386.2l-31.2-395.6zm-161.9-71.6c40.1,0 73.5,32 75.7,71.6h-151.4c2.2-39.6 35.6-71.6 75.7-71.6zm-143.3,92.4h46.7v68.5h20.8v-68.5h151.6v68.5h20.8v-68.5h47.8l27,354h-341.7l27-354z"/>
                            </G>
                        </Svg>
                        <Text></Text>
                    </View>
                    <View style={styles.flexcenter}>
                        <Styletext></Styletext>
                        <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                    </View>
                </View>
                <View>
                    
                </View>
            </View>
           <View style={{backgroundColor:'#ffdddd',padding:12}}>
               <Pressable style={styles.item_space} onPress={()=>navigation.navigate('Homeseller')}>
                    <View style={styles.flexcenter}>
                        <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                            <G><Path d="M990,395.9c0-21.4-3.1-39.8-9.2-58.2l0,0c0-3.1,0-3.1-3.1-6.1l-82.7-205.2c-15.3-42.9-55.1-70.4-104.1-70.4H209.1c-49,0-85.8,24.5-101.1,67.4L19.2,334.6c0,0,0,3.1,0,6.1C13.1,359.1,10,380.6,10,402c0,55.1,21.4,104.1,61.3,140.9v309.3c0,49,39.8,91.9,91.9,91.9h664.6c49,0,91.9-39.8,91.9-91.9V555.1C962.4,509.2,990,454.1,990,395.9L990,395.9z M827.7,864.4H163.1c-12.3,0-18.4-9.2-18.4-18.4V579.6c18.4,6.1,39.8,9.2,64.3,9.2c58.2,0,110.3-24.5,147-70.4c36.8,42.9,88.8,67.4,147,67.4c58.2,0,110.3-24.5,147-70.4c36.8,42.9,91.9,70.4,150.1,70.4c18.4,0,33.7-3.1,49-6.1V843C846.1,855.3,836.9,864.4,827.7,864.4L827.7,864.4z M855.3,503.1c-15.3,9.2-36.8,12.3-58.2,12.3c-42.9,0-82.7-21.4-104.1-58.2c-3.1-3.1-3.1-9.2-9.2-15.3c-6.1-6.1-15.3-15.3-33.7-15.3c-15.3,0-27.6,6.1-33.7,15.3c-6.1,6.1-6.1,9.2-9.2,15.3c-21.4,36.8-61.3,58.2-104.1,58.2c-42.9,0-82.7-21.4-104.1-58.2c-3.1-3.1-3.1-9.2-9.2-12.3c-15.3-18.4-55.1-18.4-67.4,0c-6.1,6.1-9.2,12.3-9.2,15.3c-21.4,36.8-61.3,58.2-104.1,58.2c-21.4,0-42.9-3.1-58.2-12.3l0,0l0,0c-39.8-21.4-64.3-64.3-64.3-110.3c0-12.3,3.1-27.6,6.1-39.8V353l88.8-208.3c3.1-6.1,6.1-21.4,33.7-21.4h581.9c12.3,0,30.6,3.1,36.8,21.4l82.7,205.2v3.1c3.1,12.3,6.1,27.6,6.1,39.8C919.6,438.7,895.1,481.6,855.3,503.1L855.3,503.1z"/></G>
                        </Svg>
                        <Text>Bắt đầu bán</Text>
                    </View>
                    <View style={styles.flexcenter}>
                        <Styletext second>Đăng kí miễn phí</Styletext>
                        <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                    </View>
               </Pressable>
               
           </View>
        </View>
    )
}

const mapStateToProps = state => ({
    user:state.auth.user,count_message_unseen:state.auth.count_message_unseen
});
  
export default connect(mapStateToProps, {logout})(Homeaccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar:{
    width: 60,
    height: 60,
    borderRadius:30
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
  header:{
    paddingLeft:8,
    paddingRight:8,
    backgroundColor:'#ee4d2d',
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
    backgroundColor:'#fff',
    padding:4,
    justifyContent:'center',
    height:40
  },
  btn1:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ee4d2d',
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
    fill: 'currentColor',
    position: 'relative'
  },
  svg_icon2:{
    width: 10,
    height: 10,
    color:'#ee4d2d',
    fill: 'currentColor',
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
