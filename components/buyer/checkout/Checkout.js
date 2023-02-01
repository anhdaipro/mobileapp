import axios from 'axios';
import React, {useState, useEffect,useRef,useCallback} from 'react'
import { showvariation,headers} from '../../../actions/auths';
import {localhost,threadlURL,updateAddressURL,checkoutURL} from "../../../urls"
import {formatter,itemvariation} from "../../../constants"
import {URL} from "react-native-url-polyfill"
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
import { Pressable,ScrollView,View,Text,SafeAreaView,StyleSheet,TextInput,Image,TouchableHighlight } from 'react-native';
import {connect} from "react-redux"
import LoadingDots from '../../../hocs/Loading';

const Flex=styled.View`
flex-direction:row;
`
const FlexStart=styled(Flex)`
align-items: flex-start;
`
const Flexend=styled.View`
align-items: flex-end;
justify-content:flex-end;
`
const StyleShipping=styled.View`
border-top-width:1px ;
border-bottom-width:1px;
border-color:#b7f1ea;
background-color: #edf5f4;
padding:8px
`
const StyleLoading=styled.View`
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
`
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
const Dot=styled.View`
    height: 3px;
    width: 100%;
    background-position-x: -30px;
    background-size: 116px 3px;
    background-image: repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px);

`
const StyleDot=styled.View`
width:100%;
height:1px;
background-color: rgba(0,0,0,0.1);
`
const ShopType=styled.Text`
background-color: #d0011b;
border-radius: 2px;
padding: 2px 2px;
line-height: 12px;
`
const StyleSwitch=styled.View`
position:relative;
border-radius:12px;
width:36px;
margin-left:4px;
background-color:${props=>props.open?'#5c7':'#b7b7b7'};
height:20px;
`
const Swidth=styled.View`
left:${props=>props.open?18:2}px;
background-color: #fff;
border-radius: 8px;
position:absolute;
width: 16px;
height: 16px;
margin-top: 2px;
`
const Infoitem=(props)=>{
    const {item}=props
    return(
        <Flex style={{padding:8,width:'100%',backgroundColor:'rgba(0,0,0,0.02)'}}>
            <View style={{marginRight:8}}>
                <Image className="_1Qtf1H" source={{uri:item.image}} style={styles.image}/>    
            </View>
            <View style={{flex:1}}>
                <Text style={{flex:1}} numberOfLines={1}>[Mã LTDEC giảm 50K đơn 150K] {item.name}</Text> 
                <View style={{flex:1}}>
                    {itemvariation(item)!=''?<Styletext second>Phân loại: {itemvariation(item)}</Styletext>:null}
                </View>
                <View style={styles.item_space}>
                    <Text style={styles.fontnomal}>₫{formatter(item.price)}</Text>
                    <Styletext second>x{item.quantity}</Styletext>
                </View>
            </View>
            
            
        </Flex>
    )
}
const Checkout = (props) => {
    const {route,navigation,token}=props
  
    const [state,setState] = useState({total_final:0,total:0,discount_promotion:0,address:null,method_payment:['Ví Điện tử','Thẻ Tín dụng/Ghi nợ',
    'Paypal','Số dư TK Shopee','Payment on delivery'],
    method_choice:'Ví Điện tử',address_choice:null,address_order:null,list_addresses:[],show:false,show_message:false,
    show_message:false})
    const [orders,setOrders]=useState([])
    const [address,setAddress]=useState({address_type:"S",address:'',address_choice:'',default:false,name:'',phone_number:''});
    const [show,setShow]=useState(false)
    const [usexu,setUsexu]=useState(false)
    const [loading,setLoading]=useState(false)
    const [city,setCity]=useState({list_city:[]})
    const [addresschoice,setAddressChoice]=useState({city_choice:{'name':null,'matp':null,level:1},
    district_choice:{'name':null,'matp':null,level:2,'maqh':null},
    town_choice:{'name':null,'maqh':null,level:3},showcity:false})
    
    useEffect(() => {
        (async () => {
            const [obj1,obj2]=await axios.all([
                axios.get(checkoutURL,headers()),
                axios.get(`${updateAddressURL}?default=true`,headers())
                ])
                let total=0
                let total_final=0
                let fee_shipping=0
                let discount_promotion=0
                let discount_voucher=0
                let address_order=null
               console.log()
                obj1.data.map((order)=>{
                    total_final+=order.total_final
                    total+=order.total
                    fee_shipping+=order.fee_shipping
                    discount_promotion+=order.discount_promotion
                    discount_voucher+=order.discount_voucher
                })
                
                if(obj2.data.length>0){
                    address_order=obj2.data[0]
                }
                else{
                    createAddress()
                }
                setLoading(true)
                setState(prev=>{return{...prev,total_final:total_final,total:total,
                    discount_promotion:discount_promotion,discount_voucher:discount_voucher,
                    address_order:address_order,fee_shipping:fee_shipping,address_choice:address_order
                }})
                setOrders(obj1.data)
        })()
        
    }, []);
    
    const  checkout=(e)=>{
        const data={id:state.address_order.id,payment_choice:state.method_choice}
        axios.post(checkoutURL,JSON.stringify(data),headers())
            .then(res=>{ 
                if(state.method_choice=='Payment on delivery'){
                navigation.navigate("Account")
                }
                if(state.method_choice=='Paypal'){
                navigation.navigate('Payment')
                }
            })
        }
    
    function changeaddress(){
        if(state.list_addresses.length==0){
            axios.get(updateAddressURL,headers())
            .then(res=>{
                setState({...state,list_addresses:res.data.a,show:true})
            })
        }
        else{
            setState({...state,show:true})
        }
    }

    function createAddress(){
        const address_null = {address:'',address_choice:'',default:state.list_addresses.length==0?true:false,name:'',phone_number:''}
        setAddress(address_null)
        setShow(true)
        if(city.list_city.length==0){
            axios.get(cityListURL)
            .then(res=>{
                const list_city=res.data
                setCity({list_city:list_city})
            })
        } 
    }
    
    const setaddressOrder=(e,address)=>{
        state.address_choice=address
        setState({...state,address_chocie:state.address_choice})
    }
    
    const setshow = (es) => {
        setShow(es);
        if(es==false){
            setAddressChoice({city_choice:{'name':null,'matp':null,level:1},
            district_choice:{'name':null,'matp':null,level:2,'maqh':null},
            town_choice:{'name':null,'maqh':null,level:3},showcity:false})   
        }
    }

    const setcitychoice=useCallback((city)=>{
        setAddressChoice({...addresschoice,city_choice:{'name':city.name,'matp':city.matp,level:1},district_choice:{'name':null,'matp':null,level:2,'maqh':null},
        town_choice:{'name':null,'maqh':null,level:3}})
    }, [addresschoice]);

    const setdistrictchoice=(district)=>{
        setAddressChoice({...addresschoice,district_choice:{'name':district.name,'matp':district.matp,level:2,'maqh':district.maqh},town_choice:{'name':null,'maqh':null,level:3}})
    }
    const settownchoice=(town)=>{
        setAddressChoice({...addresschoice,town_choice:{'name':town.name,'maqh':town.maqh,level:3}})
    }

    const setformdata=(e)=>{
        setAddress({...address,[e.target.name]:e.target.value})
    }

    const clearaddress=()=>{
        setAddressChoice({city_choice:{'name':null,'matp':null,level:1},
        district_choice:{'name':null,'matp':null,level:2,'maqh':null},
        town_choice:{'name':null,'maqh':null,level:3},showcity:false})
    }

    const addressChoice=(item)=>{
        setAddress({...address,address_choice:item})
    }

    const setlistaddress=useCallback((data) => {
        console.log(data)
        const list_addresses=state.list_addresses.map(address=>{
            if(data.default && data.id!=address.id){
                return({...address,default:false})
            }
            else{
                return({...address})
            }
        })
        
        const address_choice=state.address_order==null?data:state.address_choice
        setState({...state,list_addresses:list_addresses,address_choice: address_choice,address_order: address_choice})
        
    }, [state]);
    
    const defaultaddress=useCallback(()=>{
        state.address.default=!state.address.default
        setState({...state,address:state.address})
    }, [state]);

    const setshowthread=(e,order)=>{
        e.preventDefault()
        let data={member:[user.id,order.shop.user_id],thread:null}
        showchat(data)
        showthreads()
    }
    const settext=(value,orderchoice)=>{
        setOrders(prev=>prev.map(order=>{
            if(orderchoice.shop==order.shop){
                return({...order,message:value})
            }
            return({...order})
        }))
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.item_center}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Thanh toán</Text>
                </View> 
            </View>
            {loading?<>
            
                <ScrollView
                contentContainerStyle={{paddingBottom:42}}
                >
                    <View style={{backgroundColor:'#fff',padding:12}}>
                        <Flex>
                            <View style={{marginRight:12}}>
                                <Svg height="16" style={styles.svg_icon1} viewBox="0 0 12 16" width="12"><Path d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z" fillRule="evenodd"></Path></Svg>
                            </View>
                            <Text>Địa chỉ nhận hàng</Text>
                        </Flex>   
                        {state.address_order!=null?
                        <View>
                            <Pressable  style={[styles.item_space,{paddingLeft:24}]} onPress={(e)=>navigation.navigate('ListAddress')}>
                                <View>
                                    <Text>{state.address_order.name} (+84) {state.address_order.phone_number}</Text>
                                    <Text>{state.address_order.address}</Text>
                                    <Text >{state.address_order.town}, {state.address_order.district}, {state.address_order.city}</Text>
                                </View>
                                <View >
                                    <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                                </View>
                            </Pressable>
                            
                        </View>:null
                        } 
                    </View>
                    <Dot/>
                    <View>
                        {orders.map(order=>
                        <View style={[{marginBottom:8}]} key={order.id}>
                            <View>
                                <Flex style={[styles.flexcenter,{padding:8,backgroundColor:'#fff'}]}>
                                    <ShopType>
                                        <Svg style={styles.svg_icon2} viewBox="0 0 24 11"><G fill="#fff" fillRule="evenodd"><Path d="M19.615 7.143V1.805a.805.805 0 0 0-1.611 0v5.377H18c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm3 0V1.805a.805.805 0 0 0-1.611 0v5.377H21c0 1.438.634 2.36 1.902 2.77V9.95c.09.032.19.05.293.05.444 0 .805-.334.805-.746a.748.748 0 0 0-.498-.69v-.002c-.59-.22-.885-.694-.885-1.42h-.002zm-7.491-2.985c.01-.366.37-.726.813-.726.45 0 .814.37.814.742v5.058c0 .37-.364.73-.813.73-.395 0-.725-.278-.798-.598a3.166 3.166 0 0 1-1.964.68c-1.77 0-3.268-1.456-3.268-3.254 0-1.797 1.497-3.328 3.268-3.328a3.1 3.1 0 0 1 1.948.696zm-.146 2.594a1.8 1.8 0 1 0-3.6 0 1.8 1.8 0 1 0 3.6 0z"></Path><Path d="M.078 1.563A.733.733 0 0 1 .565.89c.423-.15.832.16 1.008.52.512 1.056 1.57 1.88 2.99 1.9s2.158-.85 2.71-1.882c.19-.356.626-.74 1.13-.537.342.138.477.4.472.65a.68.68 0 0 1 .004.08v7.63a.75.75 0 0 1-1.5 0V3.67c-.763.72-1.677 1.18-2.842 1.16a4.856 4.856 0 0 1-2.965-1.096V9.25a.75.75 0 0 1-1.5 0V1.648c0-.03.002-.057.005-.085z" fillRule="nonzero"></Path></G></Svg>
                                    </ShopType>
                                    <Text className="_3xBVfW">{order.shop.name}</Text>
                                </Flex>
                                <View className="_1oOvbg">
                                    {order.cart_item.map(cartitem=><>
                                        <Infoitem
                                            item={cartitem}
                                            key={cartitem.id}
                                        />
                                        {cartitem.byproducts.map(byproduct=>
                                            <Infoitem
                                                key={byproduct.id}
                                                item={byproduct}
                                            />
                                        )}
                                        </>
                                    )}
                                    <View style={[{padding:8,backgroundColor:'#fff'}]}>
                                        <View style={styles.item_space}>
                                            <View style={styles.flexcenter}>
                                                
                                                <Svg style={[styles.svg_icon2,{height:20,marginRight:4}]} viewBox="0 -2 23 22"><G filter="url(#voucher-filter0_d)"><Mask id="a" fill="#fff"><Path fillRule="evenodd" clipRule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></Path></Mask><Path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></Path></G><Path clipRule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></Path></Svg>
                                                <Text style={{lineHeight:18}}>Voucher của Shop</Text>
                                               
                                            </View>
                                            
                                            <Pressable style={styles.flexcenter}>
                                                <Text style={styles.fontnomal}>Chọn hoặc nhập mã</Text>
                                                <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                                            </Pressable>
                                            
                                        </View>
                                    </View>
                                </View>
                                <View style={[{marginBottom:2}]}>
                                    <StyleShipping>
                                        <View>
                                            <Text style={{color: '#00bfa5'}}>Phương thức vận chuyển (Nhấn để chọn)</Text>
                                        </View>
                                        
                                        <View style={styles.item_space}>
                                            <Text>Nhanh</Text>
                                            <View style={styles.flexcenter}>
                                                <Text>₫42.500</Text>
                                                <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                                            </View>
                                        </View>
                                       
                                        <View className="_26DEZ8">
                                          <Styletext second> Nhận hàng vào thứ 8 - t7 7tt</Styletext> 
                                        </View>
                                        <View className="_1OKizE">
                                            <Text style={styles.fontnomal}>(đừng quên vào shopee boucher dder nahn thêm mã ưu đãi của bạn nhé)</Text>
                                        </View>
                                    </StyleShipping>
                                    <View style={[{padding:8,backgroundColor:'#fff'}]}>
                                        <View style={styles.item_space}>
                                            <Text>Lời nhắn:</Text>
                                            <View className="_2RoXL2">
                                                <View className="-MhUeb nVfi9v">
                                                    <TextInput onChangeText={(text)=>settext(text,order)} style={{fontSize:12,textAlign:'right'}} placeholder="Lưu ý cho Người bán..." value={order.message}/>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.item_space,{padding:8,backgroundColor:'#fff'}]}>
                                    <Text style={styles.textnomal}>Tổng số tiền ({order.count} sản phẩm):</Text>
                                    <Text style={styles.textorange}>₫{formatter(order.total_discount)}</Text>
                                </View> 
                            </View>
                        </View>      
                        )}
                    </View>
                    <View>
                        <View style={[{backgroundColor:'#fff',marginBottom:8}]}>
                            <View style={{padding:8,}}>
                                <View style={styles.item_space}>
                                    <View style={styles.flexcenter}>
                                                
                                        <Svg style={[styles.svg_icon2,{height:20,marginRight:4}]} viewBox="0 -2 23 22"><G filter="url(#voucher-filter0_d)"><Mask id="a" fill="#fff"><Path fillRule="evenodd" clipRule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></Path></Mask><Path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></Path></G><Path clipRule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></Path></Svg>
                                        <Text style={{lineHeight:18}}>shopee Voucher</Text>
                                               
                                    </View>
                                            
                                    <Pressable style={styles.flexcenter}>
                                        <Text style={styles.fontnomal}>Chọn hoặc nhập mã</Text>
                                        <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                                    </Pressable>
                                            
                                </View>
                            </View>
                            <StyleDot/>
                            <View style={{padding:8,}}>
                                <View style={styles.item_space}>
                                    <View style={styles.flexcenter}>        
                                        <Svg style={[styles.svg_icon,{marginRight:4}]} fill="none" viewBox="0 0 18 18"><Path stroke="#FFA600" stroke-width="1.3" d="M17.35 9A8.35 8.35 0 11.65 9a8.35 8.35 0 0116.7 0z"></Path><Path fill="#FFA600" fill-rule="evenodd" stroke="#FFA600" stroke-width=".2" d="M6.86 4.723c-.683.576-.998 1.627-.75 2.464.215.725.85 1.258 1.522 1.608.37.193.77.355 1.177.463.1.027.2.051.3.08.098.03.196.062.294.096.06.021.121.044.182.067.017.006.107.041.04.014-.07-.028.071.03.087.037.286.124.56.27.82.44.114.076.045.024.151.111a2.942 2.942 0 01.322.303c.087.093.046.042.114.146.18.275.245.478.235.8-.01.328-.14.659-.325.867-.47.53-1.232.73-1.934.696a4.727 4.727 0 01-1.487-.307c-.45-.182-.852-.462-1.242-.737-.25-.176-.643-.04-.788.197-.17.279-.044.574.207.75.753.532 1.539.946 2.474 1.098.885.144 1.731.124 2.563-.224.78-.326 1.416-.966 1.607-1.772.198-.838-.023-1.644-.61-2.29-.683-.753-1.722-1.17-2.706-1.43a4.563 4.563 0 01-.543-.183c.122.048-.044-.02-.078-.035a4.77 4.77 0 01-.422-.212c-.594-.338-.955-.722-.872-1.369.105-.816.757-1.221 1.555-1.28.808-.06 1.648.135 2.297.554.614.398 1.19-.553.58-.947-1.33-.86-3.504-1.074-4.77-.005z" clip-rule="evenodd"></Path></Svg>
                                        <Text style={{lineHeight:18}}>Dùng 300 shopee xu</Text>     
                                    </View>    
                                    
                                    <Pressable style={styles.flexcenter}>
                                        <Text style={styles.fontnomal}>[-₫300]</Text>
                                        <Pressable onPress={()=>setUsexu(!usexu)}>
                                        <StyleSwitch>
                                            <Swidth/>
                                        </StyleSwitch>
                                        </Pressable>
                                        
                                        
                                    </Pressable>
                                            
                                </View>
                            </View>
                        </View>
                        <View style={[{padding:8,backgroundColor:'#fff',marginBottom:8}]}>
                            <View style={styles.item_space}>
                                <View style={styles.flexcenter}>
                               
                                    <Svg style={[styles.svg_icon,{marginRight:4}]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 244.948 244.948" enableBackground="new 0 0 244.948 244.948" xmlSpace="preserve">
                                        <G>
                                            <Path fill="#ee4d2d" d="M122.474,0C54.948,0,0.008,54.951,0.008,122.477s54.94,122.471,122.466,122.471    S244.94,189.997,244.94,122.471S190,0,122.474,0z M122.474,222.213c-55.005,0-99.752-44.742-99.752-99.742    c0-55.011,44.747-99.752,99.752-99.752s99.752,44.742,99.752,99.752C222.221,177.477,177.479,222.213,122.474,222.213z"/>
                                            <G>
                                                <Path fill="#ee4d2d" d="M113.739,180.659c-6.092-0.228-11.438-0.881-16.023-1.958c-4.596-1.093-8.175-2.35-10.742-3.758     l6.255-18.324c1.92,1.175,4.618,2.295,8.088,3.361c3.47,1.061,7.615,1.822,12.423,2.252v-32.547     c-3.312-1.485-6.598-3.144-9.856-4.966c-3.258-1.817-6.168-3.998-8.735-6.57c-2.567-2.562-4.629-5.624-6.173-9.208     c-1.545-3.584-2.322-7.821-2.322-12.744c0-9.192,2.431-16.323,7.294-21.403c4.857-5.069,11.46-8.354,19.793-9.85V50.344h16.671     v13.951c4.699,0.31,8.817,0.946,12.341,1.909c3.525,0.946,6.783,2.067,9.774,3.329l-5.771,17.672     c-1.817-0.848-4.112-1.702-6.891-2.562c-2.779-0.848-5.929-1.485-9.459-1.92v30.122c3.312,1.501,6.652,3.182,10.019,5.047     c3.361,1.882,6.353,4.096,8.974,6.652c2.616,2.578,4.754,5.586,6.413,9.067c1.653,3.481,2.486,7.604,2.486,12.417     c0,9.839-2.486,17.497-7.457,23.002c-4.966,5.504-11.776,9.045-20.429,10.644v14.914h-16.671L113.739,180.659L113.739,180.659z      M107.484,94.341c0,3.225,1.251,5.918,3.764,8.055c2.513,2.148,5.64,4.15,9.382,5.978v-26.14c-5.026,0.228-8.48,1.458-10.34,3.72     C108.42,88.205,107.484,91.006,107.484,94.341z M137.459,148.274c0-3.389-1.36-6.162-4.085-8.316     c-2.725-2.159-6.01-4.145-9.861-5.945v28.218c4.705-0.538,8.202-2.012,10.503-4.438     C136.311,155.361,137.459,152.19,137.459,148.274z"/>
                                            </G>
                                        </G>
                                    </Svg>
                                    <Text>Phương thức thanh toán</Text>
                                
                                </View>
                            
                                <Pressable style={styles.flexcenter}>
                                    <Text style={styles.textorange}>Chọn phương thức thanh toán</Text>
                                    <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                                </Pressable>
                            </View>
                            <View style={{marginTop:8,position:'relative',backgroundColor:'#fff8e4',borderColor:'#FFA600',borderWidth:1,padding:8}}>
                                <Text style={{color:'rgb(237, 165, 0)'}}>Thanh toán dễ dàng hơn với sgo pay</Text>
                            </View>
                        </View>
                        <View style={[{padding:8,backgroundColor:'#fff',marginBottom:8}]}>
                            <View style={styles.flexcenter}>   
                                <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon3,{marginRight:4}]} viewBox="0 0 1024 1024" version="1.1"><Path d="M704 716.8h-358.4c-15.36 0-25.6 10.24-25.6 25.6s10.24 25.6 25.6 25.6h358.4c15.36 0 25.6-10.24 25.6-25.6 0-12.8-10.24-25.6-25.6-25.6z m76.8-512h-76.8V153.6h-69.12c-23.04-30.72-64-51.2-110.08-51.2-46.08 0-87.04 20.48-110.08 51.2h-69.12v51.2h-76.8c-56.32 0-102.4 46.08-102.4 102.4v512c0 56.32 46.08 102.4 102.4 102.4h512c56.32 0 102.4-46.08 102.4-102.4V307.2c0-56.32-46.08-102.4-102.4-102.4z m-384 0h56.32c0-28.16 30.72-51.2 71.68-51.2 38.4 0 71.68 23.04 71.68 51.2h56.32v102.4h-256V204.8z m435.2 614.4c0 28.16-23.04 51.2-51.2 51.2h-512c-28.16 0-51.2-23.04-51.2-51.2V307.2c0-28.16 23.04-51.2 51.2-51.2h76.8v102.4h358.4v-102.4h76.8c28.16 0 51.2 23.04 51.2 51.2v512z m-128-230.4h-358.4c-15.36 0-25.6 10.24-25.6 25.6s10.24 25.6 25.6 25.6h358.4c15.36 0 25.6-10.24 25.6-25.6 0-12.8-10.24-25.6-25.6-25.6z m0-128h-358.4c-15.36 0-25.6 10.24-25.6 25.6s10.24 25.6 25.6 25.6h358.4c15.36 0 25.6-10.24 25.6-25.6 0-12.8-10.24-25.6-25.6-25.6z"/></Svg>
                                <Text>Chi tiết thanh toán</Text>
                            </View>
                            <View style={styles.item_space}>
                                <Text>Tổng tiền hàng</Text>
                                <Text>₫{formatter(state.total)}</Text>
                            </View>
                            {state.discount_promotion>0?
                            <View style={styles.item_space}>
                                <Text>Combo khuyến mãi</Text>
                                <Text>-₫{formatter(state.discount_promotion)}</Text>
                            </View>:null}
                           
                            {state.discount_voucher>0?
                            <View style={styles.item_space}>
                                <Text>Voucher</Text>
                                <Text>-₫{formatter(state.discount_voucher)}</Text>
                            </View>:null}
                            <View style={styles.item_space}>
                                <Text >Tổng tiền hàng</Text>
                                <Text style={styles.textorange}>₫{formatter(state.total_final)}</Text>
                            </View>
                        </View>
                        <View style={[{padding:8,backgroundColor:'#fff'}]}>
                            <Flex>
                                <Svg style={[styles.svg_icon3,{marginRight:4}]}  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 102.17 122.88"><Path d="M102.17,29.66A3,3,0,0,0,100,26.79L73.62,1.1A3,3,0,0,0,71.31,0h-46a5.36,5.36,0,0,0-5.36,5.36V20.41H5.36A5.36,5.36,0,0,0,0,25.77v91.75a5.36,5.36,0,0,0,5.36,5.36H76.9a5.36,5.36,0,0,0,5.33-5.36v-15H96.82a5.36,5.36,0,0,0,5.33-5.36q0-33.73,0-67.45ZM25.91,20.41V6h42.4V30.24a3,3,0,0,0,3,3H96.18q0,31.62,0,63.24h-14l0-46.42a3,3,0,0,0-2.17-2.87L53.69,21.51a2.93,2.93,0,0,0-2.3-1.1ZM54.37,30.89,72.28,47.67H54.37V30.89ZM6,116.89V26.37h42.4V50.65a3,3,0,0,0,3,3H76.26q0,31.64,0,63.24ZM17.33,69.68a2.12,2.12,0,0,1,1.59-.74H54.07a2.14,2.14,0,0,1,1.6.73,2.54,2.54,0,0,1,.63,1.7,2.57,2.57,0,0,1-.64,1.7,2.16,2.16,0,0,1-1.59.74H18.92a2.15,2.15,0,0,1-1.6-.73,2.59,2.59,0,0,1,0-3.4Zm0,28.94a2.1,2.1,0,0,1,1.58-.74H63.87a2.12,2.12,0,0,1,1.59.74,2.57,2.57,0,0,1,.64,1.7,2.54,2.54,0,0,1-.63,1.7,2.14,2.14,0,0,1-1.6.73H18.94a2.13,2.13,0,0,1-1.59-.73,2.56,2.56,0,0,1,0-3.4ZM63.87,83.41a2.12,2.12,0,0,1,1.59.74,2.59,2.59,0,0,1,0,3.4,2.13,2.13,0,0,1-1.6.72H18.94a2.12,2.12,0,0,1-1.59-.72,2.55,2.55,0,0,1-.64-1.71,2.5,2.5,0,0,1,.65-1.69,2.1,2.1,0,0,1,1.58-.74ZM17.33,55.2a2.15,2.15,0,0,1,1.59-.73H39.71a2.13,2.13,0,0,1,1.6.72,2.61,2.61,0,0,1,0,3.41,2.15,2.15,0,0,1-1.59.73H18.92a2.14,2.14,0,0,1-1.6-.72,2.61,2.61,0,0,1,0-3.41Zm0-14.47A2.13,2.13,0,0,1,18.94,40H30.37a2.12,2.12,0,0,1,1.59.72,2.61,2.61,0,0,1,0,3.41,2.13,2.13,0,0,1-1.58.73H18.94a2.16,2.16,0,0,1-1.59-.72,2.57,2.57,0,0,1-.64-1.71,2.54,2.54,0,0,1,.65-1.7ZM74.3,10.48,92.21,27.26H74.3V10.48Z"/></Svg>
                                <View>
                                    <Text>Nhấn "đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo </Text> 
                                    <Pressable><Text>Điều khoản Shopee</Text></Pressable>
                                </View>
                            </Flex>
                        </View>    
                    </View>
                </ScrollView>
                
            
            <View style={styles.fotter}>
                <Flexend style={{flex:2,paddingRight:8}}>
                    <Text>Tổng thanh toán</Text>
                    <Text style={styles.textorange}>₫{formatter(state.total_final)}</Text>
                </Flexend>
                <Pressable onPress={checkout} style={[{flex:1},styles.btn]}>
                    <Text style={styles.textwhite}>Đặt hàng</Text>
                </Pressable>
            </View>        
            </>:
            <StyleLoading>
            <LoadingDots/>
            </StyleLoading>}
          
        </SafeAreaView>   
    )
}
const mapStateToProps = state => ({
    token:state.auth.token
});
  
export default connect(mapStateToProps)(Checkout);


const styles = StyleSheet.create({
    container: {
      flex: 1,
     
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
      minHeight:74,
      paddingBottom:8,
      elevation: 10,
      flexDirection:'row',
      alignItems:'flex-end',
      justifyContent:'space-between',
      backgroundColor:'#fff',
      shadowColor: '#515751',
      
    },
    icon_back:{
      width: 20,
      height: 20,
      color:'#ee4d2d',
      fill: 'currentColor',
      position: 'relative'
    },
    image:{
        height: 80,
        width: 80,
    },
    fotter:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        shadowColor: '#515751',
        elevation:10,
        flexDirection:'row',
        backgroundColor:'#fff'
    }
    ,
    icon_check:{
        position: 'absolute',
        height: 5,
        width: 9,
        borderColor:'#fff',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        transform: [{ rotate: "-45deg" }],
        left: 4,top: 5
    },
    item_center:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    fontnomal:{
        color:'#757575'
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
      padding:4,
      height:40,
      backgroundColor:'#ee4d2d'
    },
    textorange:{
      color:'#ee4d2d'
    },
    textwhite:{
      color:'#fff'
    },
    textnomal:{
        color:'#757575'
      },
    svg_icon:{
      width: 14,
      height: 14,
      color:'#757575',
      fill: 'currentColor',
      position: 'relative'
    },
    svg_icon1:{
        width: 14,
        height: 14,
        color:'#ee4d2d',
        fill: 'currentColor',
        position: 'relative'
      },
    svg_icon2:{
        width: 24,
        height: 11,
        fontSize:10,
        color:'#ee4d2d',
        fill: 'currentColor',
        position: 'relative'
      },
    svg_icon3:{
        width: 20,
        height: 20,
        color:'rgb(255, 166, 0)',
        fill: 'currentColor',
        position: 'relative'
      },
    svg_big:{
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
      color:'#757575'
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
    price_old:{
        color:'rgba(0,0,0,.1)',
        textDecorationStyle:'line-through',
    },
    price_curent:{
    color:'#ee4d2d',
    fontWeight:'500'
    },
    icon:{
    stroke: 'currentColor',
      fill: 'currentColor',
      height: 60,
      width: 60,
      color: '#ee4d2d'
    },
    
   
  })
