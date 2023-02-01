
import React,{useState,useEffect,useMemo, useTransition} from 'react';
import { updatefileURL,shippingshopURL,newproductURL } from '../../../urls';
import {connect, useDispatch, useSelector} from "react-redux"
import styled from 'styled-components'
import { Container,styles,Styletext } from "../marketing/styles"
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
  FlatList,
  TextInput,
  Dimensions,
  StyleSheet,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import { generateString,groupBy, listchoice } from '../../../constants';
import { addcategory,updatecategory } from '../../../actions/seller';
const Dot=styled.View`
height:0;
backgroundColor:#757575;
position:absolute;
bottom:0;
width:100%;
borderTopWidth: 1px;
borderTopColor:#e5e5e5
`
const Item=styled.View`
justify-content:center;
align-items:center;
z-index:2;
margin-right:8px
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
const Category=styled.Pressable`
border-bottom-width:1px;
border-color:rgba(0,0,0,0.1);
padding:10px 12px
`
const Addcategory=(props)=>{
    const {navigation,route}=props
    const {headers}=route
    const datachoice=useSelector(state=>state.seller.list_category_choice)
    const datacategories=useSelector(state=>state.seller.categories)
    console.log(datacategories)
    const [state,setState]=useState({list_category:[],category:null,
    position:0})
    const [list_category_choice,setListcategorychoice]=useState([])
    const dispatch=useDispatch()
    const [level,setLevel]=useState(0)
    const [keyword,setKeyword]=useState('')
    const [isPending,setTransition]=useTransition()
    const [show,setShow]=useState(false)
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        ( async ()=>{
            try{
                if(datacategories.length==0){
                const res = await axios.get(newproductURL,headers())
                const max_level=res.data.list_category.reduce((arr,obj)=>arr.level>obj.level?arr:obj).level
                const list_null=Array(max_level+1).fill().map((_, i) =>{
                    return {id:null,title:null,level:i}
                })
                const list_category_choices=datachoice.find(item=>item.choice)?datachoice:list_null
                dispatch(addcategory(list_category_choices,res.data.list_category))
                setListcategorychoice(list_category_choices)
                setLoading(true)
                }
                else{
                    setLoading(true)
                    setListcategorychoice(datachoice)
                }
            }
            catch(e){
                console.log(e)
            }
        })()
    },[datachoice])
    
    const setcategorychoice=(category)=>{
        setLevel(category.choice?category.level:category.level+1)
        const list_choice=list_category_choice.map((item,index)=>{
            if(item.level==category.level){
                return({...item,id:category.id,title:category.title,choice:category.choice})
            }
            else if(item.level>category.level){
                return({...item,id:null,title:null})
            }
            return({...item})
        })
        setListcategorychoice(list_choice)
    }
    
    
    const setfiltercategory=(e)=>{
        setTransition(()=>{
            setKeyword(e.target.value)
        })
    }
   
   const comfirm=()=>{
       dispatch(updatecategory(list_category_choice))
       navigation.goBack()
   }
    const categories=useMemo(()=>{
        return datacategories.filter(category=>category.level==level && (!keyword ||category.title.indexOf(keyword)!==-1) && (level==0||(level>0 &&list_category_choice.find(item=>item.id==category.parent))))
    },[level,datacategories,list_category_choice])
    const valid=list_category_choice.find(item=>item.choice)
    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                        <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Chọn nghành hàng</Text>
                </View>
                <Pressable>
                    <Svg viewBox="0 0 19 19" style={[styles.svg_icon3,{color:'#ee4d2d'}]}><G fill-rule="evenodd" stroke="none" stroke-width="1"><G transform="translate(-1016 -32)"><G><G transform="translate(405 21)"><G transform="translate(611 11)"><Path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></Path><Path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></Path></G></G></G></G></G></Svg>
                </Pressable>
            </View>
            <View style={{backgroundColor:'#fff',position:'relative'}}>
                <View style={[styles.flexrow,{marginBottom:12,padding:12}]}>
                    {list_category_choice.filter(item=>item.id).map(item=>
                    <Item key={item.id}>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            style={{padding:4}}
                            underlayColor="rgba(0,0,0,.1)"
                             onPress={()=>setLevel(item.level)}>
                            <View style={[styles.item_center,{paddingBottom:8,paddingTop:8}]}>
                                <Text style={[{textAlign:'center',color:level===item.level?'#ee4d2d':'#757575'}]}>{item.title}</Text>
                                <Tabbottom active={level===item.level?true:false}></Tabbottom>
                            </View>
                        </TouchableHighlight>
                    </Item>     
                    )}
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:140}}
                >
                    {categories.map(category=>
                        <Category key={category.id} onPress={()=>{
                            setcategorychoice(category)
                        }} style={styles.item_space}>
                            <Text style={{color:list_category_choice.find(item=>item.id==category.id)?'#ee4d2d':'#757575'}}>{category.title}</Text> 
                            {category.choice?null:
                            <View>
                                <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><Path d="M23.5 15.5l-12-11c-.6-.6-1.5-.6-2.1 0-.2.2-.4.6-.4 1s.2.8.4 1l10.9 10-10.9 10c-.6.6-.6 1.5 0 2.1.3.3.7.4 1 .4.4 0 .7-.1 1-.4l11.9-10.9.1-.1c.3-.3.4-.7.4-1.1.1-.4 0-.8-.3-1z"></Path></Svg>
                            </View>}
                        </Category>
                    )}
                </ScrollView>
            </View>
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={valid?false:true} onPress={comfirm} style={[styles.btn,{flex:1,backgroundColor:valid?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                    <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Xác nhận</Text>
                </Pressable>
            </View>
        </Container>
        
    )
}
export default Addcategory