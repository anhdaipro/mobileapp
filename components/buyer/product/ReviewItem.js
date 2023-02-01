
import axios from 'axios';
import React, {useState, useEffect,useRef} from 'react'
import { showvariation} from '../../../actions/auths';
import {localhost,reviewURL} from "../../../urls"
import {timecreate,itemvariation,ratingitem,hidestring} from "../../../constants"
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
import { Pressable,
    ScrollView,
    Image,
    ImageBackground,
    View,
    Text,
    SafeAreaView,
    StyleSheet } from 'react-native';
import {connect} from "react-redux"
import { TouchableHighlight } from 'react-native-gesture-handler';
const Flex=styled.View`
flex-direction:row
`
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#333'};
font-size:12px
`
const Item=styled.View`
flex-direction:row;
padding:8px;
border-color:rgba(0,0,0,0.1);
`
const ReviewItem=(props)=>{
    const {item,showmedia,setlikereview,setreport,user,navigation,headers}=props
    const [show,setShow]=useState(false)
    const [file,setFile]=useState()

    return(
        <Item style={{borderBottomWidth:0.6}}>
            {item.shop?
            <Pressable style={{marginRight:8}} onPress={()=>navigation.navigate('Shop',{slug:item.shop})}>
                <Image style={styles.avatar} source={{uri:item.user.avatar}} />
            </Pressable>:
            <View style={{marginRight:8}}>
                <Image style={styles.avatar} source={{uri:item.user.avatar}} />
            </View>
            }
            <View style={{flex:1}}>
                <View style={[styles.item_space,{marginBottom:8}]}>
                    {item.shop?
                    <Pressable onPress={()=>navigation.navigate('Shop',{slug:item.shop})}>
                        <Styletext second>{item.anonymous_review?item.user.username.substr(0,1)+hidestring(item.user.username)+item.user.username.substr(-1):item.user.username}</Styletext>   
                    </Pressable>
                    :
                    <View>
                        <Styletext second> {item.anonymous_review?item.user.username.substr(0,1)+hidestring(item.user.username)+item.user.username.substr(-1):item.user.username}</Styletext> 
                    </View>}
                    <View style={styles.flexcenter}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={()=>setlikereview(item)} style={{flexDirection:'row',padding:4}}>
                            <Flex>
                                <Svg style={[styles.svg_icon,{marginRight:4,color:item.liked?'#ee4d2d':'#757575'}]} viewBox="0 0 14 13" version="1.1" xmlns="http://www.w3.org/2000/svg"><Defs></Defs><G stroke="none" strokeWidth="1" fillRule="evenodd"><G id="Product-Ratings-Working" transform="translate(-245.000000, -855.000000)" fillRule="nonzero"><G transform="translate(155.000000, 92.000000)"><G transform="translate(40.000000, 184.000000)"><G transform="translate(0.000000, 326.000000)"><G transform="translate(50.000000, 253.000000)"><G><Path d="M0,12.7272727 L2.54545455,12.7272727 L2.54545455,5.09090909 L0,5.09090909 L0,12.7272727 Z M14,5.72727273 C14,5.02727273 13.4272727,4.45454545 12.7272727,4.45454545 L8.71818182,4.45454545 L9.35454545,1.52727273 L9.35454545,1.33636364 C9.35454545,1.08181818 9.22727273,0.827272727 9.1,0.636363636 L8.4,0 L4.2,4.2 C3.94545455,4.39090909 3.81818182,4.70909091 3.81818182,5.09090909 L3.81818182,11.4545455 C3.81818182,12.1545455 4.39090909,12.7272727 5.09090909,12.7272727 L10.8181818,12.7272727 C11.3272727,12.7272727 11.7727273,12.4090909 11.9636364,11.9636364 L13.8727273,7.44545455 C13.9363636,7.31818182 13.9363636,7.12727273 13.9363636,7 L13.9363636,5.72727273 L14,5.72727273 C14,5.79090909 14,5.72727273 14,5.72727273 Z"></Path></G></G></G></G></G></G></G></Svg>
                                <Styletext style={{lineHeight:14}} second>{item.num_liked==0?'hữu ích':item.num_liked}</Styletext>  
                            </Flex>
                               
                        </TouchableHighlight>
                        <Pressable style={[{marginLeft:16,width:16,height:16,backgroundColor:'transparent'},styles.item_center]}>
                            <Svg style={styles.svg_icon} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 32.055 32.055" enableBackground='new 0 0 32.055 32.055' xmlSpace="preserve">
                                <G>
                                    <Path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967   C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967   s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967   c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
                                </G>
                            </Svg>
                        </Pressable>
                    </View>
                </View>
                <Flex style={{marginBottom:8}}>
                    {ratingitem(5,item,12,'rgb(255, 206, 61)')}
                </Flex>
                {itemvariation(item)!=''?
                <View style={{marginBottom:8}}><Styletext second>Phân loại hàng: {itemvariation(item)}</Styletext></View>
                :null}
                {item.info_more?<View style={{marginBottom:8}}><Text >{item.info_more}</Text></View>:null}
                
                {item.list_file.length>0?
                <View style={{marginBottom:8}}>
                    <ScrollView
                    contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}
                    >
                        {item.list_file.map((file,index)=>
                            <Pressable onPress={()=>showmedia(file,item)} style={{position:'relative'}}>
                                <View>
                                    <ImageBackground style={{width:80,height:80}} source={{uri:file.filetype==='video'?file.media_preview:file.file}} />  
                                </View>
                                {file.filetype==='video'?
                                    <Svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" style={[styles.svg_icon1,{position:'absolute',left:'50%',top:'50%',transform:[{translateX:-10},{translateY:-10}]}]}><Path d="m10 20c5.5228 0 10-4.4772 10-10 0-5.5228-4.4772-10-10-10-5.5228 0-10 4.4772-10 10 0 5.5228 4.4772 10 10 10z" clip-rule="evenodd" fill-opacity=".5" fill-rule="evenodd"></Path><Path d="m7 6.1263c0-0.55798 0.4141-0.78618 0.91986-0.50718l6.6976 3.8599c0.506 0.27899 0.506 0.73534 0 1.0143l-6.6976 3.8876c-0.50603 0.279-0.91986 0.0508-0.91986-0.5072v-7.7474z" fill="#fff"></Path></Svg>
                                :null}
                            </Pressable>  
                        )}
                    </ScrollView>
                </View>
                :null}
                <View>
                    <Styletext second>{timecreate(item.created)}</Styletext>
                </View>
                
            </View>
        </Item>
    )
}
export default ReviewItem

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    icon_back:{
      width: 20,
      height: 20,
      color:'#ee4d2d',
      fill: 'currentColor',
      position: 'relative'
    },
    avatar:{
        width:32,height:32,borderRadius:16,
        overflow:'hidden'
    }
    ,
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
    
    svg_icon:{
      width: 12,
      fontSize: 12,
      height: 12,
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
    image: {
      width:'100%',
      height:'100%'
    },
   
    
   
  })
