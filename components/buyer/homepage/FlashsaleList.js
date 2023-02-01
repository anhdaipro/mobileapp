
import { headers } from "../../../actions/auths"
import { Animated, StyleSheet, Text, View,Dimensions, ScrollView,Pressable, ImageBackground } from "react-native";
import { listflashsaleshopURL, listitemflashsalelURL } from "../../../urls";
import React, { useState, useEffect,useRef } from 'react';
import axios from "axios"
import styled from "styled-components"

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

import { formatter } from "../../../constants";
const {width}=Dimensions.get('window')
const Content=styled.View`
background-color:#fff;
padding:12px 0;
margin-top:12px
`
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
const Boxcontent=styled.View`
padding:12px 0 0 0
`
const BoxOrder=styled.View`
padding:0 4px
`
const FlashsaleList=(props)=>{
    const {navigation}=props
    const [state,setState]=useState({items:[],time_end:new Date(),transform:'translate(0px, 0px)',loading:false })
    const [time,setTime]=useState({hours:0,mins:0,seconds:0})
    const[dx,setDx]=useState(0)
    const number=(number,value)=>{
        return Array(number).fill().map((_,i)=>
            <View style={{height:22}}>
                <Text key={i} style={{color:'#fff',fontSize:12,lineHeight:22,fontWeight:'500'}}>{i}</Text>
            </View>
            
            
        )
    }
   const seconds1=useRef()
   const seconds2=useRef()
   const mins1=useRef()
   const mins2=useRef()
   const hours1=useRef()
   const hours2=useRef()
    useEffect(() => {
        (async () => {
        await axios.get(listitemflashsalelURL,headers())
        .then(res => {
                const data = res.data;
                console.log(data)
                const time_end=data.valid_to
                setState({ ...state,id:res.data.id,loading:true,items:data.items_flash_sale,time_end:time_end,transform:'translate(0px, 0px)' });
                const FalshsaleDate = new Date(time_end)
                const currentDate = new Date();
                let totalSeconds = (FalshsaleDate - currentDate) / 1000;
                if(totalSeconds){
                    const countDown= setInterval(() => timer(), 1000);
                    const  timer=()=> {
                        setTime({hours:Math.floor(totalSeconds / 3600) % 24,
                            mins: Math.floor(totalSeconds / 60) % 60,
                            seconds:Math.floor(totalSeconds) % 60})
                            if(totalSeconds<0){
                            totalSeconds=0
                            clearInterval(countDown);
                        }
                    }
                }
            })
        })()
    },[])
    console.log(time)
    const { items,id} = state;
    const listitem=[...items,{value:1}]
    useEffect(()=>{
        if(time.seconds){
        seconds2.current?.scrollTo({x: 0, y: parseInt(('0'+time.seconds).slice(-1))*22, animated: true})
        seconds1.current?.scrollTo({x: 0, y: parseInt(('0'+time.seconds).slice(-2,-1))*22, animated: true})
        mins2.current?.scrollTo({x: 0, y: parseInt(('0'+time.mins).slice(-1))*22, animated: true})
        mins1.current?.scrollTo({x: 0, y: parseInt(('0'+time.mins).slice(-2,-1))*22, animated: true})
        hours2.current?.scrollTo({x: 0, y: parseInt(('0'+time.hours).slice(-1))*22, animated: true})
        hours1.current?.scrollTo({x: 0, y: parseInt(('0'+time.hours).slice(-2,-1))*22, animated: true})
        }
    },[time])
    return(
        <Content>
            <View style={[styles.flexspace,{paddingLeft:8,paddingRight:8,marginBottom:12}]}>
                <View style={[styles.flexcenter]} >
                    <ImageBackground resizeMode='contain' style={{width: 96,height: 24,marginTop:6,marginRight:8}} source={{uri:'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png'}} />
                    <View style={styles.center}>
                        <View style={[styles.timer__number,styles.flexcenter]}>
                            <ScrollView 
                                showsHorizontalScrollIndicator={false}
                                ref={hours1}>
                                {number(10,('0'+time.hours).slice(-2,-1))}  
                            </ScrollView>
                            <ScrollView showsHorizontalScrollIndicator={false} ref={hours2}>
                               {number(10,('0'+time.hours).slice(-1))}
                            </ScrollView>
                        </View>
                        <View style={styles.timer__colon}><Text>:</Text></View>
                        <View style={[styles.timer__number,styles.flexcenter]}>
                            <ScrollView showsHorizontalScrollIndicator={false} ref={mins1}>
                               {number(10,('0'+time.mins).slice(-2,-1))}
                            </ScrollView>
                            <ScrollView showsHorizontalScrollIndicator={false} ref={mins2} 
                            >  
                                {number(10,('0'+time.mins).slice(-1))} 
                            </ScrollView>
                        </View>
                        <View style={styles.timer__colon}><Text>:</Text></View>
                        <View style={[styles.timer__number,styles.flexcenter]}>
                            <ScrollView 
                                showsHorizontalScrollIndicator={false}
                                ref={seconds1}
                            >
                                {number(10,('0'+time.seconds).slice(-2,-1))}
                            </ScrollView>
                            <ScrollView 
                                showsHorizontalScrollIndicator={false}
                                ref={seconds2} 
                            >
                                {number(10,('0'+time.seconds).slice(-1))}
                            </ScrollView>
                        </View>
                    </View>
                </View>   
                <Pressable style={styles.flexcenter} onPress={() => navigation.navigate('Flashsale',{promotionId:id})}>
                    <Styletext second>Xem tất cả</Styletext>
                    <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                </Pressable>
                
            </View>
            <View style={{paddingLeft:8,paddingRight:8}}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexDirection:'row'}}

            >
                {listitem.map((item,i)=>
                <>
                {i<listitem.length-1?
                <Pressable style={{width:width/2.5,paddingRight:6}} key={i} onPress={()=>navigation.navigate("Flashsale",{fromItem:item.id,promotionId:id})}>
                    
                    <View style={{position:'relative'}}>
                        <ImageBackground style={{paddingTop: '100%',width:'100%',}} resizeMode='contain' source={{uri:item.image}}/>
                        <Boxcontent>
                            <View style={[styles.center,{marginBottom:8,width:'100%'}]}>
                                <Styletext primary>₫</Styletext>
                                <Text  style={styles.textorange}>{formatter(item.discount_price)}</Text> 
                            </View>
                            <BoxOrder>
                                <View style={{width:'100%',position:'relative',height:16}}>
                                    <View style={[styles.center,{position:'absolute',zIndex:2,width:'100%'}]}>
                                        <Text style={[styles.textwhite,{textTransform:'uppercase',fontSize:12}]}>{item.number_order/item.promotion_stock>0.8?'Sắp cháy hàng':`Đã bán ${item.number_order}`}</Text>
                                    </View>
                                    
                                    <ImageBackground source={{uri:'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/ac7f81d9ee062223753413ec98497a86.png'}} resizeMode='contain' style={{position:'absolute',left:0,top:0,height:'100%',width: `${((item.number_order/item.promotion_stock))*100}%`}}/>     
                                            
                                    {item.number_order/item.promotion_stock>0.5?
                                    <ImageBackground resizeMode='contain' style={{position:'absolute',left:2,top:-2,zIndex:4,width:18,height:18}} source={{uri:'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/c5316dd01de2b0d41d267a57f5b32844.png'}}/>:null}   
                                    <View style={{borderRadius: 8,backgroundColor: '#ffbda6',zIndex: 1,position: 'absolute',height:16,left: 0,top: 0,width: `${(1-(item.number_order/item.promotion_stock))*100}%`}}></View>
                                </View>
                            </BoxOrder>
                        </Boxcontent>
                        <View style={styles.flag}>
                            <View style={styles.flagBottom}/>
                            <Text style={{
                                fontSize: 12,
                                color: '#ee4d2d',
                                fontWeight: '500',
                                letterSpacing: 1,
                                }}>{item.percent_discount}%</Text>
                            <Text style={styles.textwhite}>GIẢM</Text>
                        </View>
                        
                    </View>

                </Pressable>
                :<View onPress={()=>navigation.navigate("Flashsale",{promotionId:id})} style={[styles.item_center,{width:width/2.5}]}>
                    <View style={[styles.center,{width:40,height:40,
                    borderWidth: 1,borderColor: "#d0011b",borderRadius: 50,marginBottom:8}]}>
                    <Svg style={styles.icon_large} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                    </View>
                    <Styletext primary>Xem tất cả</Styletext>
                </View>}
                </>)}
                
            </ScrollView>
            </View>
        </Content>
    )
}

export default FlashsaleList
const styles=StyleSheet.create({
    flexspace:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    flexcenter:{
        dispalay:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    center:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    item_center:{
        alignItems:'center',
        justifyContent:'center',
    },
    timer__colon:{
        padding: 0
    },

    timer__number__hexa: {
        width: 10,
        height: 220,
        overflow: 'hidden',
    },

    timer__number__item:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 16,
        height: 16,
        overflow: 'visible',
    },

    svg_icon:{
        width: 12,
        height: 12,
        color:'#757575',
        fill: 'currentColor',
        position: 'relative'
    },

    item_name:{
        fontSize: 12,
        color: '#333',
        marginTop:8,
        minHeight:40,
        fontWeight: '600',}
    ,
    textwhite:{
        color:'#fff'
    },

      textorange:{
        color:'#ee4d2d'
    },

    textnormal:{
        color:'#757575'
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
    timer__number :{
        height: 22,
        marginRight:4,
        paddingLeft:3,
        borderRadius:2,
        marginLeft:4,
        paddingRight:3,
        backgroundColor:'#232323',
    },
    icon_large:{
        width:16,height:16,
        color: '#d0011b',
        fontSize: 12,
        fill: 'currentColor',
        position: 'relative'
      }
})