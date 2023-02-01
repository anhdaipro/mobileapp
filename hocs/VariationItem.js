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
  Button,
  TextInput,
  Modal,
  Dimensions,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import {URL} from "react-native-url-polyfill"
import React,{useState,useEffect,useMemo} from "react"
import { formatter } from "../constants";
import {addToCartURL,addToCartBatchURL, updatecartURL } from "../urls";
import { showvariation, updatevariation } from "../actions/auths";
import AsyncStorage from "@react-native-async-storage/async-storage"
const PressAdjust=styled.Pressable`
align-items: center;
justify-content: center;
border:1px solid rgba(0,0,0,.09);
width:24px;
height:24px;
`
const ViewInput=styled.TextInput`
width:40px;
height:24px;
border: 1px solid rgba(0,0,0,.09);
border-left-width: 0;
border-right-width: 0;
text-align:center
`
const StyleModalContent=styled.View`
background-color:#fff;
padding: 6px 8px;
z-index:10;
margin-top:auto;
width:100%;
position:relative
`
const StyleSucces=styled.View`
align-items: center;
z-index:100;
top:50%;
border-radius:8px;
position:absolute;
width:50%;
justify-content: center;
padding:16px 20px;
background-color:rgba(0,0,0,0.6)
`
const ListItem=styled.View`
flex-direction:row;
flex-wrap:wrap;
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
const Iconcontent=styled.View`
align-items: center;
background-color:#fff;
width:32px;
height:32px;
border-radius:16px;
justify-content: center;
`
const StyleText=styled.Text`
color:${props=>props.primary?'#fff':'rgba(0,0,0,.2)'};
font-size:14px;
`
const StyleText1=styled.Text`
color:rgba(0,0,0,.09);
font-size:12px;
`
const VariationItem=(props)=>{
    const {showmodal,data,type,setquantity,updatevariation,product,quantitydata}=props
    const [colors,setColors]=useState([])
    const [sizes,setSizes]=useState([])
    const [quantity,setQuantity]=useState(1)
    const [show,setShow]=useState(false)
    const [variation, setVariation] = useState({color_id:0,size_id:0,variation_color:[],variation_size:[]})
    useEffect(()=>{
      if(showmodal){
        setShow(true)
        setColors(data.colors)
        setSizes(data.sizes)
        setVariation(data.variation)
        setQuantity(quantitydata)
      } 
    },[showmodal,data])
    console.log(quantity)
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
    const [state,setState]= useState({time:3})
    
    const [cartitem,setCartitem]=useState()
    const [success,setSucces]=useState(false)
    const color_active=colors.find(item=>item.id==variation.color_id)
    const size_active=sizes.find(item=>item.id==variation.size_id)
    const valid=product?(product.count_variation==2&&color_active&& size_active) ||(product.count_variation==1&&color_active):false 
    const setsizes=(itemchoice)=>{
        setSizes(sizes.map(item=>{
          if(itemchoice.id==item.id){
            return({...item,check:!itemchoice.check?true:false})
          }
          return({...item,check:false})
        }))
        if(!itemchoice.check){
          setVariation(prev=>{return{...prev,size_id:itemchoice.id,variation_size:itemchoice.variation}})
          if(color_active){
          get_price('size_id',itemchoice.id)
          }
        }
        else{
          setVariation(prev=>{return{...prev,size_id:0,variation_size:[]}})
        }
      }
      const setcolors=(itemchoice)=>{
        setColors(colors.map(item=>{
          if(itemchoice.id==item.id){
            return({...item,check:!itemchoice.check?true:false})
          }
          return({...item,check:false})
        }))
        if(!itemchoice.check){
          setVariation(prev=>{return{...prev,color_id:itemchoice.id,variation_color:itemchoice.variation}})
          if(size_active || sizes.length==0){
          get_price('color_id',itemchoice.id)
          }
        }
        else{
          setVariation(prev=>{return{...prev,color_id:0,variation_color:[]}})
        }
      }
      const get_price=(name,value)=>{
        let url=new URL(addToCartURL)
        let search_params=url.searchParams
        search_params.append('item_id',product.id)
        if(variation.color_id!=0){
            search_params.set('color_id',variation.color_id)
        }
        if(variation.size_id!=0){
          search_params.set('size_id',variation.size_id)
        }
        search_params.set([name],value)
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers())
        .then(res => { 
          let data=res.data
          setVariation(prev=>{return{...prev,...data}})
        }) 
      }
    let timeSecond=2
    const submit= async ()  =>{
        const url=data.url==addToCartURL?addToCartURL:data.url==updatecartURL?updatecartURL:addToCartBatchURL
        if(url==addToCartURL){
          addtocard(data)
        }
        else if(url==updatecartURL){
          const data_update={color_id:color_active.id,size_id:size_active?size_active.id:null,item:data.item,cartitem:data.cartitem,type_product:data.type_product}
          updatevariation(data_update)
        }
        else{
          updatevariation({item:item,color_id:color_active.id,size_id:size_active?size_active.id:null})
        }
    }
    const addtocard=()=>{
      const data={quantity:quantity,id:variation.id}
      axios.post(addToCartURL,JSON.stringify(data),headers())
      .then(res=>{
        setCartitem(res.data)
        setState(prev=>{return{...prev,complete:true}})
        const countDown=setInterval(timers,1000)
        function timers(){
          if(timeSecond==0){
            clearInterval(countDown)
            setShow(false)
            setState(prev=>{return{...prev,complete:false}})
          }
          else{
            timeSecond--;
          }
        }
      })
    }
    
    
    return(
        <>
        {show || state.complete?
          <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
            <TouchableWithoutFeedback onPress={(event) => event.target == event.currentTarget && setShow(false)}>
                <View style={styles.modal}>
                    {state.complete?
                    <StyleSucces>
                      <View style={{justifyContent:'center',alignItems:'center'}}>
                          <Iconcontent>
                            <Svg style={styles.svg_icon1} enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0"><G><Path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></Path></G></Svg>
                          </Iconcontent>
                          <View style={{marginTop:8}}>
                            <Text style={[styles.textwhite,{fontSize:12}]}>Đã thêm vào giỏ</Text>
                          </View>
                      </View>
                    </StyleSucces>:null}
                    {!state.complete?
                    <StyleModalContent> 
                        <View style={[styles.section_item,{flexDirection:'row',alignItems:'flex-end'}]}>
                            <View style={{width:120,height:120,marginRight:4}}>
                              <Image style={{width:'100%',height:'100%'}} source={{uri:product.image}}/>
                            </View>
                            <View> 
                              <Text style={[!product.percent_discount?styles.textorange:styles.textwhite]}>₫{!variation.id?`${formatter(product.min_price)}${product.min_price!=product.max_price?` -  ₫${formatter(product.max_price)}`:''}`:`${formatter(variation.price)}`}</Text>
                              <Text>{valid?variation.inventory:product.total_inventory}</Text>
                            </View>
                        </View>
                        {colors.length>0?
                        <View style={styles.section_item}>
                            <Text style={{marginBottom:8}}>{colors[0].name}</Text>
                            <ListItem>
                            {colors.map(color=>
                            <Item active={color.id==variation.color_id?true:false} opacity={(!size_active||variation.variation_size.some(r=>color.variation.includes(r))) && !color.disabled?1:0.6} disabled={(!size_active||variation.variation_size.some(r=>color.variation.includes(r))) && !color.disabled ?false:true} onPress={()=>setcolors(color)} key={`${color.id}`}>
                                <Image style={{width:24,height:24,marginRight:4}} source={{uri:color.image||product.image}} />
                                <Text style={{color:(!size_active||variation.variation_size.some(r=>color.variation.includes(r))) && !color.disabled?'#757575':'rgba(0,0,0,.4)'}}>{color.value}</Text>
                                <View style={[styles.tick,{opacity:color.id==variation.color_id?1:0}]}>
                                  <Svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" style={styles.icon_check}><G><Path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></Path></G></Svg>
                                </View>
                            </Item>
                            )}
                            </ListItem>
                        </View>:null}
                        {sizes.length>0?
                        <View style={styles.section_item}>
                            <Text style={{marginBottom:8}}>{sizes[0].name}</Text>
                            <ListItem>
                            {sizes.map(size=>
                            <Item active={size.id==variation.size_id?true:false} opacity={(!color_active||variation.variation_color.some(r=>size.variation.includes(r))) && !size.disabled?1:0.6} disabled={(!color_active ||variation.variation_color.some(r=>size.variation.includes(r))) && !size.disabled?false:true} onPress={()=>setsizes(size)} key={`${size.id}`}>
                                <Text style={{textAlign:'center',color:(!color_active||variation.variation_color.some(r=>size.variation.includes(r))) && !size.disabled?'#757575':'rgba(0,0,0,.4)'}}>{size.value}</Text>
                                <View style={[styles.tick,{opacity:size.id==variation.size_id?1:0}]}>
                                  <Svg enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0" style={styles.icon_check}><G><Path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></Path></G></Svg>
                                </View>
                            </Item>
                            )}
                            </ListItem>
                        </View>:null}
                        <View style={[styles.item_space,styles.section_item]}>
                            <Text>Số lượng</Text>
                            <View style={{flexDirection:'row'}}>
                              <PressAdjust onPress={e=>setQuantity(quantity+1)} disabled={valid && quantity>1?false:true}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:valid&&quantity>1?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></Polygon></Svg>
                              </PressAdjust>
                              <ViewInput 
                                editable={valid?true:false}
                                keyboardType='numeric'
                                maxLength={3}
                                value={quantity.toString()}
                                onChangeText={(text)=>setQuantity(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))}
                                style={{color:'#ee4d2d',textAlign:'center'}}
                              />
                            
                              <PressAdjust onPress={e=>setQuantity(quantity+1)}  disabled={valid?false:true}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:valid?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></Polygon></Svg>
                              </PressAdjust>
                            </View>
                        </View>
                        <Pressable onPress={()=>{if(token){
                            submit()
                        }}} style={[styles.btn_1,{height:40,backgroundColor:valid?'#ee4d2d':'#e5e5e5'}]}  disabled={valid?false:true}>
                          <StyleText primary={valid?true:false}>{type=='update'?'Xác nhận':'Thêm vào giỏ hàng'}</StyleText>
                        </Pressable>
                        <Pressable style={styles.btn_close} onPress={()=>setShow(false)}>
                          <Svg  xmlns="http://www.w3.org/2000/svg" style={styles.icon_close} viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></Path></Svg>
                        </Pressable>
                    </StyleModalContent>:null}
                </View>
            </TouchableWithoutFeedback>
          </Modal>:null}
        </>
    )
}

const mapStateToProps = state => ({
    token:state.auth.token,showmodal:state.buyer.showvariation,quantitydata:state.buyer.quantity,
    type:state.buyer.type,data:state.buyer.data,product:state.buyer.product
  });
  
export default connect(mapStateToProps,{showvariation,updatevariation})(VariationItem);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
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
      flex:1 , 
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignItems:'center',
      justifyContent:'center'
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
    svg_icon:{
      width: 12,
      fontSize: 12,
      height: 12,
      color:'#757575',
      fill: 'currentColor',
      position: 'relative'
    },
    svg_icon1:{
      width: 16,
      fontSize: 16,
      height: 16,
      color:'rgba(0,0,0,0.5)',
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
   
    icon:{
    stroke: 'currentColor',
      fill: 'currentColor',
      height: 12,
      width: 12,
      color: 'rgba(0, 0, 0, 0.54)'
    },
    
    
  })
