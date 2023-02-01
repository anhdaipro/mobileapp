import React, {useState,useCallback,useEffect,useMemo} from 'react'
import {formatter,timepromotion,percent, timeformat,listchoice,choice_option} from "../../../../constants"
import { listdiscountshopURL,} from "../../../../urls"
import axios from 'axios'
import styled from "styled-components"
import Tabs from "../Tabs"
import dayjs from "dayjs"
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
import {styles,Container,Styletext,Styletext1,StyleBtn, Flexrow} from "../styles"
import { FlatList,TouchableHighlight, SafeAreaView,ImageBackground,Text,View, Pressable, Modal,TouchableWithoutFeedback } from 'react-native'
import { useSelector } from 'react-redux'
import {} from "../../../../actions/auths"
import AsyncStorage from "@react-native-async-storage/async-storage"
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
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
const Itemlast=styled.View`
position: absolute;
bottom: 0;
right: 0;
width:32px;
height:32px;
background-color: rgba(0,0,0,.5);
border-radius: 2px;
`
const Dot=styled.View`
width:100%;
margin-left:40px
height:1px;
background-color:rgba(0,0,0,0.1)
`
const Listdiscountshop=(props)=>{
    const {navigation}=props
    const [listdiscount,setDiscount]=useState([])
    const [loading,setLoading]=useState(true)
    const [choice,setChoice]=useState('current')
    const [count,setCount]=useState(0)
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
  
    const [keyword,setKeyword]=useState()
    useEffect(()=>{
        (async()=>{
            if(token){
            const res =await axios.get(`${listdiscountshopURL}?&offset=${listdiscount.length}`,headers())
            setDiscount(current=>[...current,...res.data.data])
            setLoading(true)
            }
        })()
    },[token])
    
    
    const setdata=(data)=>{
      setDiscount(current=>[...data])
    }
    
    const Program=({item})=>{
        return(
            <View style={{padding:8}}>
                <Flexrow style={styles.item_space}>
                    <View>
                        <View>
                            <Text>{item.name_program}</Text>
                        </View>
                        <View style={{marginTop:8}}>
                            <Text>{dayjs(item.valid_from).format("DD-MM-YYYY HH:mm")} - {dayjs(item.valid_to).format("DD-MM-YYYY HH:mm")}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{position:'relative'}}>
                        {item.products.map((product,index)=>{
                            if(index<4){
                                return(
                                    <View style={{height:32,width:32}}>
                                        <ImageBackground resizeMode="cover" style={{height:'100%',width:'100%'}} source={{uri:product.image}}/>
                                    </View>
                                )}}
                            )}
                            {item.products.length>4?
                            <Itemlast>
                                <Text style={{color:'#fff',textAlign:'center',fontSize:12}}>+{item.products.length-4}</Text>
                            </Itemlast>:null}
                        </View>
                    </View>
                </Flexrow>
                <Flexrow style={{marginTop:12}}>
                    {new Date(item.valid_to)<new Date()?
                    <StyleBtn onPress={()=>navigation.navigate("Detailprogram",{id:item.id,headers:headers})} style={{flex:1}}>
                        <Text>Xem</Text>
                    </StyleBtn>:
                    <>
                        <StyleBtn onPress={()=>navigation.navigate("Detailprogram",{id:item.id,headers:headers})} style={{flex:1,marginRight:8}}>
                            <Text>Chỉnh sửa</Text>
                        </StyleBtn>
                        {new Date(item.valid_from)<new Date()?
                        <StyleBtn onPress={()=>navigation.navigate("Detailprogram",{id:item.id,headers:headers})} style={{flex:1}}>
                            <Text>Kết thúc ngay</Text>
                        </StyleBtn>:null}
                        <StyleBtn onPress={()=>navigation.navigate("Detailprogram",{id:item.id,headers:headers})} style={{flex:1}}>
                            <Text>Chia sẻ</Text>
                        </StyleBtn>
                    </>
                    }
                </Flexrow>
            </View>
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
            {token &&(
            <View >
                <View >   
                    <Tabs
                        url={listdiscountshopURL}
                        listchoice={listchoice}
                        choice={choice}
                        headers={headers}
                        loading={loading}
                        setchoice={data=>setChoice(data)}
                        setcount={data=>setCount(data)}
                        setdata={data=>setdata(data)}
                        setloading={data=>setLoading(data)}
                    />
                    <Wrapper>
                        <FlatList
                            data={listdiscount}
                            renderItem={({item})=><Program item={item}/>}
                            keyExtractor={item=>item.id}
                        />                   
                                                       
                        {count==0?
                        <View>
                            <View>      
                                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 86"><G fill="none" fillRule="evenodd" transform="translate(-4 -4)"><Rect width="96" height="96"></Rect><Ellipse cx="49" cy="85" fill="#F2F2F2" rx="45" ry="5"></Ellipse><Rect width="34" height="15" x="34.5" y="24.5" fill="#FAFAFA" stroke="#D8D8D8" rx="2" transform="rotate(30 51.5 32)"></Rect><Rect width="33" height="15" x="25.5" y="25.5" fill="#FAFAFA" stroke="#D8D8D8" rx="2" transform="rotate(15 42 33)"></Rect><Path fill="#FFF" stroke="#D8D8D8" d="M13.5,42.5164023 C17.4090159,42.7736953 20.5,46.0258787 20.5,50 C20.5,53.9741213 17.4090159,57.2263047 13.5,57.4835977 L13.5,73 C13.5,73.8284271 14.1715729,74.5 15,74.5 L83,74.5 C83.8284271,74.5 84.5,73.8284271 84.5,72.9999686 L84.5009752,57.483515 C84.3347628,57.4944876 84.1677086,57.5 84,57.5 C79.8578644,57.5 76.5,54.1421356 76.5,50 C76.5,45.8578644 79.8578644,42.5 84,42.5 C84.1677086,42.5 84.3347628,42.5055124 84.5009752,42.516485 L84.5,27 C84.5,26.1715729 83.8284271,25.5 83,25.5 L15,25.5 C14.1715729,25.5 13.5,26.1715729 13.5,27 L13.5,42.5164023 Z"></Path><Path fill="#D8D8D8" d="M71.5,59 C71.7761424,59 72,59.2238576 72,59.5 C72,59.7761424 71.7761424,60 71.5,60 L40.5,60 C40.2238576,60 40,59.7761424 40,59.5 C40,59.2238576 40.2238576,59 40.5,59 L71.5,59 Z M59.5,49 C59.7761424,49 60,49.2238576 60,49.5 C60,49.7761424 59.7761424,50 59.5,50 L40.5,50 C40.2238576,50 40,49.7761424 40,49.5 C40,49.2238576 40.2238576,49 40.5,49 L59.5,49 Z M71.5,39 C71.7761424,39 72,39.2238576 72,39.5 C72,39.7761424 71.7761424,40 71.5,40 L40.5,40 C40.2238576,40 40,39.7761424 40,39.5 C40,39.2238576 40.2238576,39 40.5,39 L71.5,39 Z"></Path><Line x1="28.5" x2="28.5" y1="26" y2="75" stroke="#D8D8D8" strokeDasharray="4"></Line><G fill="#D8D8D8" transform="translate(82.16 4.04)"><Circle cx="10" cy="13" r="3" opacity=".5"></Circle><Circle cx="2" cy="9" r="2" opacity=".3"></Circle><Path d="M8.5,1 C7.67157288,1 7,1.67157288 7,2.5 C7,3.32842712 7.67157288,4 8.5,4 C9.32842712,4 10,3.32842712 10,2.5 C10,1.67157288 9.32842712,1 8.5,1 Z M8.5,7.10542736e-15 C9.88071187,7.10542736e-15 11,1.11928813 11,2.5 C11,3.88071187 9.88071187,5 8.5,5 C7.11928813,5 6,3.88071187 6,2.5 C6,1.11928813 7.11928813,7.10542736e-15 8.5,7.10542736e-15 Z" opacity=".3"></Path></G></G></Svg>        
                                <Text>Không có chương trình nào</Text>
                            </View>
                        </View>:''}
                    </Wrapper>
                </View>  
                    
            </View>)}
            <View style={[styles.fotter,{padding:8}]}>             
                 <StyleBtn onPress={()=>navigation.navigate("Detailprogram",{headers:headers})} style={{flex:1}}>
                     <Text>Tạo chương trình khuyến mãi mới</Text>
                </StyleBtn>  
            </View> 
        </Container>
    )
}

export default Listdiscountshop