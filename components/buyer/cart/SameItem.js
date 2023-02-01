
import { listorderURL,itemrecentlyURL,savevoucherURL,cartURL, updatecartURL } from '../../../urls';
import { formatter } from '../../../constants';
import React, { useState, useEffect,useRef } from 'react';
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
const SameItem=(props)=>{
    const [products,setProducts]=useState([])
    const [product,setProduct]=useState()
    const {route,navigation,token }=props
    const {productID} = route.params;
    const headers={'headers':token?{ Authorization:`JWT ${token}`,'Content-Type': 'application/json' }:{'Content-Type': 'application/json'}}
    useEffect(() => {
        (async ()=>{
            try{
            const res = await axios.get(`${updatecartURL}?item_id=${productID}`,headers())
            setProduct(res.data)
            setProducts(res.data.list_item)
            }
            catch(e){
                console.log(e)
            }
        })()
    }, [productID])
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.item_center}>
                    <TouchableHighlight onPress={()=>navigation.goBack()}>
                    <Svg  viewBox="0 0 22 17" style={[styles.icon_back,{marginRight:8}]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Đăng nhập</Text>
                </View> 
            </View>
            <View style={{backgroundColor:'#fff'}}>
                <View style={{padding:8}}>
                    <View>
                        <View><Text>fffff</Text></View>
                        <View>
                            <View><Text></Text></View>
                            <View>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[{position:'relative',height:60},styles.item_center]}>
                <View style={{backgroundColor:'#ee4d2d',zIndex: 1,padding:8,justifyContent:'center',borderRadius:4}}>
                <Text style={{color:'#fff'}}>Sản phẩm tương tự</Text>
                </View>
                
                <View style={{position:'absolute',top:'50%',borderTopColor:'#757575',borderStyle:'dotted',width:'100%',height:0,left:0,
                borderTopWidth:1}}></View>
            </View>
            <View>
                <ScrollView 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        padding:2,
                        flexDirection:'row',
                        flexWrap: 'wrap',
                    }}>
                    {products.map((data) => (
                        <TouchableOpacity key={data.id}
                            onPress={() =>
                            navigation.navigate('Product', { productID: data.id })}
                            style={{width: '50%',padding:4, }}>
                            <View key={data.id} style={{backgroundColor:'#fff'}}>
                                <View
                                style={{
                                    width: '100%',
                                    height: 160,
                                    backgroundColor: 'gray',
                                    position: 'relative',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                        
                                <View style={styles.flag}>
                                    <View style={styles.flagBottom}/>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#ee4d2d',
                                        fontWeight: 'bold',
                                        letterSpacing: 1,
                                    }}>{data.percent_discount}%</Text>
                                    <Text style={styles.textwhite}>GIẢM</Text>
                                </View>
                                <View style={styles.shoptypewrap}>
                                    <View style={styles.flagLeft}/>
                                        <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#fff',
                                        }}>Yêu thích
                                        </Text>
                                    </View>
                                    <Image source={{uri: data.image}}
                                    style={{width: '100%', height: '100%'}} />
                                
                                </View>
                                <View style={{padding:8}}>
                                    <Text numberOfLines={2}
                                        style={{
                                        fontSize: 12,
                                        color: '#333',
                                        marginTop:8,
                                        minHeight:40,
                                        fontWeight: '600',
                                        }}>
                                    {data.name}</Text>
                                    <View style={[styles.flexcenter,styles.flexspace,{alignItems: 'center'},{padding:3}]}>
                                        <View style={styles.flexcenter}>
                                            <Text style={[styles.textorange,styles.fontsmall]}>₫</Text>
                                            <Text style={styles.textorange}>{formatter((data.max_price+data.min_price)/2)}</Text>
                                        </View>
                                        <Text style={styles.fontsmallest}>đã bán {data.number_order}</Text>
                                    </View>
                                </View>
                            </View>  
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
  )
}
const mapStateToProps = state => ({
    token:state.auth.token
});
  
export default connect(mapStateToProps)(SameItem);


const styles = StyleSheet.create({
  container: {
    flex: 1
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
    minHeight:48,
    elevation: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    shadowColor: '#52006A',
  },
  icon_back:{
    width: 20,
    height: 20,
    color:'#ee4d2d',
    fill: 'currentColor',
    position: 'relative'
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
    height:40
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
    fontWeight:'500',
    color:'#333'
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
  icon:{
  stroke: 'currentColor',
    fill: 'currentColor',
    height: 60,
    width: 60,
    color: '#ee4d2d'
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

  
 
})