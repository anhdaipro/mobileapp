import React, { useState, useEffect,useRef } from 'react';
import {  showvariation } from '../../actions/auths';
import { categoryURL,categoryinfoURL, searchURL } from '../../urls';
import { formatter,partition } from '../../constants';
import {headers} from "../../actions/auths"
import styled from 'styled-components'
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
import Slide from '../../hocs/Slide';
import Navbar from './Navbar';
import Item from './homepage/Item';
const shopmall=[
{image:'https://cf.shopee.vn/file/513f589c10254512669d3d8b50a6dea7'},
{image:'https://cf.shopee.vn/file/5c1936f863ed34b0e77299b2dbb96365'},
{image:'https://cf.shopee.vn/file/d1aa441638492fb588741d01af604811'},
{image:'https://cf.shopee.vn/file/513f589c10254512669d3d8b50a6dea7'},
{image:'https://cf.shopee.vn/file/5c1936f863ed34b0e77299b2dbb96365'},
{image:'https://cf.shopee.vn/file/d1aa441638492fb588741d01af604811'},
{image:'https://cf.shopee.vn/file/513f589c10254512669d3d8b50a6dea7'},
{image:'https://cf.shopee.vn/file/5c1936f863ed34b0e77299b2dbb96365'},
{image:'https://cf.shopee.vn/file/d1aa441638492fb588741d01af604811'},
{image:'https://cf.shopee.vn/file/513f589c10254512669d3d8b50a6dea7'},
{image:'https://cf.shopee.vn/file/5c1936f863ed34b0e77299b2dbb96365'},
{image:'https://cf.shopee.vn/file/d1aa441638492fb588741d01af604811'},
{image:'https://cf.shopee.vn/file/513f589c10254512669d3d8b50a6dea7'},
{image:'https://cf.shopee.vn/file/5c1936f863ed34b0e77299b2dbb96365'},
{image:'https://cf.shopee.vn/file/d1aa441638492fb588741d01af604811'}
]
const shoptrend=[
    {name:'FREESHIP & HOÀN XU XTRA',image:'https://cf.shopee.vn/file/3854ad0615cfa2d15eb06a446816465d'},
    {name:'Shop xu hướng',image:'https://cf.shopee.vn/file/f05c3231cb59b6d0c233db3ea7a30b8f'},
    {name:'FREESHIP & HOÀN XU XTRA',image:'https://cf.shopee.vn/file/3854ad0615cfa2d15eb06a446816465d'},
    {name:'Shop xu hướng',image:'https://cf.shopee.vn/file/f05c3231cb59b6d0c233db3ea7a30b8f'},
    {name:'FREESHIP & HOÀN XU XTRA',image:'https://cf.shopee.vn/file/3854ad0615cfa2d15eb06a446816465d'},
    {name:'Shop xu hướng',image:'https://cf.shopee.vn/file/f05c3231cb59b6d0c233db3ea7a30b8f'},
    {name:'Shop xu hướng',image:'https://cf.shopee.vn/file/f05c3231cb59b6d0c233db3ea7a30b8f'},
]
const itemtop=[
    {name:'SOFT BOY - ÁO HOODIE',image:'https://cf.shopee.vn/file/14a549d1dcd55c645bf30778cb67b4ee'},
    {name:'E-BOY - ÁO SƠ MI DÀI TAY',image:'https://cf.shopee.vn/file/aea452a1197040405efd12e508d74d41'},
    {name:'SOFT BOY - ÁO HOODIE',image:'https://cf.shopee.vn/file/14a549d1dcd55c645bf30778cb67b4ee'},
    {name:'SOFT BOY - ÁO HOODIE',image:'https://cf.shopee.vn/file/14a549d1dcd55c645bf30778cb67b4ee'},
    {name:'SOFT BOY - ÁO HOODIE',image:'https://cf.shopee.vn/file/14a549d1dcd55c645bf30778cb67b4ee'},
    
]
const StyleView=styled.View`
align-items:center;
justify-content:center;
padding:8px 12px;
`
const int=2
const {width} = Dimensions.get('window');
const height = width*0.4;
const widthcate=width*2.5
const Shop=(props)=>{
    const {categories,item,navigation,i}=props
    return(
        <View key={i} style={{width:`${100/(categories.length)}%`,position:'relative'}}>
            <View style={{paddingRight:8}}>
                {item.map((category,index)=>
                <Pressable key={index}
                    onPress={() =>navigation.navigate('Category', { slug:category.slug })}
                    style={styles.flexcenter}
                    > 
                    <View style={{borderColor:'rgba(0,0,0,.05)',overflow: 'hidden',width:'100%',marginBottom:8,
                    borderWidth:1}}>
                        <ImageBackground style={{width:'100%',paddingTop: '56.25%',resizeMode: 'cover',justifyContent: 'center', alignItems: 'center' }}  source={{uri: category.image}}/>
                    </View>
                </Pressable>
                )}  
          </View>           
      </View>
    )
}
const ChildCategory=(props)=>{
    const {categories,item,navigation,i}=props
    return(
        <View key={i} style={{width:`${100/(categories.length)}%`,position:'relative'}}>
            <View style={{paddingRight:8}}>
                {item.map((category,index)=>
                <Pressable key={index}
                    onPress={() =>navigation.navigate('Category', { slug:category.slug })}
                    style={styles.flexcenter}
                    > 
                    <View style={{overflow: 'hidden',width:'100%'
                    }}>
                        <ImageBackground style={{width:'100%',paddingTop: '100%',resizeMode: 'cover',justifyContent: 'center', alignItems: 'center' }}  source={{uri: 'https://cf.shopee.vn/file/db85a18d4beb307b519e4e32d24222e3_tn'}}/>
                        <Text numberOfLines={2} style={{textAlign:'center',height:40,fontSize:12}}>{category.title}</Text>
                    </View>
                </Pressable>
                )}  
            </View>           
        </View>
    )
}
const Category=(props)=>{
    const {route,navigation,token }=props
    const {slug} = route.params;
    const [data,setData]=useState()
    const [shopmalls,setShopmall]=useState([])
    const [background,setBackground]=useState('#fff')
    const [categorychoice,setCategorychoice]=useState([])
    const [categories,setCategory]=useState([])
    const [listitem,setListitem]=useState()
    const [color,setColor]=useState({background:'rgba(0,0,0,0.1)',color:'#ee4d2d'})
   
    useEffect(()=>{
        (async()=>{
        const url=axios.get(`${categoryURL}${slug}`,headers())
        const res = await url
        setData(res.data)
        setShopmall(partition(shopmall, int).map(subarray => subarray))
        const res1 =await axios.get(`${categoryinfoURL}?category_id=${res.data.id}`,headers())
        setCategory(res1.data.category_children)
        setCategorychoice(partition(res1.data.category_children, int).map(subarray => subarray))
        const res2 =await axios.get(`${searchURL}?category_id=${res.data.id}`,headers())
        setListitem(res2.data)
        })()
    },[slug])
    console.log(categorychoice)
    return(
        <View>
            <Navbar
                color={color}
                background={background}
            />
            {data?
            <ScrollView
            contentContainerStyle={{paddingTop:76}}
            >
                <Slide
                height={height}
                data={data.image_home}
                />
                <View style={{backgroundColor:'#fff',marginTop:8}}>
                    <View style={[styles.flexspace,{padding:8,paddingBottom:0}]}>
                        <View>
                            <Text style={[styles.textnomal,{textTransform:'uppercase',fontSize:14}]}>Shop mall</Text>
                        </View>
                        <View style={[styles.flexcenter,{color:'#ee4d2d'}]}>
                            <Text style={{color:'#ee4d2d',lineHeight:16}}>Xem them</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </View>
                    </View>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{backgroundColor:'#fff',width:widthcate,paddingLeft:8,marginTop:8,flexDirection:'row'}}
                    >
                        {shopmalls.map((item,i)=>
                            <Shop
                                key={i}
                                item={item}
                                navigation={navigation}
                                categories={shopmalls}
                            />
                        )}
                    </ScrollView>
                </View>
                <View style={{backgroundColor:'#fff',marginTop:8}}>
                    <View style={[styles.flexspace,{padding:8,paddingBottom:0}]}>
                        <View>
                            <Text style={[styles.textnomal,{textTransform:'uppercase'}]}>Siêu shop thịnh hành</Text>
                        </View>
                        
                    </View>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{backgroundColor:'#fff',width:width*2,paddingLeft:12,paddingRight:4,marginTop:8,flexDirection:'row',paddingBottom:8}}
                    >
                        {shoptrend.map((item,i)=>
                        <Pressable onPress={() => Alert.alert('View Clicked...')} key={i} style={{paddingRight:8,width:`${100/(shoptrend.length)}%`}}>
                            <View style={[{flex:1},styles.center]} key={item.id}>
                            <ImageBackground style={{width:'100%',paddingTop:'100%',resizeMode: 'cover',justifyContent: 'center', alignItems: 'center'}} source={{uri:item.image}}/>
                            <StyleView>
                                <Text numberOfLines={2} style={styles.item_name}>{item.name}</Text>
                                <Text style={{marginTop:8,}}>
                                    <Text style={{fontSize:12,color:'#757575'}}>Từ </Text>
                                    <Text style={{fontSize:12,color:'#ee4d2d'}}>₫13.900</Text>
                                </Text>       
                            </StyleView>
                        </View>
                        </Pressable>
                        )}
                    </ScrollView>
                </View>
                <View style={{backgroundColor:'#fff',marginTop:8}}>
                    <View style={[styles.flexspace,{padding:8,paddingBottom:0}]}>
                        <View>
                            <Text style={[styles.textnomal,{textTransform:'uppercase',fontSize:14}]}>Kiểu cách thinh hanh</Text>
                        </View>
                    </View>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{backgroundColor:'#fff',width:width*1.5,paddingLeft:12,paddingRight:4,marginTop:8,flexDirection:'row',paddingBottom:8}}
                    >
                        {itemtop.map((item,i)=>
                        <Pressable onPress={() => Alert.alert('View Clicked...')} key={i} style={{paddingRight:8,width:`${100/(itemtop.length)}%`}}>
                            <View style={[{flex:1},styles.center]} key={item.id}>
                            
                                <ImageBackground style={{width:'100%',paddingTop:'100%',resizeMode: 'cover',justifyContent: 'center', alignItems: 'center'}} source={{uri:item.image}}/>
                                <StyleView>
                                    <Text numberOfLines={2} style={styles.item_name}>{item.name}</Text>
                                    <Text style={{marginTop:8,}}>
                                        <Text style={{fontSize:12,color:'#757575'}}>Từ </Text>
                                        <Text style={{fontSize:12,color:'#ee4d2d'}}>₫13.900</Text>
                                    </Text>       
                                </StyleView>
                            </View>
                        </Pressable>
                        )}
                    </ScrollView>
                </View>
                <View style={{backgroundColor:'#fff',marginTop:8}}>
                    <View style={[styles.flexspace,{padding:8,paddingBottom:0}]}>
                        <View>
                            <Text style={[styles.textnomal,{textTransform:'uppercase',fontSize:14}]}>Kiểu cách thinh hanh</Text>
                        </View>
                    </View>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{backgroundColor:'#fff',width:width*2,paddingLeft:8,marginTop:8,flexDirection:'row',paddingBottom:8}}
                        >
                        {categorychoice.map((item,i)=>
                            <ChildCategory
                                key={i}
                                item={item}
                                navigation={navigation}
                                categories={categorychoice}
                            />
                        )}
                    </ScrollView>
                </View>
                <View style={{backgroundColor:'#fff',marginTop:8}}>
                    <View>
                        <Text style={[styles.textnomal]}>Gợi ý cho bạn</Text>
                    </View>
                </View>
                {listitem?
                <View style={{paddingTop:4}}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{padding:2,
                        flexDirection:'row',
                        flexWrap: 'wrap',}}
                        >
                        {listitem.list_item_page.map((item,i)=>
                            <Item
                                key={i}
                                data={item}
                                i={i}
                                navigation={navigation}
                            />
                        )}
                    </ScrollView>
                </View>:null}
            </ScrollView>:null}
        </View>
    )
}
const mapStateToProps = state => ({
    token:state.auth.token
});
  
export default connect(mapStateToProps)(Category);
const styles = StyleSheet.create({
    center:{
        alignItems:'center',
        height:'50%',
        flex:1,
    },
    image:{
        width:100,
        height:100,
        position:'relative'
    },
    item_center:{
        justifyContent:'center',
        alignItems:'center'
    },
    item_name:{
        color: 'rgba(0,0,0,0.8)',fontSize:12,fontWeight: '400',textTransform:'uppercase'
    },
    flexcenter:{
        flexDirection:'row',
        alignItems:'center'
    },
    flexspace:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    
    wrap:{
        width,
        height
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
    active:{
      color:'#ee4d2d',
    },
    fontbig:{
      fontSize:20,
      fontWeight:'800'
    },
    svg_icon:{
        width: 12,
        fontSize: 12,
        color: '#ee4d2d',
        height: 12,
        fill: 'currentColor',
        position: 'relative'
      },
      svg_icon1:{
        width: 24,
        height: 24,
        color:'#fff',
        stroke:'#fff',
        fill: 'currentColor',
    
      },
      icon_large:{
        width:16,height:16,
        color: '#d0011b',
        fontSize: 12,
        fill: 'currentColor',
        position: 'relative'
      }
  });
