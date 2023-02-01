import React, {useState,useEffect,useMemo} from 'react'
import {timepromotion,formatter,listchoice} from "../../../../constants"
import {listvouchershopURL} from "../../../../urls"

import axios from 'axios'
import styled from "styled-components"
import Tabs from "../Tabs"
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
import {styles,Container,Styletext,Styletext1,StyleBtn} from "../styles"
import { FlatList,TouchableHighlight, SafeAreaView,ImageBackground,Text,View, Pressable, Modal,TouchableWithoutFeedback } from 'react-native'
import { useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'
const now=new Date()
now.setDate(new Date().getDate()-7)
const StyleModalContent=styled.View`
z-index:100;
margin-top:auto;
background-color:#fff;
width:100%;
position:relative
`
const Wrapper=styled.View`
background-color:#fff;
margin-top:8px
`
const Item=styled.View`
padding:8px;
`
const StyledBox=styled.View`
padding:0 4px;
border:1px solid #ee4d2d;
margin-top:4px;
height:14px;
`
const Itemspace=styled.View`
flex-direction:row;
justify-content:space-between;
`
const StyleStatus=styled.View`
padding:2px 4px;
background-color:${props=>props.ground};
`
const Title=styled.Text`
margin-bottom:4px
`
const Dot=styled.View`
width:100%;
margin-left:40px
height:1px;
background-color:rgba(0,0,0,0.1)
`
const Listvoucher=(props)=>{
    const [listvoucher,setVouchers]=useState([])
    const {navigation}=props
    const [loading,setLoading]=useState(true)
    const [count,setCount]=useState(0)
    const [choice,setChoice]=useState('current')
    const [show,setShow]=useState(false)

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

    useEffect(()=>{
        (async()=>{
            if(token){
            const res =await axios.get(`${listvouchershopURL}?offset=${listvoucher.length}&choice=current`,headers())
            setVouchers(current=>[...current,...res.data.data])
            setLoading(true)
            }
        })()
    },[token])
    
    const setdata=data=>setVouchers(data)
    const Itemvoucher=({item})=>{
       return(
        <Item>
            <Itemspace>
                <View style={styles.flexrow}>
                    <View style={{marginRight:8}}>
                        <ImageBackground style={{width: 80, height: 80}}  source={{uri:'https://res.cloudinary.com/dupep1afe/image/upload/v1649842026/download_3_optpqu.png'}} resizeMode="cover" />
                    </View>
                    <View>
                        <View style={{flex:1}}>
                            <Text>{timepromotion(item.valid_from)} - {timepromotion(item.valid_to)}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text>{item.discount_type=='1'?`${item.percent}% GIẢM`:`₫${formatter(item.amount)}`}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text>{item.minimum_order_value}</Text>
                        </View>
                        <Text style={{flex:1}}>
                            <StyledBox>
                            <Styletext style={{lineHeight:13}} primary>Ưu đãi voucher</Styletext>
                            </StyledBox>
                        </Text>                           
                    </View>
                </View>
                <Text>
                <StyleStatus ground={'#eee'}>
                    <Text>{choice=="current"?"Đang diễn ra":choice=='upcoming'?"Sắp diễn ra":"Kêt thúc"}</Text>
                </StyleStatus>
                </Text>
            </Itemspace>
            <View style={styles.flexcenter}>
                <View style={{marginRight:16}}>
                    <Styletext second>Đã sử dụng 0</Styletext>
                </View>
                <View>
                    <Styletext second>Chưa lưu 2</Styletext>
                </View>
            </View>
            <StyleBtn onPress={()=>navigation.navigate("Detailvoucher",{id:item.id,headers:headers})} style={{marginTop:8}}>
                <Text>Xem</Text>
            </StyleBtn>
        </Item>
       )
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
                    <Text style={styles.fontbig}>Mã giảm giá của tôi</Text>
                </View>
            </View>
            <View >
                <View >   
                    <Tabs
                        listchoice={listchoice}
                        choice={choice}
                        loading={loading}
                        setchoice={data=>setChoice(data)}
                    />
                    
                    <Wrapper>
                        <FlatList
                            data={listvoucher}
                            renderItem={({item})=><Itemvoucher item={item}/>}
                            keyExtractor={item=>item.id}
                        />                   
                                                       
                        {count==0?
                        <View>
                            <View>      
                                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 86"><G fill="none" fillRule="evenodd" transform="translate(-4 -4)"><Rect width="96" height="96"></Rect><Ellipse cx="49" cy="85" fill="#F2F2F2" rx="45" ry="5"></Ellipse><Rect width="34" height="15" x="34.5" y="24.5" fill="#FAFAFA" stroke="#D8D8D8" rx="2" transform="rotate(30 51.5 32)"></Rect><Rect width="33" height="15" x="25.5" y="25.5" fill="#FAFAFA" stroke="#D8D8D8" rx="2" transform="rotate(15 42 33)"></Rect><Path fill="#FFF" stroke="#D8D8D8" d="M13.5,42.5164023 C17.4090159,42.7736953 20.5,46.0258787 20.5,50 C20.5,53.9741213 17.4090159,57.2263047 13.5,57.4835977 L13.5,73 C13.5,73.8284271 14.1715729,74.5 15,74.5 L83,74.5 C83.8284271,74.5 84.5,73.8284271 84.5,72.9999686 L84.5009752,57.483515 C84.3347628,57.4944876 84.1677086,57.5 84,57.5 C79.8578644,57.5 76.5,54.1421356 76.5,50 C76.5,45.8578644 79.8578644,42.5 84,42.5 C84.1677086,42.5 84.3347628,42.5055124 84.5009752,42.516485 L84.5,27 C84.5,26.1715729 83.8284271,25.5 83,25.5 L15,25.5 C14.1715729,25.5 13.5,26.1715729 13.5,27 L13.5,42.5164023 Z"></Path><Path fill="#D8D8D8" d="M71.5,59 C71.7761424,59 72,59.2238576 72,59.5 C72,59.7761424 71.7761424,60 71.5,60 L40.5,60 C40.2238576,60 40,59.7761424 40,59.5 C40,59.2238576 40.2238576,59 40.5,59 L71.5,59 Z M59.5,49 C59.7761424,49 60,49.2238576 60,49.5 C60,49.7761424 59.7761424,50 59.5,50 L40.5,50 C40.2238576,50 40,49.7761424 40,49.5 C40,49.2238576 40.2238576,49 40.5,49 L59.5,49 Z M71.5,39 C71.7761424,39 72,39.2238576 72,39.5 C72,39.7761424 71.7761424,40 71.5,40 L40.5,40 C40.2238576,40 40,39.7761424 40,39.5 C40,39.2238576 40.2238576,39 40.5,39 L71.5,39 Z"></Path><Line x1="28.5" x2="28.5" y1="26" y2="75" stroke="#D8D8D8" strokeDasharray="4"></Line><G fill="#D8D8D8" transform="translate(82.16 4.04)"><Circle cx="10" cy="13" r="3" opacity=".5"></Circle><Circle cx="2" cy="9" r="2" opacity=".3"></Circle><Path d="M8.5,1 C7.67157288,1 7,1.67157288 7,2.5 C7,3.32842712 7.67157288,4 8.5,4 C9.32842712,4 10,3.32842712 10,2.5 C10,1.67157288 9.32842712,1 8.5,1 Z M8.5,7.10542736e-15 C9.88071187,7.10542736e-15 11,1.11928813 11,2.5 C11,3.88071187 9.88071187,5 8.5,5 C7.11928813,5 6,3.88071187 6,2.5 C6,1.11928813 7.11928813,7.10542736e-15 8.5,7.10542736e-15 Z" opacity=".3"></Path></G></G></Svg>        
                                <Text>Không có Mã giảm giá nào</Text>
                            </View>
                        </View>:''}
                    </Wrapper>
                </View>  
                    
            </View>
            <View style={[styles.fotter,{padding:8}]}>             
                 <StyleBtn onPress={()=>setShow(true)} style={{flex:1}}>
                     <Text>Tạo</Text>
                </StyleBtn>  
            </View> 
            <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
                <TouchableWithoutFeedback onPress={(event) => event.target == event.currentTarget && setShow(false)}>
                    <View style={[styles.modal,{backgroundColor:'rgba(0,0,0,0.4)',borderRadius:4}]}>
                        <StyleModalContent>
                            <View style={{backgroundColor:'#fff'}}>
                                <Pressable style={styles.center} onPress={()=>navigation.navigate("Detailvoucher",{code_type:'1',headers:headers})} style={[{padding:8},styles.flexcenter]}>
                                    <View style={{width:32}}>
                                        <Svg style={[styles.svg_icon3,{color:'#ee4d2d'}]} viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M14.875 5.625a2.183 2.183 0 01-2.188 2.188A2.183 2.183 0 0110.5 5.624a2.183 2.183 0 01-2.187 2.188 2.183 2.183 0 01-2.187-2.188 2.183 2.183 0 01-2.188 2.187 2.179 2.179 0 01-1.83-.99 2.174 2.174 0 01-.357-1.185v-.012l.62-2.481A2.5 2.5 0 014.796 1.25h11.408a2.5 2.5 0 012.426 1.894l.62 2.48V5.638a2.177 2.177 0 01-.357 1.186 2.18 2.18 0 01-1.83.99 2.183 2.183 0 01-2.188-2.187zM3 8.933V17.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V8.933a3.44 3.44 0 01-3.125-.656 3.423 3.423 0 01-2.188.786 3.423 3.423 0 01-2.187-.786 3.424 3.424 0 01-2.188.786 3.423 3.423 0 01-2.187-.786A3.44 3.44 0 013 8.933z"></Path><Path d="M11.208 15a.579.579 0 00-.22-.484 2.675 2.675 0 00-.768-.357 7.273 7.273 0 01-.899-.358c-.758-.371-1.137-.882-1.137-1.533a1.38 1.38 0 01.28-.856c.21-.263.488-.463.804-.579a3.121 3.121 0 011.166-.208c.388-.006.772.07 1.128.225.316.134.587.357.779.642.186.281.283.612.277.95h-1.405a.709.709 0 00-.222-.557.844.844 0 00-.589-.195.967.967 0 00-.607.168.508.508 0 00-.217.422.524.524 0 00.241.41c.262.167.548.294.847.377.346.104.68.244.996.417.632.364.949.866.949 1.506a1.43 1.43 0 01-.579 1.205c-.385.292-.914.438-1.586.438a3.186 3.186 0 01-1.289-.252 1.973 1.973 0 01-.868-.7A1.834 1.834 0 018 14.658h1.414a.91.91 0 00.241.695c.162.146.426.22.791.22a.91.91 0 00.55-.152.5.5 0 00.212-.422z"></Path></Svg>
                                    </View>
                                    <View>
                                        <Title>Voucher toàn Shop</Title>
                                        <Styletext1 second numberOfLines={2}>Có thể áp dụng voucher này cho tất cả các sản phẩm trong Shop của bạn</Styletext1>
                                    </View>
                                </Pressable>
                                <Dot/>
                                <Pressable style={styles.center} onPress={()=>navigation.navigate("Detailvoucher",{code_type:'2',headers:headers})} style={[{padding:8},styles.flexcenter]}>
                                    <View style={{width:32}}>
                                        <Svg style={[styles.svg_icon3,{color:'#ee4d2d'}]} viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M13.625 4.375V5h-6.25v-.625a3.125 3.125 0 116.25 0zM3.621 5h2.504v-.625a4.375 4.375 0 118.75 0V5h2.503a1.25 1.25 0 011.245 1.138l1.128 12.5A1.25 1.25 0 0118.506 20H2.492a1.25 1.25 0 01-1.245-1.362l1.129-12.5A1.25 1.25 0 013.62 5zm7.911 8.75a.705.705 0 01.063.327.607.607 0 01-.26.514 1.11 1.11 0 01-.669.185c-.444 0-.766-.09-.963-.268a1.11 1.11 0 01-.294-.847H7.688c-.009.441.114.875.351 1.246.263.38.63.676 1.058.853.496.21 1.03.314 1.57.307.818 0 1.462-.178 1.932-.533a1.74 1.74 0 00.704-1.468c0-.779-.385-1.39-1.156-1.834a6.322 6.322 0 00-1.212-.508 3.812 3.812 0 01-1.032-.459.638.638 0 01-.294-.5.619.619 0 01.264-.513c.217-.15.477-.222.74-.205.26-.015.517.07.717.238a.864.864 0 01.27.677h1.712a2.034 2.034 0 00-.338-1.156 2.165 2.165 0 00-.949-.782 3.295 3.295 0 00-1.373-.273 3.801 3.801 0 00-1.42.253c-.385.14-.723.384-.978.704a1.68 1.68 0 00-.342 1.043c0 .793.461 1.415 1.384 1.867.355.17.72.316 1.095.437.333.094.649.24.935.434.089.07.16.16.206.262z"></Path></Svg>
                                    </View>
                                    <View>
                                        <Title>Voucher cho Sản Phẩm</Title>
                                        <Styletext1 second numberOfLines={2}>Có thể áp dụng voucher này cho một số các sản phẩm trong Shop của bạn</Styletext1>
                                    </View>
                                </Pressable>
                                <Dot/>
                                <Pressable style={styles.center} onPress={()=>navigation.navigate("Detailvoucher",{code_type:'3',headers:headers})} style={[{padding:8},styles.flexcenter]}>
                                    <View style={{width:32}}>
                                        <Svg style={[styles.svg_icon3,{color:'#ee4d2d'}]} viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg"><Path fill-rule="evenodd" clip-rule="evenodd" d="M15.21 4.203c0-.4-.324-.725-.725-.725H2.892c-.4 0-.724.325-.724.725v11.594c0 .4.324.725.724.725h11.595c.4 0 .724-.325.724-.725V4.203zM6.514 8.019c0-.5.347-.694.75-.45l3.293 1.986c.41.247.404.658 0 .902l-3.293 1.976c-.412.244-.75.04-.75-.45V8.019z"></Path><Path d="M18.833 12.707c0 .82-.703.967-1.072.742l-1.826-.965V7.565l1.781-1.02c.36-.211 1.11-.074 1.117.745v5.417z"></Path></Svg>
                                    </View>
                                    <View>
                                        <Title>Voucher Shopee Live</Title>
                                        <Styletext1 second numberOfLines={2}>Chỉ áp dụng cho sản phẩm trong livestream trên Shopee Live</Styletext1>
                                    </View>
                                </Pressable>
                            </View> 
                            <View style={{backgroundColor:'rgba(0,0,0,0.06)',height:10}}></View>
                            <View>
                                <Pressable onPress={()=>setShow(false)} style={[{width:'100%',height:40},styles.item_center]}>
                                    <Text >Hủy</Text>
                                </Pressable>
                            </View>
                            
                        </StyleModalContent>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </Container>
    )
}

export default Listvoucher