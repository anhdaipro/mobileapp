import { Container,styles,StyleBtn, Styletext, Styletext1 } from "../marketing/styles"
import React,{useState,useEffect,useMemo} from 'react';
import { productshopURL,detailproductURL } from '../../../urls';
import { formatter, arraymove } from '../../../constants';
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
  Image,
  Modal,
  FlatList,
  TextInput,
  Dimensions,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import {useSelector} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Dropdow=styled.View`
position:absolute;
right:0;
top:40px;
z-index:10;
background-color:#fff;
padding:0 8px;
width:120px;

`
const Itemdrop=styled.Pressable`
border-bottom-width:1px;
align-items:center;
justify-content:center;
border-color:rgba(0,0,0,0.1);
padding:8px 0
`
const Contentoption=styled.View`
width:40px;
height:40px;
justify-content:center;

align-items:center;
border:1px solid rgba(0,0,0,0.2);

`
const Item=styled.View`
padding:12px;
background-color:#fff;
margin-bottom:8px
`
const Itemtab=styled.View`
justify-content:center;
align-items:center;
flex:1;
z-index:2;
position:relative
`
const Tabbottom=styled.View`
width:100%;
height:2px;
bottom:0;
left:0;
background-color:#ee4d2d;
position:absolute;
opacity:${props=>props.active?1:0}
`
const ItemView=styled.View`
padding:8px 0;
flex-direction:row;
border-color:rgba(0,0,0,0.1);
border-bottom-width:1px
`
const Itemaction=styled.View`
padding-top:12px
`
const Iteminfo=styled.View`
padding-bottom:12px;
border-color:rgba(0,0,0,0.1);
border-bottom-width:1px
`
const Boxprotion=styled.View`
border:1px solid #ee4d2d;
padding:0 2px;
color:#ee4d2d;
line-height:12px;
font-size:10px
`
const listitem=[
    {name:'Giá và tồn kho',value:'stock'},
    {name:'Sao chép',value:'coppy'},
    {name:'Xóa',value:'delete'},
    {name:'Đẩy',value:'push'},
]
const liststatus=[
    {name:'Còn hàng',value:'stocking'},
    {name:'Còn hàng',value:'soldout'},
    {name:'Reviewing',value:'review'},
    {name:'Vi phạm',value:'violet'},
    {name:'Đã ẩn',value:'hidden'},
]
const {width} = Dimensions.get('window');
const Product=({item,navigation,headers,setlistitem,products,index})=>{
    const [show,setShow]=useState(false)
    const [action,setAction]=useState()
    const setaction= async (itemchoice)=>{
        if(itemchoice.value=='push'){
            setlistitem(arraymove(products,index,0))
        }
        else if(itemchoice.value=='stock'){
            navigation.navigate("Updatevariation",{headers:headers,item_id:item.id})
        }
        else if (itemchoice.value=='delete'){
            const res= await axios.post(detailproductURL+item.id,JSON.stringify({action:'delete'}),headers())
            setlistitem(products.filter(product=>product.id!=item.id))
        }
    }
    const hideproduct = async ()=>{
        const res= await axios.post(detailproductURL+item.id,JSON.stringify({action:'hidden'}),headers())
        setlistitem(products.filter(product=>product.id!=item.id))
    }
    return(
        <Item>
            <Iteminfo style={[styles.flexrow]}>
                <Pressable onPress={() =>navigation.navigate('Product', { productID: item.id })}>
                    <ImageBackground style={styles.image} source={{uri:item.image}}/>
                </Pressable>
                <View style={{marginLeft:8,flex:1,alignItem:'flex-start',marginRight:8}}> 
                    <View style={[{marginBottom:4,flex:1}]}>
                        <Text numberOfLines={2} style={{color: 'rgba(0,0,0,0.6)',fontSize:14,lineHeight:16}}>{item.name}</Text>   
                    </View>
                    <Text style={[{flex:1}]}>
                        <Boxprotion>
                           <Styletext1 primary>Ưu đãi</Styletext1>
                        </Boxprotion>     
                    </Text>
                    <View style={[styles.flexcenter,{flex:1}]}>
                        <Text>₫{formatter(item.min_price)}</Text>
                        {item.min_price!==item.max_price?<Text> - ₫{formatter(item.max_price)}</Text>:null}
                    </View> 
                </View>
            </Iteminfo>
            <ItemView>
                <View style={{flex:1}}>
                    <View style={{marginBottom:8}}>
                        <Styletext second>Kho hàng {item.total_inventory}</Styletext>
                    </View>
                    <View style={styles.flexcenter}>
                        <Svg style={[styles.svg_icon,{marginRight:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path d="M7.71842712,13.881728 L2.23834957,8.40165043 C0.773883476,6.93718434 0.773883476,4.56281566 2.23834957,3.09834957 C3.65231683,1.68438231 5.9145167,1.63562482 7.38698276,2.9520771 L8.072,3.628 L8.60244214,3.09834957 C10.0669082,1.63388348 12.4412769,1.63388348 13.905743,3.09834957 C15.3702091,4.56281566 15.3702091,6.93718434 13.905743,8.40165043 L8.42553789,13.881732 C8.23027112,14.0769864 7.9136917,14.0769846 7.71842712,13.881728 Z M13.1986362,7.69454365 C14.272578,6.62060185 14.272578,4.87939815 13.1986362,3.80545635 C12.1246944,2.73151455 10.3834907,2.73151455 9.30902064,3.80598425 L8.42760306,4.68608625 C8.23313326,4.8802658 7.91840125,4.88109992 7.72290493,4.68795389 L6.72047402,3.69757431 L6.72047402,3.69757431 C5.637171,2.72905166 3.97820217,2.77271053 2.94545635,3.80545635 C1.87151455,4.87939815 1.87151455,6.62060185 2.94545635,7.69454365 L8.07198849,12.8210758 L13.1986362,7.69454365 Z"></Path></Svg>
                        <Styletext second>Thích {item.num_like}</Styletext>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{marginBottom:8}}>
                        <Styletext second>Đã bán {item.number_order}</Styletext>
                    </View>
                    <View>
                        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,3 C11.2768566,3 14.2509832,4.73532307 15.8639541,7.49526828 C16.0461435,7.80701139 16.0461267,8.19275955 15.8639103,8.50448682 C14.2503225,11.2649365 11.2766689,13 8,13 C4.72361081,13 1.74984512,11.2651739 0.136703532,8.50585685 C-0.0454653311,8.19425267 -0.0455747862,7.8086603 0.136417142,7.49695275 C1.74851701,4.73582102 4.72261636,3 8,3 Z M8,4 C5.00862607,4 2.39683566,5.60872276 1,8.0011597 C2.39756369,10.3917256 5.00904299,12 8,12 C10.990957,12 13.6024363,10.3917256 15.0005844,7.99984002 C13.6031643,5.60872276 10.9913739,4 8,4 Z M8,4.5 C9.93299662,4.5 11.5,6.06700338 11.5,8 C11.5,9.93299662 9.93299662,11.5 8,11.5 C6.06700338,11.5 4.5,9.93299662 4.5,8 C4.5,6.06700338 6.06700338,4.5 8,4.5 Z M8,5.5 C6.61928813,5.5 5.5,6.61928813 5.5,8 C5.5,9.38071187 6.61928813,10.5 8,10.5 C9.38071187,10.5 10.5,9.38071187 10.5,8 C10.5,6.61928813 9.38071187,5.5 8,5.5 Z"></Path></Svg>
                        <Styletext second>Lượt xem {item.views}</Styletext>
                    </View>
                </View>
            </ItemView>
            <Itemaction style={styles.flexrow}>
                <StyleBtn onPress={()=>hideproduct()} style={{marginRight:8,flex:1}}>
                    <Text>Ẩn</Text>
                </StyleBtn>
                <StyleBtn onPress={()=>navigation.navigate("Detailproduct",{id:item.id,headers:headers})} style={{marginRight:8,flex:1}}>
                    <Text>Chỉnh sửa</Text>
                </StyleBtn>
                
                    <Contentoption>
                        <Pressable style={[{flex:1},styles.center]} onPress={()=>setShow(!show)}>
                            <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 32.055 32.055" enableBackground="new 0 0 32.055 32.055" xmlSpace="preserve">
                                <G>
                                    <Path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
                                </G>
                            </Svg>
                        </Pressable>
                        
                        {show?
                            <Dropdow style={styles.elevation}>
                                <View>
                                    {listitem.map(item=>
                                        <Itemdrop onPress={()=>setaction(item)} key={item.value}>
                                            <Text>{item.name}</Text>
                                        </Itemdrop>
                                    )}
                                </View>
                            </Dropdow>
                        :null}
                   
                    </Contentoption>
                
                
            </Itemaction>
        </Item> 
    )
}
const Myproduct=(props)=>{
    const {navigation}=props
    const count_message_unseen=useSelector(state=>state.auth.count_message_unseen)
    const [state,setState]=useState({show:false})
    const [search,setSearch]=useState(false)
    const [itemshop,setItem]=useState({pageitem:[],page_count:1,count_product:1})
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(false)
    const [currentPage, setCurrentPage] = useState({page:1,pagesize:12});
    const [token,setToken]=useState()
    const [choice,setChoice]=useState('stocking')
    useEffect(()=>{
        (async()=>{
        const value = await AsyncStorage.getItem('token')
        setToken(value)
        })()
    },[])
    const headers=useMemo(()=>{
        return {'headers':token?{ Authorization:`JWT ${token}`,'Content-Type': 'application/json' }:{'Content-Type': 'application/json'}}
    },[token])
    console.log(products)
    const setlistitem=(data)=>{
        setProducts(data)
    }

    useEffect(() => {
        (async () => {
            if(token){
            const res = await axios(productshopURL,headers())
            const data=res.data
            setProducts(data.products)
            setLoading(true)
            setItem({...itemshop,count_product:data.count})
        }
        })();
    }, [token]);
    console.log(itemshop.count_product)
   
    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                        <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Thêm sản phẩm mới</Text>
                </View>
                <View>
                    <Pressable style={{marginRight:16}} onPress={()=>setSearch(true)}>
                        <Svg viewBox="0 0 19 19" style={[styles.svg_icon3,{color:'#ee4d2d'}]}><G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G></Svg>
                    </Pressable>
                    <View style={{position:'relative'}}>
                        <Pressable onPress={()=>navigation.navigate('Draggable')}>
                            <Svg style={[styles.svg_icon3,{color:'#ee4d2d',stroke:'#ee4d2d'}]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
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
            <View style={{marginBottom:8,backgroundColor:'#fff'}}>
                    <ScrollView 
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{width:width*liststatus.length/3,flexDirection:'row'}}>
                        {liststatus.map((item,index)=>
                            <Itemtab key={index} style={{width:width/3}}>
                                <TouchableHighlight
                                    activeOpacity={0.6}
                                    underlayColor="rgba(0,0,0,.1)"
                                    style={[styles.item_center]} onPress={()=>setChoice(item.value)}>
                                    <View style={[styles.item_center,{width:'100%',paddingBottom:8,paddingTop:8}]}>
                                        <View>
                                            <Text style={[{textAlign:'center',color:choice==item.value?'#ee4d2d':'#757575',lineHeight:18}]}>{item.name}</Text>
                                            <Text style={[{textAlign:'center',color:choice==item.value?'#ee4d2d':'#757575'}]}>{item.name}</Text>
                                        </View>
                                        
                                        <Tabbottom active={choice==item.value?true:false}></Tabbottom>
                                    </View>
                                </TouchableHighlight>
                            </Itemtab>
                        )}
                    </ScrollView>
                </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:60}}
            >
                <FlatList
                    renderItem={({item,index})=><Product
                    item={item}
                    index={index}
                    headers={headers}
                    navigation={navigation}
                    products={products}
                    setlistitem={data=>setlistitem(data)}
                    />}
                    data={products}
                    keyExtractor={item=>item.id}
                />
            </ScrollView>
            <View style={[styles.fotter,{padding:8}]}>             
                 <StyleBtn onPress={()=>navigation.navigate("Detailproduct",{})} style={{flex:1}}>
                     <Text>Thêm một sản phẩm mới</Text>
                </StyleBtn>  
            </View> 
        </Container>
    )
}
export default Myproduct