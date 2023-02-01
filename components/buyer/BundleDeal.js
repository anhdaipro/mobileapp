
import axios from 'axios';
import React, {useState, useEffect,useCallback} from 'react'
import {promotionURL,addToCartURL} from "../../urls"
import {formatter,} from "../../constants"
import { showvariation,headers } from '../../actions/auths';
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
import {connect} from "react-redux"
const HeaderBund=styled.View`
background-color:#fff;
flex-direction:row;
padding:6px 12px;
margin:12px 0
`
const BoxCart=styled.Pressable`
align-items:center;
justify-content:center;
background-color:#ee4d2d;
width:36px;
height:36px;
border-radius:18px
`
const Promotion = (props) => {
    const {token,navigation,route,showvariation}=props
    const { id } = route.params // <-- access id match param here
    const [state, setState] = useState({loading:false,products:[],combo_type:'1'});
    const [variation, setVariation] = useState({color_id:0,size_id:0,variation_color:[],variation_size:[]})
    const [show,setShow]=useState(true)
    const [loading,setLoading]=useState(false)
    const [errow, setErrow] = useState(false);
    const [warring, setWarring] = useState(false);
    const [cartitem,setCartitem]=useState()
  
    useEffect(() => {
      (async () => {
            const res=await axios(promotionURL+id,headers())
            let data=res.data
            setLoading(true)
            setState(data)
        })();
    }, [id]);

    const setshow = useCallback((es) => {
        setShow(es);
      }, [show]);
    
    const seterrow=useCallback((err)=>{
        setErrow(err);
      }, [errow]);

    const setwarring=useCallback((war)=>{
        setWarring(war);
      }, [warring]);
    
    const openvariation=(item)=>{
        if(item.count_variation==0){
            const data={item_id:item.id,quantity:1}
            axios.post(addToCartURL,JSON.stringify(data),headers())
            .then(res=>{
                setCartitem(res.data)
            })
        }
        else{
            setShow(true)
            const data={type:'variation',colors:item.colors,url:addToCartURL,quantity:1,sizes:item.sizes,variation:variation,product:item,show:true}
            showvariation(data)

        }
    }
        
    return(
        <>
            
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.item_center}>
                        <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                            <Svg  viewBox="0 0 22 17" style={[styles.icon_back,{marginRight:8}]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </TouchableHighlight>
                        <Text style={styles.fontbig}>Combo khuyến mãi</Text>
                    </View> 
                </View>
                <View className="bundle-deal__wrapper">
                {loading?
                <View className="bundle-deal">
                    <HeaderBund>
                        <Svg height="16" viewBox="0 0 55 26" width="16"><G fill="#ffcbbb" fillRule="evenodd"><Circle cx="11" cy="11" r="11"></Circle><Circle cx="22" cy="18" opacity=".608639" r="8"></Circle><Circle cx="49.5" cy="10.5" opacity=".608639" r="5.5"></Circle></G></Svg>
                        
                        <Text className="bundle-deal__title-container">
                            <Text className="bundle-deal__title">Mua </Text>
                            <Text className="bundle-deal__title">{state.quantity_to_reduced} </Text>
                            <Text className="bundle-deal__title">{state.combo_type=='3'?'chỉ với':'& giảm'} </Text>
                            <Text className="bundle-deal__title">{state.combo_type=='1'?`${state.discount_percent}%`:state.combo_type=='2'?`₫${formatter.format(state.discount_price)}`:`₫${formatter.format(state.price_special_sale)}`}</Text>
                        </Text>
                        
                    </HeaderBund>
                    <ScrollView 
                        showsHorizontalScrollIndicator={false}
                       
                        pagingEnabled
                        contentContainerStyle={{
                            padding:2,
                            flexDirection:'row',
                            flexWrap: 'wrap',
                        }}
                        >
                            {state.products.map(data=>
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
                                        <View style={[styles.item_space,{padding:3}]}>
                                            <View>
                                                <View>
                                                    <Text style={styles.textorange}>{data.min_price==data.max_price?`₫${formatter(data.min_price)}`:`₫${formatter(data.min_price)} - ₫${formatter(data.max_price)}`}</Text>
                                                </View>
                                                <View style={styles.flexcenter}>
                                                    <Text style={[styles.textorange,styles.fontsmall]}>₫</Text>
                                                    <Text style={styles.textorange}>{formatter((data.max_price+data.min_price)/2)}</Text>
                                                    <Text> - </Text>
                                                    <Text style={[styles.textorange,styles.fontsmall]}>₫</Text>
                                                    <Text style={styles.textorange}>{formatter((data.max_price+data.min_price)/2)}</Text>
                                                </View> 
                                            </View>
                                            <View class="gqkpDM">
                                                <BoxCart onPress={()=>openvariation(data)}>
                                                    <Svg style={{height:16,width:16}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" class="YuNphE"><Path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 2.49878H2.14326L3.99234 11.833C4.06191 12.1842 4.37002 12.4372 4.72804 12.4372H12.8281C13.167 12.4372 13.4638 12.2099 13.5522 11.8827L15.5194 4.59456C15.5802 4.36921 15.5327 4.1284 15.3908 3.94309C15.2488 3.75778 15.0287 3.64911 14.7953 3.64911H3.90029L3.49496 1.60304L3.37526 0.998779H2.75926H0.5V2.49878ZM5.34404 10.9372L4.19743 5.14911H13.816L12.2537 10.9372H5.34404ZM4.46721 15.0001C4.91991 15.0001 5.28689 14.6293 5.28689 14.1719C5.28689 13.7145 4.91991 13.3437 4.46721 13.3437C4.01451 13.3437 3.64752 13.7145 3.64752 14.1719C3.64752 14.6293 4.01451 15.0001 4.46721 15.0001ZM12.651 15.0001C13.1037 15.0001 13.4707 14.6293 13.4707 14.1719C13.4707 13.7145 13.1037 13.3437 12.651 13.3437C12.1983 13.3437 11.8313 13.7145 11.8313 14.1719C11.8313 14.6293 12.1983 15.0001 12.651 15.0001Z" fill="white"></Path></Svg>
                                                </BoxCart>  
                                            </View>
                                        </View>
                                    </View>
                                </View>  
                            </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>:null}
                </View>
            </View>
        </>
    )
}
const mapStateToProps = state => ({
  token:state.auth.token
});
  
export default connect(mapStateToProps,{showvariation})(Promotion);

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