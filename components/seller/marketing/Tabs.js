
import React, {useState,useCallback,useEffect,useRef} from 'react'
import axios from 'axios'
import {useSelector} from "react-redux"
import styled from "styled-components"
import {styles} from "./styles"

import {StyleSheet,TouchableHighlight,Text,View,Pressable} from "react-native"
const Flex=styled.View`
flex-direction:row;
`
const FlexStart=styled(Flex)`
align-items: flex-start;
`
const Flexend=styled(Flex)`
align-items: flex-end;
`

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


const Tabs=(props)=>{
    const {url,setdata,choice,headers,setloading,setcount,listchoice,setchoice}=props
  
    useEffect(()=>{
        (async()=>{
            try{
            const urldata=choice=='all'?`${url}`:`${url}?choice=${choice}`
            const res =await axios.get(urldata,headers())
            setdata(res.data.data)
            setcount(res.data.count)
            setloading(true)
            }
            catch(e){
                console.log(e)
            }
        })()
    },[choice])
    
    return(
        <View style={{backgroundColor:'#fff',width:'100%',marginBottom:12,position:'relative'}}>
            <Flex>
                {listchoice.map((item,i)=>
                <Item key={i}>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="rgba(0,0,0,.1)"
                        style={[styles.item_center]} onPress={()=>setchoice(item.value)}>
                        <View style={[styles.item_center,{width:'100%',paddingBottom:8,paddingTop:8}]}>
                            <Text style={[styles.fontsmall,{textAlign:'center'}]}>{item.name}</Text>
                            <Tabbottom active={choice==item.value?true:false}></Tabbottom>
                        </View>
                    </TouchableHighlight>
                </Item>    
                )}
            </Flex>
            <Dot/>
        </View>
    )
}
export default Tabs