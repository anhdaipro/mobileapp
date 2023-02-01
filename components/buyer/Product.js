import React, { useState, useEffect,useRef } from 'react';
import { login, showvariation,headers } from '../../actions/auths';
import { addToCartURL, reviewURL, itemURL ,productinfoURL} from '../../urls';
import { ratingitem,formatter } from '../../constants';
import { Video, AVPlaybackStatus } from 'expo-av'
import {connect} from "react-redux"
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
  TouchableWithoutFeedback,
  Image,
  FlatList,
  TextInput,
  Dimensions,
  StyleSheet,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import {URL} from "react-native-url-polyfill"
import VariationItem from '../../hocs/VariationItem';
import ReviewItem from './product/ReviewItem';
const {width} = Dimensions.get('window');
const height = width;
const FlexBox=styled.View`
flex-direction:row;
`

const StyleView=styled(FlexBox)`
background-color:#00cccc;
flex:1;
padding:6px 0
`
const StyleBtn=styled.Pressable`
padding:4px 8px;
border:1px solid #ee4d2d;
align-items: center;
justify-content: center;
`
const StylePress=styled.Pressable`
flex-direction:row;
align-items: center;
justify-content: center;
flex:1;
border-right:${props=>props.primary?'1px solid #757575':'0px'};
`
const StyleItem=styled.View`
padding:8px;
`
const StyleSection=styled.View`
background-color:#fff;
padding:${props=>props.primary?'8px 0':'8px'};
margin-top:8px
`
const Dot=styled.View`
height:0.6px;
width:100%;
background-color:#rgba(0,0,0,0.1)
`

const ListItem=styled.View`
flex-direction:row;
flex-wrap:wrap;
`
const StyleNodata=styled.View`
align-items: center;
justify-content: center;
flex:1;
padding:10px 0
`
const Item=styled.Pressable`
position:relative;
flex-direction:row;
margin:0 12px 12px 0;
align-items: center;
background-color:rgba(0,0,0,.04);
justify-content: center;
padding:4px 8px;
border-radius:2px;
min-width:60px;
border:1px solid rgba(0,0,0,.04);
opacity:${props=>props.opacity};
border-color:${props=>props.active?'#ee4d2d':'rgba(0,0,0,.04)'}
`
const StyleText=styled.Text`
color:${props=>props.primary?'#fff':'rgba(0,0,0,.2)'};
font-size:14px;
`
const StyleText1=styled.Text`
color:${props=>props.primary?'#ee4d2d':'#757575'};
font-size:12px;
`


const Product=(props)=>{
  const [product,setProduct]=useState()
  const {route,navigation,token,showvariation,user }=props
  const {productID} = route.params;
  const [waring, setWaring] = useState({warring:false})
  const [variation, setVariation] = useState({color_id:0,size_id:0,variation_color:[],variation_size:[]})
  const video=useRef()
  const [imgActive,setimgActive]=useState(0)
 
  const [status, setStatus] =useState({});
  const [show,setShow]=useState(false)
  const [colors,setColors]=useState([])
  const [sizes,setSizes]=useState([])
  const [quantity,setQuantity]=useState(1)
  const [cartitem,setCartItem]=useState()
  const [state, setState] = useState({review_choice:'all',
    page_count:1,rating:[],has_comment:0,has_media:0});
  const [main_product,setMainproduct]=useState()
  const [listmedia,setListmedia]=useState([])
  const [itemdeal,setItemdeal]=useState({color_choice:null,size_choice:null})
  const [byproduct,setByproduct]=useState([])
  const [listcolordeal,setListcolordeal]=useState([])
  const [listsizedeal,setListsizedeal]=useState([])
  const [promotion,setPromotion]=useState()
  const [showvoucher,setShowvoucher]=useState(false)
  const [shop,setShop]=useState(null)
  const [list_hot_sales,setListhostsale]=useState([])
  const [vouchers,setVouchers]=useState([])
  const [reviewchoice,setReviewchoice]=useState()
  const [productdetail,setProductdetail]=useState()
  const [listreview,setReview]=useState(null)
 
  
  useEffect(()=>{
    (async ()=>{
      try{
        const res=await axios.get(`${itemURL}?itemId=${productID}`,headers())
        setProduct(res.data)
        setVouchers(res.data.vouchers)
        setColors(res.data.colors)
        setSizes(res.data.sizes)
        const color_choice= res.data.colors.length>0?res.data.colors[0]:null
        const size_choice =color_choice&& res.data.sizes.length>0?res.data.sizes.find(size=>size.variation.some(variation=>color_choice.variation.includes(variation))):null
        const index_choice=res.data.media_upload.length>=5?5:res.data.media_upload.length
        const video_preview=res.data.media_upload.find(item=>item.typefile==='video')
        const image_preview=res.data.media_upload.filter(item=>item.typefile==='image')
        const list_media=video_preview!=undefined?[video_preview,...image_preview]:[...image_preview]
        setItemdeal({color_choice:color_choice,size_choice:size_choice})
        setState({...state,index_choice:index_choice,filechoice:list_media[0]})
        setListmedia(list_media)
        setVouchers(res.data.vouchers)
        const [obj1,obj2,obj3]=await axios.all([
          axios.get(`${productinfoURL}/${productID}?choice=shop`,headers()),
          axios.get(`${productinfoURL}/${productID}?choice=detail`,headers()),
          axios.get(`${productinfoURL}/${productID}?choice=hotsale`,headers()),
        ])
        setProductdetail(obj2.data)
        setListhostsale(obj3.data)
        setShop(obj1.data)
      }
      catch(e){
        console.log(e)
      }
    })()
  },[productID])
 
  const addReview=()=>{
    if(!listreview){
      axios.get(`${productinfoURL}/${productID}?choice=review`,headers())
      .then(res=>{
        let data=res.data
        const list_reviews=data.reviews.map(item=>{
          return({...item,request_report:false})
        })
        setReview(list_reviews)
        setState(current=>{return{...current,page_count:data.page_count,rating:data.rating,has_comment:data.has_comment,has_media:data.has_media}})
        })  
      }
    }
  const openvariation=(e,item)=>{
        if(item.count_variation==0){
          const data={item_id:item.id,quantity:1}
          axios.post(addToCartURL,JSON.stringify(data),headers())
          .then(res=>{
            setCartItem(res.data)
            })
        }
        else{
            setShow(true)
            const data={type:'variation',colors:colors,url:addToCartURL,quantity:quantity,sizes:sizes,variation:variation,product:product,show:true}
            showvariation(data)
            
        }
  }
  
  
  const onchange=(nativeEvent)=>{
    if(nativeEvent){
        const slice=Math.round(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
        setimgActive(slice)
    }
  }
  const isCloseToBottom = async ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }
  const setlike=()=>{
    if(token){
        axios.post(`${productinfoURL}/${id}`,JSON.stringify({item_id:product.id}),headers())
        .then(res=>{
        setProduct({...product,...res.data})
        })
    }
    else{
        navigation.navigate('Login')
    }
  }
  const setlikereview=(review)=>{
    if(token){
      axios.post(`${reviewURL}/${review.id}`,JSON.stringify({action:'like'}),headers())
      .then(res=>{
        const list_review=listreview.map(item=>{
          if(review.id==item.id){
              if(item.liked){
                  return({...item,liked:false,num_liked:res.data.num_liked})
              }
              else{
              return({...item,liked:true,num_liked:res.data.num_liked})
              }
            }
            return ({...item})
        })
        setReview(list_review)
        })
    }
    else{
        navigation.navigate('Login');
      }
    }
  const showmedia=(item,reviewchoice)=>{
    const list_reviews=listreview.map(review=>{
      if(review.id===reviewchoice.id){
        return({...review,list_file:review.list_file.map(file=>{
          if (item.file_id===file.file_id){
            return({...file,show:!file.show})
          }
          return({...file,show:false})
        })})
      } 
      return({...review,list_file:review.list_file.map(file=>{
        return({...file,show:false})
        })})
      })
    setReview(list_reviews)
  }
  const setreport=(review)=>{
    setReviewchoice(review)
  }

  return(
    <SafeAreaView style={styles.container}>
        {product?<>
        <ScrollView 
          onScroll={({nativeEvent})=>{
            if (isCloseToBottom(nativeEvent)) {
              addReview()
            }
          }}
          contentContainerStyle={{paddingBottom:40}}>
          <View style={[styles.wrap,{justifyContent:'center',backgroundColor:'#fff'}]}>
            <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={({nativeEvent})=>onchange(nativeEvent)}
            >
            {listmedia.map((item,index)=><>
            {item.typefile=='image'?
              <Image
                key={item.file}
                source={{uri:item.file}}
                resizeMode='contain'
                style={styles.wrap}
              />:
              <Video
                style={styles.wrap}
                ref={video}
                shouldPlay={imgActive==0?true:false}
                source={{
                  uri: item.file,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />}</>
            )}
            </ScrollView>
            <View style={{position:'relative',margin:8,marginBottom:0,minHeight:40}}>
              <View style={{width:'80%'}}>
                <Text numberOfLines={2}>{product.name}</Text>
              </View>
              <View style={[styles.flag,{flex:1}]}>
                <View style={styles.flagBottom}/>
                <Text style={{
                    fontSize: 12,
                    color: '#ee4d2d',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                }}>{product.percent_discount}%</Text>
                <Text style={styles.textwhite}>GIẢM</Text>
              </View>
            </View>
            <View style={[styles.flexcenter,{padding:8}]}>
              <View style={styles.flexcenter}>
                <Text style={[!product.percent_discount?styles.textorange:styles.textwhite]}>
                  ₫{!variation.id?`${formatter(product.min_price)}${product.min_price!=product.max_price?` -  ₫${formatter(product.max_price)}`:''}`:`${formatter(variation.price)}`}
                </Text>
                {product.percent_discount>0?
                <Text>
                  ₫{!variation.id?`${formatter(product.min_price*(1-product.percent_discount/100))}${product.min_price!=product.max_price?` -  ₫${formatter(product.max_price*(1-product.percent_discount/100))}`:''}`:`${formatter(variation.discount_price?variation.discount_price:variation.price)}`}
                </Text>:null}
              </View>
            </View>
            <StyleSection>
              <View style={[styles.flexcenter,{justifyContent:'space-between'}]}>
                <View style={styles.flexcenter}>
                  <View style={{paddingRight:4,borderRightWidth:1,borderRightColor:'gray'}}>
                    {product.count_review>0?
                      <View style={styles.flexcenter}>          
                        <View style={styles.rating_stars_star}>
                          {ratingitem(5,product,14,'#ee4d2d')}
                        </View>
                        <View>
                          <Text>{product.review_rating.toFixed(1)}</Text>
                        </View>
                      </View>
                    :<View><Text>Chưa có đánh giá</Text></View>}      
                  </View>
                  <View style={[styles.item_center,{paddingLeft:4}]}>
                  <Text style={{lineHeight:16}}>đã bán </Text>
                  <Svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" role="img" style={styles.icon}><Circle cx="7.5" cy="7.5" fill="none" r="6.5" strokeMiterlimit="10"></Circle><Path stroke="none" d="m5.3 5.3c.1-.3.3-.6.5-.8s.4-.4.7-.5.6-.2 1-.2c.3 0 .6 0 .9.1s.5.2.7.4.4.4.5.7.2.6.2.9c0 .2 0 .4-.1.6s-.1.3-.2.5c-.1.1-.2.2-.3.3-.1.2-.2.3-.4.4-.1.1-.2.2-.3.3s-.2.2-.3.4c-.1.1-.1.2-.2.4s-.1.3-.1.5v.4h-.9v-.5c0-.3.1-.6.2-.8s.2-.4.3-.5c.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.1-.2.2-.3.3-.5s.1-.4.1-.7c0-.4-.2-.7-.4-.9s-.5-.3-.9-.3c-.3 0-.5 0-.7.1-.1.1-.3.2-.4.4-.1.1-.2.3-.3.5 0 .2-.1.5-.1.7h-.9c0-.3.1-.7.2-1zm2.8 5.1v1.2h-1.2v-1.2z"></Path></Svg>
                  </View>
                </View>
                <View>
                  <Pressable onPress={()=>setlike()}>
                    <Svg width="24" height="20" ><Path d="M19.469 1.262c-5.284-1.53-7.47 4.142-7.47 4.142S9.815-.269 4.532 1.262C-1.937 3.138.44 13.832 12 19.333c11.559-5.501 13.938-16.195 7.469-18.07z" stroke="#FF424F" stroke-width="1.5" fill={product.like?'#FF424F':'none'} fill-rule="evenodd" stroke-linejoin="round"></Path></Svg>
                  </Pressable> 
                </View>
              </View>
            </StyleSection>  
          </View>
          <StyleSection>
            <View style={[styles.flexcenter,{justifyContent:'space-between'}]}>
              <View>
                <Text>Voucher của shop</Text>
              </View>
              <View style={styles.flexcenter}>
                <View style={styles.voucher_ticket}>
                  <Text>Giảm 5%</Text>
                </View>
                <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
              </View>
            </View>
          </StyleSection>
          <StyleSection>
            <View style={[styles.flexcenter,{justifyContent:'space-between'}]}>
              <View style={[styles.flexcenter]}>
                <Svg style={[styles.svg_icon2,{marginRight:4}]} enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" ><G><Line fill="none" stroke-linejoin="round" stroke-miterlimit="10" x1="8.6" x2="4.2" y1="9.8" y2="9.8"></Line><Circle cx="3" cy="11.2" fill="none" r="2" stroke-miterlimit="10"></Circle><Circle cx="10" cy="11.2" fill="none" r="2" stroke-miterlimit="10"></Circle><Line fill="none" stroke-miterlimit="10" x1="10.5" x2="14.4" y1="7.3" y2="7.3"></Line><Polyline fill="none" points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1" stroke-linejoin="round" stroke-miterlimit="10"></Polyline><Polyline fill="none" points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2" stroke-linejoin="round" stroke-miterlimit="10"></Polyline></G></Svg>
                <Text>Phí vận chuyển: ₫16.500 - ₫26.500</Text>
              </View>
              <View style={styles.flexcenter}>
                <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
              </View>
            </View>
          </StyleSection>
          <StyleSection>
            <View style={[styles.flexcenter,{justifyContent:'space-between'}]}>
              <View style={[styles.flexcenter]}>
                <Text>Chọn  loại hàng: </Text>
                <Text style={styles.textnormal}>({colors.length} màu sắc {sizes.length>0?`,${sizes.length} kích cỡ`:''})</Text>
              </View>
              <View style={styles.flexcenter}>
                <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
              </View>
            </View>
            <View style={styles.flexcenter}>
              {colors.slice(0,3).map(color=>
                <Image source={{uri:color.image||product.image}} key={color.id} style={{width:80,height:80,marginRight:4}}/>
              )}
            </View>
          </StyleSection>
          {shop?
          <StyleSection>
            <View style={[styles.flexcenter,{justifyContent:'space-between',paddingBottom:8}]}>
              <View style={styles.flexcenter}>
                <View style={{marginRight:8}}>
                  <Image style={{width:60,height:60,borderRadius:30}} source={{uri:shop.avatar}}/>
                </View>
                <View>
                  <Text>{shop.name}</Text>
                  <View style={styles.flexcenter}>
                    <Text style={{backgroundColor:'#42ab17',width:10,height:10,borderRadius:5}}></Text>
                    <Text style={[styles.textnormal,{fontSize:12}]}>Online</Text>
                  </View>
                  <View style={styles.flexcenter}>
                    <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 256 256" xmlSpace="preserve">
                      <G transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <Path d="M 45 90 c -1.062 0 -2.043 -0.561 -2.583 -1.475 l -4.471 -7.563 c -9.222 -15.591 -17.933 -30.317 -20.893 -36.258 c -2.086 -4.277 -3.138 -8.852 -3.138 -13.62 C 13.916 13.944 27.86 0 45 0 c 17.141 0 31.085 13.944 31.085 31.084 c 0 4.764 -1.051 9.339 -3.124 13.596 c -0.021 0.042 -0.042 0.083 -0.063 0.124 c -3.007 6.005 -11.672 20.654 -20.843 36.159 l -4.472 7.563 C 47.044 89.439 46.062 90 45 90 z M 45 6 C 31.168 6 19.916 17.253 19.916 31.084 c 0 3.848 0.847 7.539 2.518 10.969 c 2.852 5.721 11.909 21.033 20.667 35.839 L 45 81.104 l 1.89 -3.196 c 8.763 -14.813 17.823 -30.131 20.687 -35.879 c 0.012 -0.022 0.023 -0.045 0.035 -0.067 c 1.642 -3.406 2.474 -7.065 2.474 -10.877 C 70.085 17.253 58.832 6 45 6 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                        <Path d="M 45 44.597 c -8.076 0 -14.646 -6.57 -14.646 -14.646 S 36.924 15.306 45 15.306 c 8.075 0 14.646 6.57 14.646 14.646 S 53.075 44.597 45 44.597 z M 45 21.306 c -4.767 0 -8.646 3.878 -8.646 8.646 s 3.878 8.646 8.646 8.646 c 4.768 0 8.646 -3.878 8.646 -8.646 S 49.768 21.306 45 21.306 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                      </G>
                    </Svg>
                    <Text style={[styles.textnormal,{fontSize:12}]}>Voucher</Text>
                  </View>
                </View>
              </View>
              <StyleBtn>
                <Text style={styles.textorange}>Xem shop</Text>
              </StyleBtn>
            </View>
            <View style={styles.flexcenter}>
              <View style={[styles.flexcenter,{marginRight:8}]}>
                <StyleText1 primary>{shop.count_product} </StyleText1>
                <StyleText1>sản phẩm</StyleText1>
              </View>
              <View style={[styles.flexcenter,{marginRight:8}]}>
                <StyleText1 primary>{shop.num_follow} </StyleText1>
                <StyleText1>sản phẩm</StyleText1>
              </View>
              <View style={[styles.flexcenter]}>
                <StyleText1 primary>{shop.total_order} </StyleText1>
                <StyleText1>sản phẩm</StyleText1>
              </View>
            </View>
          </StyleSection>:null}
          <StyleSection>
            <View style={[styles.flexcenter]}>
              <Text>Chi tiết sản phẩm </Text>
              <Text style={styles.textnormal}>19 thấng</Text>
            </View>
            <View style={styles.flexcenter}>
              <Text>{product.description}</Text>
            </View>
          </StyleSection>
          <StyleSection> 
            <View style={[styles.flexcenter]}>
              <Text>Top sản phẩm bán chạy</Text>
            </View>
            <View style={styles.flexcenter}>
              {list_hot_sales.map(item=>
              <View key={item.id}>
                <Image source={{uri:item.image}} style={{width:80,height:80,marginRight:4}}/>
              </View>
              )}
            </View>
          </StyleSection>
          {listreview?
          <StyleSection primary>
            <View style={[styles.flexcenter,{justifyContent:'space-between',padding:8}]}>
              <View>
                <View><Text style={{fontWeight:'500'}}>Đánh giá sản phẩm</Text></View>
                <View style={styles.flexcenter}>
                  <View style={styles.flexcenter}>
                    {ratingitem(5,product,14,'#ee4d2d')}
                  </View>
                  <Text style={[styles.flexcenter,{lineHeight:24,marginLeft:4}]}>
                    <Text style={styles.textorange}>{product.review_rating.toFixed(1)}/5.0 </Text>
                    <Text style={styles.textnormal}>(150 đánh giá)</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.flexcenter}>
                <Text style={[styles.textorange,{lineHeight:16}]}>Xem tất cả</Text>
                <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
              </View>
            </View>
            <Dot/>
            <View style={{padding:8}}>
              <Text style={styles.textnormal}>Hình ảnh người mua</Text>
              <View>
                <ImageBackground/>
              </View>
            </View>
            <Dot/>
            {listreview.length===0?
              <StyleNodata>  
                <View>
                  <Image style={{width:80,height:80}} source={{uri:"https://res.cloudinary.com/dupep1afe/image/upload/v1650097510/eac95a8ac896158642c2761a9e9cd52e_l9erhr.png"}}/>
                </View>
                <View><Text>Chưa có đánh giá</Text></View>
                
              </StyleNodata>:
              <View >
                <FlatList
                  data={listreview}
                  renderItem={({item})=>
                    <ReviewItem
                      item={item}
                      user={user}
                      headers={headers}
                      setreport={(item)=>setreport(item)}
                      showmedia={(file,item)=>showmedia(file,item)}
                      setlikereview={(item)=>setlikereview(item)}
                    />}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            }
          </StyleSection>:null}
        </ScrollView>
        <View style={styles.bottom}>
          <View style={{flexDirection:'row'}}>
            <StyleView>
              <StylePress primary>
                <Svg style={styles.svg_icon1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><Path d="M18 6.07a1 1 0 01.993.883L19 7.07v10.365a1 1 0 01-1.64.768l-1.6-1.333H6.42a1 1 0 01-.98-.8l-.016-.117-.149-1.783h9.292a1.8 1.8 0 001.776-1.508l.018-.154.494-6.438H18zm-2.78-4.5a1 1 0 011 1l-.003.077-.746 9.7a1 1 0 01-.997.923H4.24l-1.6 1.333a1 1 0 01-.5.222l-.14.01a1 1 0 01-.993-.883L1 13.835V2.57a1 1 0 011-1h13.22zm-4.638 5.082c-.223.222-.53.397-.903.526A4.61 4.61 0 018.2 7.42a4.61 4.61 0 01-1.48-.242c-.372-.129-.68-.304-.902-.526a.45.45 0 00-.636.636c.329.33.753.571 1.246.74A5.448 5.448 0 008.2 8.32c.51 0 1.126-.068 1.772-.291.493-.17.917-.412 1.246-.74a.45.45 0 00-.636-.637z"></Path></Svg>
              </StylePress>
              <StylePress onPress={(e)=>openvariation(e,product)}>
              <Svg enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" style={styles.svg_icon1}><G><G><Polyline fill="none" points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"></Polyline><Circle cx="6" cy="13.5" r="1" stroke="none"></Circle><Circle cx="11.5" cy="13.5" r="1" stroke="none"></Circle></G><Line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="7.5" x2="10.5" y1="7" y2="7"></Line><Line fill="none" stroke-linecap="round" stroke-miterlimit="10" x1="9" x2="9" y1="8.5" y2="5.5"></Line></G></Svg>
              </StylePress>
            </StyleView>
            <Pressable onPress={(e)=>openvariation(e,product)} style={[{flex:1,height:40},styles.btn_1]}>
              <Text style={styles.textwhite}>Mua ngay</Text>
            </Pressable>
          </View>
        </View>
      </>:null}
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  token:state.auth.token,user:state.auth.user
});

export default connect(mapStateToProps,{showvariation})(Product);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    
  },
  wrap:{
    width,
    height
  },
  icon_check:{
    width: 8,
    fontSize: 12,
    height: 8,
    color:'#fff',
    top:-2,
    fill: 'currentColor',
    position: 'absolute'
  },
  btn_close:{
    top:16,
    right:10,
    padding:4,
    position: 'absolute'
  },
  icon_close:{
    width: 16,
    fontSize: 12,
    height: 16,
    color:'#757575',
    fill: 'currentColor',
   
  },
  section_item:{
    paddingBottom:12,
    marginBottom:12,
    borderBottomWidth:0.6,
    borderBottomColor:'rgba(0, 0, 0, 0.09)'
  },
  tick:{
    position:'absolute',
    bottom:0,
    right:0,
    width:0,
    height:0,
    borderTopColor:'transparent',
    borderLeftColor:'transparent',
    borderLeftWidth:8,
    borderRightColor:'#ee4d2d',
    borderRightWidth:8,
    borderBottomColor:'#ee4d2d',
    borderBottomWidth:8,
    borderTopWidth:8
  },
  bottom:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    zIndex:1
  },
  modal:{
    flex:1 , backgroundColor: 'rgba(0,0,0,0.5)',
    
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
  btn_1:{
    color:'#fff',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ee4d2d'
  },
  textorange:{
    color:'#ee4d2d'
  },
  textwhite:{
    color:'#fff'
  },
  textnormal:{
    color:'#757575'
  },
  svg_icon:{
    width: 12,
    fontSize: 12,
    height: 12,
    color:'#757575',
    fill: 'currentColor',
    position: 'relative'
  },
  svg_icon2:{
    stroke: 'currentColor',
    fill: 'currentColor',
    height: 16,
    width: 16,
    color: 'rgba(0, 0, 0, 0.64)'
  },
  svg_icon1:{
    width: 24,
    fontSize: 24,
    height: 24,
    color:'#fff',
    stroke:'#fff',
    fill: 'currentColor',
    position: 'relative'
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
  flag:{
    position: 'absolute',
    height: 40,
    width:40,
    paddingRight:2,
    paddingLeft:2,
    paddingBottom:4,
    paddingTop:2,
    backgroundColor: 'rgba(255,212,36,.9)',
    top: 0,
    zIndex:1000,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoptypewrap:{
    position: 'absolute',
    paddingRight:4,
    paddingLeft:4,
    paddingBottom:2,
    paddingTop:2,
    backgroundColor: 'rgb(242, 82, 32)',
    top: 2,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    zIndex:1000,
    left: -4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    stroke: 'currentColor',
    fill: 'currentColor',
    height: 12,
    width: 12,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  flagBottom: {
    position: "absolute",
    left: 0,
    top: 40,
    width: 0,
    height: 0,
    borderBottomWidth: 6,
    borderBottomColor: "transparent",
    borderLeftWidth: 20,
    borderLeftColor: "rgba(255,212,36,.9)",
    borderRightWidth: 20,
    borderRightColor: "rgba(255,212,36,.9)",
  },
  voucher_ticket:{
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(208,1,27,.08)',
    padding:3,
    paddingLeft:7,
    paddingRight:7,
    border: 0,
    whiteSpace: 'nowrap',
    color: '#ee4d2d',
  },
  rating_stars_star:{
    flexDirection:'row',marginRight:4},
  flagLeft:{
    position:'absolute',
    left:0,
    top:'120%',
    width: 0,
    height: 0,
    borderTopWidth:4,
    borderTopColor:'#333',
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
})