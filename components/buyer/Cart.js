import React, { useState, useEffect,useRef } from 'react';
import {  showvariation,headers } from '../../actions/auths';
import { listorderURL,itemrecentlyURL,
    shoporderURL, cartURL, updatecartURL,savevoucherURL } from '../../urls';
import { formatter,itemvariation } from '../../constants';
import styled from 'styled-components'
import Iteminfo from "./Iteminfo"
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlasList,
  StyleSheet,
  TextInput,
  Modal,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  Image,
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
import {connect} from "react-redux"
import LoadingDots from '../../hocs/Loading';
const Flex=styled.View`
flex-direction:row;
`
const FlexStart=styled(Flex)`
align-items: flex-start;
`
const Flexend=styled(Flex)`
align-items: flex-end;
`
const PressAdjust=styled.Pressable`
align-items: center;
justify-content: center;
border:1px solid rgba(0,0,0,.09);
width:24px;
height:24px;
`
const StyleLoading=styled.View`
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
flex:1
`
const Btn1=styled.Pressable`
align-items: center;
justify-content: center;
height:44;
margin-left:8px;
background-color:#ee4d2d;
padding:0 12px
`
const Dot=styled.View`
width:100%;
height:0
border-top: 1px dashedrgba(0,0,0,.09);
`
const StylePromotion=styled(Flex)`
justify-content:space-between;
background-color:#fff3ed;
align-items:center;
padding: 9px 12px;
`
const Item=styled.View`
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
const StyleBox=styled(Flex)`
justify-content:space-between;
align-items:center;
padding: 8px 12px;
`
const Checkbox=styled.Pressable`
position: relative;
width: 20px;
height: 20px;
border-radius: 2px;
border-width: 1px;
background-color:${props=>props.active?'#ee4d2d':'transparent'};
border-color:${props=>props.active?'#ee4d2d':'rgba(0,0,0,.3)'};
border-style:solid;
`
const StyledView1=styled.View`
backgroundColor:#ee4d2d;
padding:2px 4px;
border-radius:4px;
margin-right:4px
`
const Boxpromotion=styled.Text`
padding:0px 4px ;
border:1px solid #ee4d2d;
color:#ee4d2d;
line-height:14px;
border-radius: 2px;
font-weight: 400;
text-align: center;
font-size:10px
`
const listchoice=[{name:'Tất cả',value:'all'},{name:'Giảm giá',value:'discount'},{name:'Mua lần nữa',value:'buyagain'}]
const {width} = Dimensions.get('window');

const Cart=(props)=>{
  const [list_shop,setListshop]=useState([])
  const {token,navigation,type,data}=props
  const [items,setItems]=useState([])
 
  const [list_cartitem,setListcartitem]=useState([])
  const [list_item_recommend,setListitemrecommnend]=useState([])
  const [loading,setLoading]=useState(false)
  const [choice,setChoice]=useState('all')
  const [state,setState] = useState({name:'',loading_item:false,page_no:1,error:false})
  useEffect(()=>{
    (async () => {
      await props.isAuthenticated
      try {
        const [obj1, obj2,obj3] = await axios.all([
          axios.get(listorderURL,headers()),
          axios.get(shoporderURL,headers()),
          axios.get(cartURL,headers()),
        ])
        const total=obj1.data.reduce((total,order)=>{
            return total+order.total
        },0)
        const discount_product=obj1.data.reduce((total,order)=>{
            return total+order.discount_product
        },0)
        const discount_promotion=obj1.data.reduce((total,order)=>{
            return total+order.discount_promotion
        },0)
        const discount_deal=obj1.data.reduce((total,order)=>{
            return total+order.discount_deal
        },0)
        const discount_voucher_shop=obj1.data.reduce((total,order)=>{
            return total+order.discount_voucher_shop
        },0)
        const count_order=obj1.data.reduce((total,order)=>{
            return total+order.count
        },0)
        const count_cartitem=obj1.data.reduce((total,order)=>{
            return total+order.count_cartitem
        },0)
        const list_shop=obj2.data.map(shop=>{
          let order=obj1.data.find(order=>order.shop_id==shop.id)
          if(order&& order.shop_id==shop.id){
              return({...shop,voucher:order.voucher,discount_voucher_shop:order.discount_voucher_shop,loading_voucher:true,show_voucher:false})
          }
          return({...shop,show_voucher:false})
      })
        setState({...state,count:obj3.data.length,count_order:count_order,
          total:total,count_cartitem:count_cartitem,
          discount_product:discount_product,
          discount_promotion:discount_promotion,
          discount_deal:discount_deal,discount_voucher_shop:discount_voucher_shop})
        setListcartitem(obj3.data)
        setListshop(list_shop)
        setLoading(true)
      }
      catch (error) {
      console.log(error);
      }
      })()
    },[])  
        
    const checkall=()=>{
        const list_shops=list_shop.map(shop=>{
            return(shop.id)
        })
        const checked = list_cartitem.some(item => !item.check)
        const listdata=list_cartitem.map(item=>{
            if(checked){
                return({...item,check:true})
            }
            return({...item,check:false})
        })

        const list_checked=list_cartitem.map(item=>{
            return(item.id)
        })
        const data_check=checked?{id_checked:list_checked}:{id_check:list_checked}
        const data={...data_check,shop_id:list_shops}
        axios.post(cartURL,JSON.stringify(data),headers())
        .then(res=>{
            setState({...state,...res.data})
            setListcartitem(listdata)
        }) 
    }
    
    const checkshop=(shop)=>{
        const checked =list_cartitem.some(item => !item.check && item.shop_id==shop.id)
        const listdata=list_cartitem.map(item=>{
            if(item.shop_id===shop.id){
                if(checked){
                    return({...item,check:true})
                }
                return({...item,check:false})
            }
            return({...item})
        })
        const list_checked=list_cartitem.filter(item=>item.shop_id==shop.id).map(item=>{
            return(item.id)
        })
        const data_check=checked?{id_checked:list_checked}:{id_check:list_checked}
        const data={...data_check,shop_id:[shop.id]}
        axios.post(cartURL,JSON.stringify(data),headers())
        .then(res=>{
            setState({...state,...res.data})
            setListcartitem(listdata)
        }) 
    }

    const checked=(item)=>{ 
        const data_check=item.check?{id_check:[item.id]}:{id_checked:[item.id]}
       
        setListcartitem(prev=>prev.map(cartitem=>{
            if(item.id==cartitem.id){
                return({...cartitem,check:!cartitem.check})
            }
            return({...cartitem})
        }))
        const data={...data_check,shop_id:[item.shop_id]}
        axios.post(cartURL,JSON.stringify(data),headers())
        .then(res=>{
            setState({...state,...res.data})
        }) 
    }

    useEffect(()=>{
        if(type && data){
            updateitem(data.item,data.color_id,data.size_id,data.type_product,data.cartitem)
        }
    },[type,data])

    const updateitem=(item,color_id,size_id,type_product,cartitemchoice)=>{
        const dataitem={item_id:item.item_id,color_id:color_id,size_id:size_id}
        const datacartitem=type_product=='mainproduct'?{cartitem_id:item.id}:{byproduct_id:item.id}
        const data={...dataitem,...datacartitem}
        axios.post(updatecartURL,JSON.stringify(data),headers())
        .then(rep=>{
            let result=rep.data
            const list_cartitems=type_product=='mainproduct'?list_cartitem.map(cartitem=>{
                if(item.id==cartitem.id){
                    return({...cartitem,...result.item})
                }
                return({...cartitem})
            }):
            list_cartitem.map(cartitem=>{
                if(cartitemchoice.id==cartitem.id){
                    return({...cartitem,byproducts:cartitem.byproducts.map(byproduct=>{
                    if(byproduct.id==item.id){
                        return({...byproduct,...result.item})
                    }
                    return({...byproduct})
                    })})
                }
                return({...cartitem})
            })
            setListcartitem(list_cartitems)
            setState({...state,...result.orders})
        }) 
    }

    const adjustitem=(item,product,cartitemchoice,value)=>{
        const dataitem=product=='byproduct'?{byproduct_id:item.id}:{cartitem_id:item.id}
        const data={...dataitem,quantity:value}
        axios.post(cartURL,JSON.stringify(data),headers())
        .then(rep=>{
            let data=rep.data
            const list_cartitems=product=='mainproduct'?list_cartitem.map(cartitem=>{
                if(item.id==cartitem.id){
                    return({...cartitem,quantity:value})
                }
                return({...cartitem})
            }):list_cartitem.map(cartitem=>{
                if(cartitemchoice.id==cartitem.id){
                    return({...cartitem,byproducts:cartitem.byproducts.map(by=>{
                    if(by.id==item.id){
                        return({...by,quantity:value})
                    }
                    return({...by})
                    })})
                }
                return({...cartitem})
            })
            setListcartitem(list_cartitems)
        }) 
        
    }
    
    const removeitem=(itemchoice,product,cartitemchoice)=>{
        const data=product=='byproduct'?{byproduct_id_delete:itemchoice.id}:{cartitem_id_delete:itemchoice.id}
        axios.post(cartURL,JSON.stringify(data),headers())
        .then(res => {
        const listdata=product=='byproduct'?list_cartitem.map(cartitem=>{
            if(cartitem.id==cartitemchoice.id){
                return({...cartitem,byproducts:cartitem.byproducts.filter(byproduct=>itemchoice.id!=byproduct.id)})
            }
            return ({...cartitem})
        }):list_cartitem.filter(item=>item.id!=itemchoice.id)
        setState({...state,...res.data})
        setListcartitem(listdata)
        })   
    }

    const apply_voucher=(voucher)=>{
        const data={voucher_id:voucher.id,shop_id:[shopchoice().id]}
        axios.post(cartURL,JSON.stringify(data),headers())
        .then(rep=>{
            let data=rep.data
            const list_shop=list_shop.map(shop=>{
                if(shopchoice().id==shop.id){
                    return({...shop,voucher:voucher.id,show_voucher:false,loading_voucher:true,discount_voucher_shop:data.discount_voucher_shop})
                }
                return({...shop})
            })
            setState({list_shop:list_shop})
        })
    }

    const remove_voucher=(voucher)=>{
        const data={voucher_id_remove:voucher.id,shop_id:[shopchoice().id]}
        axios.post(cartURL,JSON.stringify(data),headers())
        .then(rep=>{
            let data=rep.data
            setListshop(prev=>prev.map(shop=>{
                if(shopchoice().id==shop.id){
                    return({...shop,voucher:0,discount_voucher_shop:0,loading_voucher:false})
                }
                return({...shop})
            }))
            
        })
    }

    const shopchoice=()=>{
        return list_shop.find(shop=>shop.show_voucher)
    }

    const save_voucher=(voucher)=>{
        
        setListshop(prev=>prev.map(shop=>{
            if(shopchoice().id==shop.id){
                return({...shop,listvoucher:shop.listvoucher.map(item=>{
                    if(item.id==voucher.id){
                        return({...item,exists:true})
                    }
                    return({...item})
                })})
            }
            return({...shop})
        }))
        axios.post(savevoucherURL,JSON.stringify({voucher_id:voucher.id}),headers())
        .then(rep=>{
            let data=rep.data
        })
    }
    
    const add_voucher=(shopchoice)=>{
        setListshop(prev=>prev.map(shop=>{
            if(shop.id==shopchoice.id){
                return({...shop,show_voucher:true})
            }
            return({...shop})
        }))
        
    }

    const checkout=(warring)=>{
        e.stopPropagation()
        if(list_cartitem.filter(item=>item.check).length>0){
            setState({error:false})
            window.location.href='/checkout'
        }
        else{
            setState({...state,error:true})
        }
    }
    const item_promotion=(shop)=>{
        return list_cartitem.find(cartitem=>cartitem.promotion && shop.id==cartitem.shop_id)
    }

  return(
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={styles.item_center}>
                <Pressable style={{marginRight:8}} onPress={()=>navigation.goBack()}>
                    <Svg style={[styles.icon_back]} viewBox="0 0 22 17"><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                </Pressable>
                <Text style={styles.fontbig}>Giỏ hàng</Text>
            </View>
            <View style={styles.item_center}>
                <Text>Sửa</Text>
                <Svg style={[styles.icon_back,{marginLeft:8}]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                    <G><Path d="M722.7,388.6c-36.9,0-66.8,29.9-66.8,66.9c0,36.8,29.9,66.8,66.8,66.8c36.9,0,66.8-29.9,66.8-66.8C789.5,418.6,759.6,388.6,722.7,388.6L722.7,388.6z M500,811.9c-42.4,0-85.2-5.1-127.1-15.2c-3.4-0.8-6.9-1.2-10.4-1.2c-5.7,0-11.3,1.1-16.6,3.2l-183.9,73.6l30-127.5c3.9-16.4-1.8-33.5-14.7-44.2c-79.2-66.8-122.8-153.8-122.8-245C54.6,259,254.4,99.1,500,99.1c245.7,0,445.5,159.8,445.5,356.4C945.5,652,745.6,811.9,500,811.9L500,811.9z M500,54.6c-270.6,0-490,179.5-490,401C10,564,62.9,662.5,148.7,734.7L99.1,945.4l263.5-105.3c43.7,10.4,89.7,16.3,137.5,16.3c270.7,0,490-179.4,490-400.8C990,234.1,770.7,54.6,500,54.6L500,54.6z M500,388.6c-36.9,0-66.8,29.9-66.8,66.9c0,36.8,29.9,66.8,66.8,66.8c36.9,0,66.8-29.9,66.8-66.8C566.8,418.6,536.9,388.6,500,388.6L500,388.6z M277.3,388.6c-36.9,0-66.9,29.9-66.9,66.9c0,36.8,30,66.8,66.9,66.8c36.9,0,66.8-29.9,66.8-66.8C344.1,418.6,314.1,388.6,277.3,388.6L277.3,388.6z"/></G>
                </Svg>
            </View>
        </View>
        {loading?
        <View>
            <View style={[{backgroundColor: '#ffffd7',padding:12,paddingTop:4,paddingBottom:4},styles.flexcenter]}>
                <Svg style={{marginRight:8}} height="16" viewBox="0 0 20 12" width="20">
                    <G fill="none" fill-rule="evenodd" ><Rect fill="#00bfa5" fill-rule="evenodd" height="9" rx="1" width="12" x="4"></Rect><Rect height="8" rx="1" stroke="#00bfa5" width="11" x="4.5" y=".5"></Rect><Rect fill="#00bfa5" fill-rule="evenodd" height="7" rx="1" width="7" x="13" y="2"></Rect><Rect height="6" rx="1" stroke="#00bfa5" width="6" x="13.5" y="2.5"></Rect><Circle cx="8" cy="10" fill="#00bfa5" r="2"></Circle><Circle cx="15" cy="10" fill="#00bfa5" r="2"></Circle><Path d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z" fill="#fff"></Path><Path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></Path><Path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></Path><Circle cx="8" cy="10" fill="#047565" r="1"></Circle><Circle cx="15" cy="10" fill="#047565" r="1"></Circle></G>
                </Svg>
                
                <Text numberOfLines={2} style={{fontSize: 12,color: '#757575',paddingRight:8}}>
                    {'Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!'}
                </Text> 
            </View>
        
            <View style={{backgroundColor:'#fff',width:'100%',marginBottom:12,position:'relative'}}>
                <Flex>
                    {listchoice.map((item,i)=>
                        <Item>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="rgba(0,0,0,.1)"
                                style={[styles.item_center]} onPress={()=>setChoice(item.value)}>
                                    <View style={[styles.item_center,{width:'100%',paddingBottom:8,paddingTop:8}]}>
                                        <Text style={[styles.fontsmall,{textAlign:'center'}]}>{item.name}</Text>
                                        <Tabbottom active={choice==item.value?true:false}></Tabbottom>
                                    </View>
                            </TouchableHighlight>
                        </Item>    
                    )}
                </Flex>
                <View style={{height:0,backgroundColor:'#757575',position:'absolute',bottom:0,width:'100%',borderTopWidth: 1,borderTopColor:'#e5e5e5'}}></View>
            </View>
            <ScrollView>
                {list_shop.map((shop,index)=><>
                {list_cartitem.some(cartitem=>cartitem.shop_id==shop.id)?
                    <View style={{backgroundColor:'#fff'}} key={shop.id}>
                        <View style={[styles.item_space,{padding:8}]}>
                            <View style={styles.flexcenter}>
                                <Checkbox onPress={()=>checkshop(shop)} active={list_cartitem.some(item => !item.check && item.shop_id==shop.id)?false:true}>
                                    <View style={[styles.icon_check,{opacity:list_cartitem.some(item => !item.check && item.shop_id==shop.id)?0:1}]}></View>
                                </Checkbox>
                                <View style={[styles.flexcenter,{marginLeft:16}]}>
                                    <StyledView1><Text style={styles.textwhite}>yêu thích</Text></StyledView1>
                                    <View><Text style={{fontWeight:'500'}}>{shop.name}</Text></View>
                                    <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                                </View>
                            </View>
                            <Pressable onPress={()=>setshowthread(shop)}>
                                <Text style={{color:'#757575'}}>Sửa</Text>
                            </Pressable>
                        </View>
                        <View>
                            {item_promotion(shop)?
                            <View>
                                <StylePromotion>
                                    <View style={styles.flexcenter}>
                                        <Boxpromotion>Combo khuyến mãi</Boxpromotion>
                                        <Text style={{fontSize:12}}>Buy {item_promotion(shop).promotion.quantity_to_reduced} more {item_promotion(shop).promotion.combo_type=='1'?` (will be reduced ${item_promotion(shop).promotion.discount_percent}%)`:item_promotion(shop).promotion.combo_type=='2'?` (will be reduced ₫${formatter(item_promotion(shop).promotion.discount_price)}`:` (only with ₫${formatter(item_promotion(shop).promotion.price_special_sale)}`}</Text>
                                    </View>
                                    <Pressable onPress={()=>navigation.navigate('BundleDeal',{id:item_promotion(shop).promotion.id})}>
                                        <Text style={{fontSize:14}}>Add
                                            <Svg viewBox="0 0 12 12" fill="none" style={{marginTop: 1}} width="10" height="10" color="#ee4d2d"><Path fillRule="evenodd" clipRule="evenodd" d="M9.293 6L4.146.854l.708-.708L10 5.293a1 1 0 010 1.414l-5.146 5.147-.708-.707L9.293 6z" fill="currentColor"></Path></Svg>
                                        </Text>
                                    </Pressable>
                                </StylePromotion>
                                {list_cartitem.filter(cartitem=>cartitem.promotion && cartitem.shop_id==shop.id).map((item,i)=>
                                    
                                    <Iteminfo
                                        item={item}
                                        adjustitem={(item,product,cartitem,value)=>adjustitem(item,product,cartitem,value)}
                                        removeitem={(item,product,cartitem)=>removeitem(item,product,cartitem)}
                                        checked={(item)=>checked(item)}
                                        type_product={'mainproduct'}
                                        navigation={navigation}
                                        list_cartitem={list_cartitem}
                                       
                                    />  
                                )}
                            </View>
                            :null}
                            {list_cartitem.filter(cartitem=>!cartitem.promotion &&shop.id==cartitem.shop_id).map((cartitem,i)=>
                                <View key={cartitem.id}>
                                    {cartitem.shock_deal?
                                    <StylePromotion>
                                        <View style={styles.flexcenter}>
                                            <Boxpromotion>{cartitem.shock_deal.shock_deal_type=='1'?'Deal sốc':'Mua kèm'}</Boxpromotion>
                                            <Text style={{fontSize:12}}>{cartitem.shock_deal.shock_deal_type=='1'?'Mua thêm deal shock':'Mua nhiều hơn ₫99.000 và nhận được 1 quà tặng'}</Text>
                                        </View>   
                                        <Pressable onPress={()=>navigation.navigate('BundleDeal',{id:item_promotion(shop).promotion.id})} onPress={()=>navigation.navigate('Dealshock',{deal_id:cartitem.shock_deal.id,id:cartitem.product_id})}>
                                        <Text style={{fontSize:14}}>Add
                                            <Svg viewBox="0 0 12 12" fill="none" style={{marginTop: 1}} width="10" height="10" color="#ee4d2d"><Path fillRule="evenodd" clipRule="evenodd" d="M9.293 6L4.146.854l.708-.708L10 5.293a1 1 0 010 1.414l-5.146 5.147-.708-.707L9.293 6z" fill="currentColor"></Path></Svg>
                                        </Text>
                                        </Pressable>
                                    </StylePromotion>
                                :null}
                                <Iteminfo
                                    item={cartitem}
                                    type_product={'mainproduct'}
                                    list_cartitem={list_cartitem}
                                    navigation={navigation}
                                    adjustitem={(item,product,cartitem,value)=>adjustitem(item,product,cartitem,value)}
                                    removeitem={(item,product)=>removeitem(item,product)}
                                    checked={(item)=>checked(item)}
                                    
                                />
                                {cartitem.byproducts.length>0?<View></View>:null}
                                    {cartitem.byproducts.map((item,j)=> 
                                    <Iteminfo
                                        item={item}
                                        shop={shop}
                                        cartitem={cartitem}
                                        type_product={'byproduct'}
                                        list_cartitem={list_cartitem}
                                        navigation={navigation}
                                        adjustitem={(item,product,cartitem,value)=>adjustitem(item,product,cartitem,value)}
                                        removeitem={(item,product,cartitem)=>removeitem(item,product,cartitem)}
                                        checked={(item)=>checked(item)}
                                    />     
                                )}
                            </View>
                            )}
                        </View>
                        {shop.listvoucher.length>0?
                        <View>
                            <Svg fill="none" viewBox="0 -2 23 22"><G filter="url(#voucher-filter0_d)"><Mask id="a" fill="#fff"><Path fillRule="evenodd" clipRule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></Path></Mask><Path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></Path></G><Path clipRule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></Path></Svg>
                            <View>
                                <Text>{shop.discount_voucher_shop>0 && shop.loading_voucher?`Shop Voucher giảm ₫${formatter(shop.discount_voucher_shop)}`:shop.discount_voucher_shop==0 && shop.loading_voucher?`Shop Voucher giảm đến 10%`:'Dang tai...'}</Text>
                                <Text >Mới</Text>
                                <Pressable  onPress={()=>add_voucher(shop,list_shop)} style={{position: 'relative'}}>
                                    <Text>Xem thêm voucher</Text>
                                </Pressable>
                            </View>
                        </View>
                        :null}
                        <View>
                            <Svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0"><G><Line fill="none" strokeLinejoin="round" strokeiterlimit="10" x1="8.6" x2="4.2" y1="9.8" y2="9.8"></Line><Circle cx="3" cy="11.2" fill="none" r="2" strokeIterlimit="10"></Circle><Circle cx="10" cy="11.2" fill="none" r="2" strokeiterlimit="10"></Circle><Line fill="none" strokeiterlimit="10" x1="10.5" x2="14.4" y1="7.3" y2="7.3"></Line><Polyline fill="none" points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1" strokeLinejoin="round" strokeiterlimit="10"></Polyline><Polyline fill="none" points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2" strokeLinejoin="round" strokeiterlimit="10"></Polyline></G></Svg>
                            <View>
                                <Text>Giảm ₫15.000 phí vận chuyển đơn tối thiểu ₫50.000; Giảm ₫70.000 phí vận chuyển đơn tối thiểu ₫300.000</Text>
                            </View>
                            <View>
                                <Text > Tìm hiểu thêm </Text>
                            </View>
                        </View>
                    </View>:null}
                    </>
                )}
            </ScrollView>
        </View>:
        <StyleLoading>
            <LoadingDots/>
        </StyleLoading>}
        <View style={{elevation: 10,shadowColor: '#52006A',backgroundColor:'#fff',position:'absolute',bottom:0,left:0,right:0}}>
            <StyleBox>
                <View>
                    <Svg fill="none" viewBox="0 -2 23 22" ><G filter="url(#voucher-filter0_d)"><Mask id="a" fill="#fff"><Path fill-rule="evenodd" clip-rule="evenodd" d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"></Path></Mask><Path d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z" mask="url(#a)"></Path></G><Path clip-rule="evenodd" d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"></Path></Svg>
                    <Text>Shopee Voucher</Text>
                </View>
                <View style={styles.flexcenter}>
                    <Text>Chọn hoặc nhập mã</Text>
                    <Svg style={{marginLeft:4}} viewBox="0 0 12 12" fill="none" width="12" height="12" color="#757575" className="_1KsfYG"><Path fill-rule="evenodd" clip-rule="evenodd" d="M9.293 6L4.146.854l.708-.708L10 5.293a1 1 0 010 1.414l-5.146 5.147-.708-.707L9.293 6z" fill="currentColor"></Path></Svg>
                </View>
            </StyleBox>
            <Dot></Dot>
            <StyleBox>
                <View style={styles.flexcenter}>
                    <Svg style={[styles.svg_icon,{marginRight:4}]} fill="none" viewBox="0 0 18 18"><Path stroke="#FFA600" stroke-width="1.3" d="M17.35 9A8.35 8.35 0 11.65 9a8.35 8.35 0 0116.7 0z"></Path><Path fill="#FFA600" fill-rule="evenodd" stroke="#FFA600" stroke-width=".2" d="M6.86 4.723c-.683.576-.998 1.627-.75 2.464.215.725.85 1.258 1.522 1.608.37.193.77.355 1.177.463.1.027.2.051.3.08.098.03.196.062.294.096.06.021.121.044.182.067.017.006.107.041.04.014-.07-.028.071.03.087.037.286.124.56.27.82.44.114.076.045.024.151.111a2.942 2.942 0 01.322.303c.087.093.046.042.114.146.18.275.245.478.235.8-.01.328-.14.659-.325.867-.47.53-1.232.73-1.934.696a4.727 4.727 0 01-1.487-.307c-.45-.182-.852-.462-1.242-.737-.25-.176-.643-.04-.788.197-.17.279-.044.574.207.75.753.532 1.539.946 2.474 1.098.885.144 1.731.124 2.563-.224.78-.326 1.416-.966 1.607-1.772.198-.838-.023-1.644-.61-2.29-.683-.753-1.722-1.17-2.706-1.43a4.563 4.563 0 01-.543-.183c.122.048-.044-.02-.078-.035a4.77 4.77 0 01-.422-.212c-.594-.338-.955-.722-.872-1.369.105-.816.757-1.221 1.555-1.28.808-.06 1.648.135 2.297.554.614.398 1.19-.553.58-.947-1.33-.86-3.504-1.074-4.77-.005z" clip-rule="evenodd"></Path></Svg>
                    <Text>Bạn chưa chọn sản phẩm</Text>
                    <Svg style={[styles.svg_icon,{marginLeft:4}]}  viewBox="0 0 16 16"><G fill="none" fill-rule="evenodd" transform="translate(1)"><Circle cx="7" cy="8" r="7" stroke="currentColor"></Circle><Path fill="currentColor" d="m6.871 3.992c-.814 0-1.452.231-1.914.704-.462.462-.693 1.089-.693 1.892h1.155c0-.484.099-.858.297-1.122.22-.319.583-.473 1.078-.473.396 0 .715.11.935.33.209.22.319.517.319.902 0 .286-.11.55-.308.803l-.187.209c-.682.605-1.1 1.056-1.243 1.364-.154.286-.22.638-.22 1.045v.187h1.177v-.187c0-.264.055-.506.176-.726.099-.198.253-.396.462-.572.517-.451.825-.737.924-.858.275-.352.418-.803.418-1.342 0-.66-.22-1.188-.66-1.573-.44-.396-1.012-.583-1.716-.583zm-.198 6.435c-.22 0-.418.066-.572.22-.154.143-.231.33-.231.561 0 .22.077.407.231.561s.352.231.572.231.418-.077.572-.22c.154-.154.242-.341.242-.572s-.077-.418-.231-.561c-.154-.154-.352-.22-.583-.22z"></Path></G></Svg>
                </View>
                <View></View>
            </StyleBox>
            <Dot></Dot>
            <View style={styles.item_space}>
                <View style={[styles.flexcenter,{paddingLeft:8}]}>
                    <Checkbox onPress={checkall} active={list_cartitem.some(item => !item.check)?false:true}>
                        <View style={[styles.icon_check,{opacity:list_cartitem.some(item => !item.check)?0:1}]}></View>
                    </Checkbox>
                    <Text style={{color:'#757575',marginLeft:4}}>Tất cả</Text>
                </View>
                <FlexStart>
                    <View style={{alignItems:'flex-end'}}>
                        <View style={styles.flexcenter}>
                            <Text style={{fontSize:12,lineHeight:16,color:'#757575'}}>Tổng thanh toán: </Text>
                            <Text style={[styles.textorange,{fontSize:16,fontWeight:'500'}]}>₫120.000</Text>
                        </View>
                        <View style={styles.flexcenter}>
                            <Text style={{fontSize:12,lineHeight:16}}>Tiết kiệm: </Text>
                            <View style={styles.item_center}>
                                <Text style={[styles.textorange,{fontSize:12}]}>₫120.000</Text>
                                <Svg style={{marginLeft:4}} viewBox="0 0 12 12" fill="none" width="12" height="12" color="rgba(0, 0, 0, 0.54)"><Path fill-rule="evenodd" clip-rule="evenodd" d="M6 4L.854 9.146.146 8.44l5.147-5.146a1 1 0 011.414 0l5.147 5.146-.707.707L6 4z" fill="currentColor"></Path></Svg>
                            </View>
                        </View>
                    </View>
                    <Btn1 onPress={()=>navigation.navigate('Checkout')}>
                        <Text style={styles.textwhite}>Mua hàng (1)</Text>
                    </Btn1>
                </FlexStart>
            </View>
        </View>
    </SafeAreaView>
  )
}
const mapStateToProps = state => ({
    token:state.auth.token,data:state.buyer.data,type:state.buyer.type
});
  
export default connect(mapStateToProps,{showvariation})(Cart);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
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
        position: 'relative', 
    },
    
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
