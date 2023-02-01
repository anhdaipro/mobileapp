import React,{useState,useEffect,useMemo} from 'react';
import {  uploadpost } from '../../../actions/auths';
import { updatefileURL,detailproductURL,updateimageURL, newproductURL,shippingshopURL,createvariationURL } from '../../../urls';
import {connect,useSelector,useDispatch} from "react-redux"
import { Video, AVPlaybackStatus } from 'expo-av'
import styled from 'styled-components'
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImagePicker from 'expo-image-picker';
import { Btnorange, Container,styles,Styletext } from "../marketing/styles"
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
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Alert,
  TextInput,
  Modal,
  Dimensions,
  StyleSheet,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import { generateString,formatter,groupBy } from '../../../constants';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { addcategory, resetitem, updatebuymore,updateclassify, updatecategory, updateiteminfo, updateshipping, updatevariation } from '../../../actions/seller';
const Listitem=styled.Pressable`
flex-direction:row;
flex-wrap:wrap
`
const StyleModalContent=styled.View`
background-color:#fff;
z-index:10;
margin-top:auto;
width:100%;
position:relative
`
const Headermodal=styled.View`
padding:12px 0;
border-bottom-width:1px;
justify-content:center;
align-items:center;
border-color:rgba(0,0,0,0.1)
`
const StyledView=styled.View`
padding:12px 0;
position:relative;
border-color:rgba(0,0,0,0.1);
border-bottom-width:${props=>props.second?0:1}px
`
const StyleBtn=styled.Pressable`
border:1px dashed #ee4d2d;
justify-content:center;
width:92px;
height:92px;
align-items:center
`
const Status=styled.Pressable`
padding: 16px ;
border-color:rgba(0,0,0,0.1);
border-bottom-width:1px
`
const StyleBtn1=styled.Pressable`
padding:4px 8px;
margin-right:8px;
border:1px solid ${props=>props.active?'#ee4d2d':'rgba(0,0,0,.1)'}
`
const ImageWrapper=styled.View`
width:92px;
height:92px;
margin:4px
position:relative
`
const Radiocontent=styled.View`
width:18px;
height:18px;
border-radius:9px;
border:1px solid ${props=>props.active?'#ee4d2d':'#757575'}
position:relative
`
const Radiocheck=styled.View`
position:absolute;
left:2;
top:2;
background-color:#ee4d2d;
border-radius:6px;
width:12px;
height:12px
`
const price_ship={
  'Nhanh':[{weight_from:1,weight_to:500,price:16300},{weight_from:501,weight_to:1000,price:18300},
      {weight_from:1001,weight_to:1500,price:19300},{weight_from:1501,weight_to:2000,price:20100},
      {weight_from:1501,weight_to:2000,price:21100},
      {weight_from:2001,weight_to:40000,price:26100}
  ],
  'Tiết kiệm':[{weight_from:1,weight_to:500,price:14300},{weight_from:501,weight_to:1000,price:16300},
      {weight_from:1001,weight_to:1500,price:18300},{weight_from:1501,weight_to:2000,price:19100},
      {weight_from:1501,weight_to:2000,price:20100},
      {weight_from:2001,weight_to:40000,price:24400}
  ],
  'Hỏa tốc':[{weight_from:1,weight_to:500,price:18300},{weight_from:501,weight_to:1000,price:20300},
      {weight_from:1001,weight_to:1500,price:24300},{weight_from:1501,weight_to:2000,price:26100},
      {weight_from:2001,weight_to:40000,price:32400}
      
  ]
}
const list_status=[{name:'Mới',value:'1',default:true},{name:'Đã sử dụng',value:'2',default:true}]
const Detailproduct = (props) => {
  const {navigation,route}=props
  const dispatch = useDispatch()
  const { id} =route.params; 
  const [list_media,setlistmedia]=useState([])
  const [state,setState]=useState({classify1:'',classify2:''})
  const classify1=useSelector(state=>state.seller.classify1)
  const classify2=useSelector(state=>state.seller.classify2)
  const colors=useSelector(state=>state.seller.colors)
  const sizes=useSelector(state=>state.seller.sizes)
  const shippings=useSelector(state=>state.seller.shippings)
  const list_category_choice=useSelector(state=>state.seller.list_category_choice)
  const iteminfo=useSelector(state=>state.seller.iteminfo)
  const buymores=useSelector(state=>state.seller.buymores)
  
  const [detail,setDetail]=useState({brand:'1'})
  const datavariations=useSelector(state=>state.seller.variations)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState('1')
  const [show,setShow]=useState(false)
  const [formData,setformData]=useState({name:'',description:'',status:'1',
    price:'',sku:'',inventory:''})
  const [complete,setComplete]=useState(false)
  const [shipping,setShipping]=useState()
  
  const [token,setToken]=useState()
  const category_choice=list_category_choice.find(item=>item.choice)
  const headers=useMemo(()=>{
    return {'headers':token?{ Authorization:`JWT ${token}`,'Content-Type': 'application/json' }:{'Content-Type': 'application/json'}}
  },[token])

  const price_equal=datavariations.every((item,index,arr)=>item.price && arr.length>0 && item.price==arr[0].price)
  
  const price=useMemo(()=>{
    const price_valid=datavariations.every(item=>item.price)
    if(datavariations.length>0 && price_valid){
      const total_price= datavariations.reduce((total,obj)=>{
        return total+parseInt(obj.price)
      },0)
      return total_price/datavariations.length
    }
    else{
      return formData.price
    }
  },[datavariations])

  const inventory=useMemo(()=>{
    if(datavariations.length>0){
      return datavariations.reduce((total,obj)=>{
        if(obj.inventory){
          return (total+obj.inventory)
        }
        return total
      },0)
    }
  },[datavariations])

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!complete) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", cancelable:true, onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => {
                dispatch(resetitem())
                navigation.dispatch(e.data.action)
              },
            },
          ]
        );
      }),
    [navigation, complete]
  );
 

  const addshiping= async () => {
    try{
      if(token){
        const res = await axios(shippingshopURL,headers())
        const datashipping=res.data.shipping_shop.reduce((arr,obj)=>{
        const method=obj['method']
          if(!arr.some(item=>item.method==method)){
            arr.push({method:method,show:false,unit:res.data.shipping_shop.filter(item=>item.method==method)})
          }
          return arr
          },[])
        setShipping(datashipping)
        const datashipping_items=res.data.shipping_shop.reduce((arr,obj)=>{
          if(!arr.map(a=>a['method']).includes(obj['method'])){
              arr.push({method:obj['method'],enabled:false,show:false})
          }
          return arr
        },[])
        if(!id){
          dispatch(updateshipping(datashipping_items))
        }
      }
    }
    catch(e){
      console.log(e)
    }
  }
  
  useEffect(() => {
    (async () => {
      try{
        if(id){
          const res= await axios.get(detailproductURL+id,headers())
          const list_null=Array(max_level+1-res.data.list_category_choice.length).fill().map((_, i) =>{
            return {id:null,title:null}
          })
          const list_category_choice=[...res.data.list_category_choice,...list_null]
          const shipping_item=res.data.list_shipping_item.map(item=>{
            return({...item,enable:true,show:false})
          })
          const shipping_item_remainder=res.data.shipping_shop.reduce((arr,obj)=>{
            if(!arr.map(a=>a['method']).includes(obj['method']) && arr.map(a=>a['method']).every(item=>!shipping_item.includes(item))){
              arr.push({method:obj['method'],enable:false,show:false})
            }
            return arr
          },[]) 
          setLoading(true)
          setformData({...formData,...res.data.item_info})
          setlistmedia([...res.data.media_upload])
          dispatch(updatecategory(list_category_choice))
          dispatch(updateiteminfo(res.data.item_info))
          dispatch(updateclassify(res.data.colors,res.data.sizes,classify1,classify2))
          dispatch(updatevariation(res.data.list_variation))
          dispatch(updatebuymore(res.data.buymore))
          dispatch(updateshipping([...shipping_item,...shipping_item_remainder]))
          addshiping()
        }
        else{
          setLoading(true)
          addshiping()
        }
      }
      catch(e){
        console.log(e)
      }
    })();
  },[id,token])

  useEffect(()=>{
    (async()=>{
      const value = await AsyncStorage.getItem('token')
      setToken(value)
    })()
  },[])

  const valid=formData.name&&formData.description&&list_media.length>0 && category_choice

  const pickImage = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
       
        aspect: [9, 16],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        let form=new FormData()
        const file={
          ...result,type:`${result.type}/*`,name:generateString(12)
        }
        form.append('file',file)
        if(result.type==='video'){
          const file_preview = await VideoThumbnails.getThumbnailAsync(
            result.uri,
            {
              time: 1000,
            }
          );
          console.log(file_preview)
          form.append('duration',result.duration)
          form.append('file_preview',{...file_preview,type:'image/*',name:generateString(12)})
        }
        axios.post(updateimageURL,form,{headers:{ Authorization:`JWT ${token}`,'Content-Type': 'multipart/form-data'}})
        .then(res=>{
          const datamedia=[...list_media,res.data]
          setlistmedia(datamedia)
        })
      }
    }
    catch(e){
      console.log(e)
    }
  };
  const datashippings=shippings.filter(item=>item.enabled).map(item=>item.method)
  
  const submit= async ()=>{
    try{
    let form=new FormData()
    const colors_update=colors.filter(item=>!isNaN(item.id))
    const colors_create=colors.filter(item=>isNaN(item.id))
    if(colors.length>0){
        form.append('color_name',classify1)
        colors_create.map(color=>{
            form.append('value',color.value)
            form.append('image',color.file_choice)
        })
        colors_update.map(color=>{
          form.append('color_id',color.id)
          form.append('value_update',color.value)
          form.append('image_update',color.file_choice)
        })
    }
    if(sizes.length>0){
        form.append('size_name',classify2)
    }
    form.append('sizes',JSON.stringify(sizes))
    const res=await axios.post(createvariationURL,form,{headers:{ Authorization:`JWT ${token}`,'Content-Type': 'multipart/form-data'}})
    
    const files=list_media.map(item=>item.id)
    const buymorediscounts_remain=buymores.filter(item=>!isNaN(item.id)).map(item=>item.id)
    const variations=datavariations.length>0?datavariations.map(variation=>{
        return({...variation,color_id:res.data.colors.find(color=>color.value==variation.color_value)?res.data.colors.find(color=>color.value==variation.color_value).id:null,size_id:res.data.sizes.find(size=>size.value==variation.size_value)?res.data.sizes.find(size=>size.value==variation.size_value).id:null})
    }):[{color_id:null,size_id:null,price:formData,sku_classify:formData.sku_classify,inventory:formData.inventory}]
    const variations_remain=variations.filter(item=>!isNaN(item.variation_id)).map(item=>item.variation_id)
    const formdata={action:'update',variations_remain:variations_remain,buymorediscounts_remain:buymorediscounts_remain,
    variations:variations,files:files,buymorediscounts:buymores,category_id:category_choice.id,method:datashippings,...detail,...formData,...iteminfo}
    
    const url=id?detailproductURL+id:newproductURL       
    const res1 =await axios.post(url,JSON.stringify(formdata),headers())
    setComplete(true)
    dispatch(resetitem())
    navigation.navigate("Myproduct")
    
    }
    catch(e){
      console.log(e)
    }
  }
  
  const editstatus=()=>{
    setShow(true)
    setStatus(formData.status)
  }

  const updatestatus=()=>{
    setformData({...formData,status:status})
    setShow(false)
  }
  const shipping_choice=shippings.find(item=>item.enabled)
  console.log(shipping_choice)
  return (
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
      </View>
      {loading &&(
      <KeyboardAvoidingView behavior="padding" enabled >
      <ScrollView
      showsHorizontalScrollIndicator={false}>
        <View style={{marginTop:2,backgroundColor:'#fff',padding:12}}>
          <Listitem>
            {list_media.map((item,index)=>
              <ImageWrapper key={item.id}>
                <ImageBackground style={{width:'100%',height:'100%'}} source={{uri:item.file_preview||item.file}}/>
                <View></View>
              </ImageWrapper>
            )}
            {list_media.length<9 && (
            <StyleBtn onPress={pickImage}>
              <Styletext primary>Thêm ảnh</Styletext>
            </StyleBtn>)}
          </Listitem>
        </View>
        <View style={{marginTop:8,backgroundColor:'#fff',padding:12}}>
          <View style={styles.item_space}>
            <Text style={styles.textorange}><Text style={styles.textnomal}>Tên sản phẩm </Text>*</Text>
            <Text>{formData.name.length}/120</Text>
          </View>
          <View>
            <TextInput 
              maxLength={120}
              style={styles.input}
              placeholder="Nhập tên sản phẩm"
              onChangeText={text=>setformData({...formData,name:text})}
              value={formData.name}/>
          </View>
        </View>
        <View style={{marginTop:8,backgroundColor:'#fff',padding:12}}>
          <View style={styles.item_space}>
            <Text style={styles.textorange}><Text style={styles.textnomal}>Mô tả sản phẩm </Text>*</Text>
            <Text>{formData.description.length}/3000</Text>
          </View>
          <View>
            <TextInput 
              maxLength={3000}
              multiline={true}
              style={styles.input}
              placeholder="Nhập mô tả sản phẩm"
              onChangeText={text=>setformData({...formData,description:text})}
              value={formData.description}/>
          </View>
        </View>
        <View style={{marginTop:8,backgroundColor:'#fff',paddingLeft:12,paddingRight:12}}>
          <StyledView>
            <Pressable style={[styles.item_space]} onPress={()=>navigation.navigate('Addcategory',{headers:headers})}>
              <View>
                <Text style={styles.textorange}><Text style={styles.textnomal}>Ngành hàng </Text>*</Text>
              </View>
              <View style={styles.flexcenter}>
                <Text>
                  {list_category_choice.filter(item=>item.id).map((item,i)=>
                    <Text key={item.id}>{item.title} {item.choice?'':' > '}</Text>
                  )}
                </Text>
                <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
              </View>
            </Pressable>
            
          </StyledView>
          <StyledView>
            <Pressable style={[styles.item_space]} onPress={()=>navigation.navigate('Addvariation',{headers:headers})}>
              <View>
                <Text>Phân loại hàng </Text>
                <Svg style={[styles.svg,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
              </View>
              <View>
                <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
              </View>
            </Pressable>
          </StyledView>
          <StyledView>
            <Pressable onPress={()=>navigation.navigate("Setvariation")} style={styles.item_space}>
            <View>
              <Text style={styles.textorange}><Text style={styles.textnomal}>Giá </Text>*</Text>
            </View>
            <View >
              
              {datavariations.length==0?
                <TextInput 
                  maxLength={8}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Đặt"
                  onChangeText={text=>setformData({...formData,price:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                  value={formData.price?formData.price.toString():''}
                />:<View style={styles.flexcenter}><Text>{price}</Text>
                <Svg style={[styles.svg,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
                </View>}
              
            </View>
            </Pressable>
          </StyledView>
          <StyledView second>
            <Pressable onPress={()=>{if(datavariations.length>0){
              navigation.nagative('Addvariation',{})
            }}} style={styles.item_space}>
              <View>
                <Text style={styles.textorange}><Text style={styles.textnomal}>Kho hàng </Text>*</Text>
              </View>
              <View >
                {datavariations.length==0?
                <TextInput 
                  maxLength={8}
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Đặt"
                  onChangeText={text=>setformData({...formData,inventory:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                  value={formData.inventory?formData.inventory.toString():''}
                  />:<View style={styles.flexcenter}><Text>{inventory}</Text>
                  <Svg style={[styles.svg,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
                  </View>}
              </View>
            </Pressable>
            
          </StyledView>
        </View>
        {price_equal && price &&(
        <View style={{marginTop:8,backgroundColor:'#fff',padding:12}}>
          <Pressable onPress={()=>navigation.navigate('Addbuymore',{headers:headers})} style={styles.item_space}>
            <View>
                <Text>Mua nhiều giảm giá</Text>
                <Svg style={[styles.svg,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
            </View>
            <View>
              <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
            </View>
          </Pressable>
        </View>)}
        <View style={{marginTop:8,backgroundColor:'#fff',padding:12}}>
          <Pressable onPress={()=>navigation.navigate('Feeship',{shipping:shipping})} style={styles.item_space}>
            <View style={styles.flexcenter}>
                <Text>Phí vận chuyển </Text>
                <Styletext second>(Cân nặng/Kích thước) <Text style={styles.textorange}>*</Text></Styletext>
            </View>
            <View style={styles.flexcenter}>
              {shippings.find(item=>item.enabled) && (<Text style={{marginRight:4}}>₫{formatter(price_ship[shipping_choice.method].find(item=>item.weight_from<=iteminfo.weight && item.weight_to>iteminfo.weight).price)}</Text>)}
              <Svg style={[styles.svg_icon]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
            </View>
          </Pressable>
          
        </View>
        <View style={{marginTop:8,backgroundColor:'#fff',padding:12}}>
          <Pressable onPress={editstatus} style={styles.item_space}>
            <View>
                <Text>Tình trạng</Text>
                <Svg style={[styles.svg,{marginLeft:4}]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.98750749,10.2375075 C8.40172105,10.2375075 8.73750749,10.5732939 8.73750749,10.9875075 C8.73750749,11.401721 8.40172105,11.7375075 7.98750749,11.7375075 C7.57329392,11.7375075 7.23750749,11.401721 7.23750749,10.9875075 C7.23750749,10.5732939 7.57329392,10.2375075 7.98750749,10.2375075 Z M8.11700238,4.60513307 C9.97011776,4.60513307 10.7745841,6.50497267 9.94298079,7.72186504 C9.76926425,7.97606597 9.56587088,8.14546785 9.27050506,8.31454843 L9.11486938,8.39945305 L8.95824852,8.47993747 C8.56296349,8.68261431 8.49390831,8.75808648 8.49390831,9.0209925 C8.49390831,9.29713488 8.27005069,9.5209925 7.99390831,9.5209925 C7.71776594,9.5209925 7.49390831,9.29713488 7.49390831,9.0209925 C7.49390831,8.34166619 7.7650409,7.99681515 8.35913594,7.6662627 L8.76655168,7.45066498 C8.9424056,7.3502536 9.04307851,7.26633638 9.11735517,7.1576467 C9.52116165,6.56675314 9.11397414,5.60513307 8.11700238,5.60513307 C7.41791504,5.60513307 6.82814953,6.01272878 6.75715965,6.55275918 L6.75,6.66244953 L6.74194433,6.75232516 C6.69960837,6.98557437 6.49545989,7.16244953 6.25,7.16244953 C5.97385763,7.16244953 5.75,6.9385919 5.75,6.66244953 C5.75,5.44256682 6.87194406,4.60513307 8.11700238,4.60513307 Z"></Path></Svg>
            </View>
            <View style={styles.flexcenter}>
              <Text>{list_status.find(item=>item.value==formData.status).name}</Text>
              <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      )}
      <View style={[styles.fotter,{padding:8}]}>
        <StyleBtn1 active={valid?true:false} onPress={submit} disabled={valid?false:true} style={[styles.btn,{flex:1}]}>
          <Text style={{color:valid?'#ee4d2d':'rgba(0,0,0,0.1)'}}>Lưu</Text>
        </StyleBtn1>
        <Pressable disabled={valid?false:true} onPress={submit} style={[styles.btn,{flex:1,backgroundColor:valid?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
          <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Hiển thị</Text>
        </Pressable>
      </View>
      <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
        <TouchableWithoutFeedback onPress={(event) => event.target == event.currentTarget && setShow(false)}>
          <View style={styles.modal}>
            <StyleModalContent>
              <Headermodal>
                <Text>Tình trạng</Text>
              </Headermodal>
              <View>
                <View>
                  {list_status.map(item=>
                  <Status key={item.value} style={styles.flexcenter} onPress={()=>setStatus(item.value)}>
                    <Radiocontent active={item.value==status?true:false}>
                      {item.value==status &&(
                        <Radiocheck/>
                      )}
                    </Radiocontent>
                    <View style={{marginLeft:16}}>
                      <Text>{item.name}</Text>
                    </View>
                  </Status>
                  )}
                </View>
              </View>
              <View style={{padding:8}}>
                <Btnorange onPress={updatestatus} >
                  <Text style={styles.textwhite}>Xác nhận</Text>
                </Btnorange>
              </View>
            </StyleModalContent>
          </View>
        </TouchableWithoutFeedback>
        
      </Modal>
    </Container>
  );
};

export default Detailproduct