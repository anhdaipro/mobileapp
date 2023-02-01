import React, { useState, useEffect ,useRef} from 'react';
import { headers } from '../../actions/auths';
import { ItemRecommend, categoryURL, listcategoryURL,topsearchURL,imagehomeURL } from '../../urls';
import { formatter,partition } from '../../constants';
import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Easing,
  SafeAreaView,
  Animated,
  StyleSheet
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
import styled from "styled-components"
import Category from './homepage/Category';
import FlashsaleList from './homepage/FlashsaleList';
import {connect} from "react-redux"
import Slide from '../../hocs/Slide';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';
import Item from './homepage/Item';
import Itemdisplay from './homepage/Itemdisplay';
const {width} = Dimensions.get('window');
const height = width*0.6;
const int=2
const widthcate=width*3.5
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
const Styletext1=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:10px
`
const Styledview=styled.View`
background-color:#fff;
padding:8px 8px;
height:40px;
width:90%;
margin-top:-4px
`
const list_display=[
  {name:'Shopee food',image:'https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi'},
  {name:'Săn thưởng 100K xu',image:'https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi'},
  {name:'Khung giờ săn sale',image:'https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi'},
  {name:'Gì Cũng Rẻ - Mua Là Freeship',image:'https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi'},
  {name:'Flash Sale',image:'https://cf.shopee.vn/file/93acaac785c19b09180b01cc34a4c17e_xhdpi'},
  {name:'Thứ 4 Freeship - x4 Ưu Đãi',image:'https://cf.shopee.vn/file/a8d76bca057ba0b117dcf8e1ef068d16_xhdpi'},
  {name:'Bắt Trend - Giá Sốc',image:'https://cf.shopee.vn/file/1975fb1af4ae3c22878d04f6f440b6f9_xhdpi'},
  {name:'Hoàn Xu Xtra Từ 100K',image:'https://cf.shopee.vn/file/21a4856d1fecd4eda143748661315dba_xhdpi'},
  {name:'Hàng Hiệu Giá Tốt',image:'https://cf.shopee.vn/file/8d6d5ee795e7675fed39d31ba04c3b92_xhdpi'},
  {name:'Hàng Quốc Tế',image:'https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi'},
  {name:'Hoàn Xu Xtra Từ 100K',image:'https://cf.shopee.vn/file/21a4856d1fecd4eda143748661315dba_xhdpi'},
  {name:'Hàng Hiệu Giá Tốt',image:'https://cf.shopee.vn/file/8d6d5ee795e7675fed39d31ba04c3b92_xhdpi'},
  {name:'Hàng Quốc Tế',image:'https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi'},
  {name:'Hoàn Xu Xtra Từ 100K',image:'https://cf.shopee.vn/file/21a4856d1fecd4eda143748661315dba_xhdpi'},
  {name:'Hàng Hiệu Giá Tốt',image:'https://cf.shopee.vn/file/8d6d5ee795e7675fed39d31ba04c3b92_xhdpi'},
  {name:'Hàng Quốc Tế',image:'https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi'},
  {name:'Nạp thẻ & Dịch vụ',image:'https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi'}
]
const Homebuyer =({ navigation,user,count_message_unseen })=>{
  const [products, setProducts] = useState([]);
  //get called on screen loads
  const [loading,setLoading]=useState(false)
  const [token,setToken]=useState()
  useEffect(()=>{
  (async()=>{
    const token=await AsyncStorage.getItem('token')
    setToken(token)
  })()
  },[])
  console.log(token)
  const [loadmore,setLoadmore]=useState(false)
  const [imagehome,setImagehome]=useState([])
  const [categories,setCategories]=useState([])
  const [items,setItems]=useState([])
  const [listitem,setListitem]=useState([])
  const [count,setCount]=useState(190)
  const [background,setBackground]=useState('transparent')
  const [color,setColor]=useState({color:'#fff',background:'#fff'})
 useEffect(() => {
  (async () => {
    try {
      const [obj1,obj2]= await axios.all([
       axios.get(imagehomeURL,headers()),
       axios.get(listcategoryURL,headers()),
     ])
     setImagehome(obj1.data)
     setLoading(true)
     setCategories(partition(obj2.data, int).map(subarray => subarray));
     setItems(partition(list_display, int).map(subarray => subarray));
   } catch (error) {
     console.error(error);
   } 
  })()
 }, []);
 
 
 useEffect(()=>{
  (async () => {
      try {
      const res = await axios.get(topsearchURL,headers())
      setListitem(res.data.item_top_search.slice(0,9))
        } catch (error) {
          console.log(error);
        }
      })();
  },[])
  useEffect(() => {
  (async () => {
    try {
     const response = await axios.get(ItemRecommend,headers());
     setProducts(response.data);
     setLoadmore(true)
   } catch (error) {
     console.error(error);
   } 
  })()
 }, []);
  const setbackground=(nativeEvent)=>{
    console.log(nativeEvent)
    if(nativeEvent){
      if(nativeEvent.contentOffset.y>200){
        setBackground('#fff')
        setColor({background:'rgba(0,0,0,0.1)',color:'#ee4d2d'})
      }
      else{
      setBackground('transparent')
      setColor({color:'#fff',background:'#fff'})
      }
    }
  }
  const isCloseToBottom = async ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }
  const LoadMoreData= async () =>{
    if(products.length<count && loadmore){
      setLoadmore(false)
      const res = await axios.get(ItemRecommend,headers())
      setLoadmore(true)
      setProducts(prev=>[...prev,...res.data])
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading?<>
      <Navbar
      background={background}
      color={color}
      navigation={navigation}
      />
      <ScrollView
        onScroll={({nativeEvent})=>{setbackground(nativeEvent)
          if (isCloseToBottom(nativeEvent)) {
            LoadMoreData()
            console.log(isCloseToBottom(nativeEvent))
          }
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:72}}
      >
        <View style={{position:'relative',backgroundColor:'#008080',justifyContent:'center',alignItems:'center'}}>
          <Slide 
            height={height}
            data={imagehome}/>
          <Styledview style={[styles.item_center]}>
            <View style={{paddingRight:8}}>
              <Svg style={styles.svg_icon2} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                <G><Path d="M990,484.3"/><Path d="M953.4,521.9H31.9c-12.1,0-21.9-9.8-21.9-21.9c0-12.1,9.8-21.9,21.9-21.9h921.5c12.1,0,21.9,9.8,21.9,21.9C975.4,512.1,965.6,521.9,953.4,521.9z M865.7,236.7c0-88.4-21.3-109.7-109.7-109.7h-87.8V83.1h131.6c60.6,0,109.7,49.1,109.7,109.7v131.6h-43.9V236.7L865.7,236.7z M119.7,236.7v87.8H75.8V192.8c0-60.6,49.1-109.7,109.7-109.7h131.6V127h-87.8C142.1,127,119.7,148.3,119.7,236.7z M119.7,763.3c0,87.1,22.6,109.7,109.7,109.7h87.8v43.9H185.5c-60.6,0-109.7-49.1-109.7-109.7V675.5h43.9L119.7,763.3L119.7,763.3z M865.7,763.3v-87.8h43.9v131.6c0,60.6-49.1,109.7-109.7,109.7H668.2V873H756C844.4,873,865.7,850.4,865.7,763.3z"/></G>
              </Svg>
            </View>
            <View style={{flex:1,borderLeftWidth:0.6,borderColor:'rgba(0,0,0,0.1)',paddingLeft:8}}>
              <View style={[styles.flexcenter,{lineHeight:18}]}>
                <Svg style={[styles.svg_icon,{marginRight:4}]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 244.948 244.948" enableBackground="new 0 0 244.948 244.948" xmlSpace="preserve">
                  <G>
                    <Path fill="#ee4d2d" d="M122.474,0C54.948,0,0.008,54.951,0.008,122.477s54.94,122.471,122.466,122.471    S244.94,189.997,244.94,122.471S190,0,122.474,0z M122.474,222.213c-55.005,0-99.752-44.742-99.752-99.742    c0-55.011,44.747-99.752,99.752-99.752s99.752,44.742,99.752,99.752C222.221,177.477,177.479,222.213,122.474,222.213z"/>
                    <G>
                      <Path fill="#ee4d2d" d="M113.739,180.659c-6.092-0.228-11.438-0.881-16.023-1.958c-4.596-1.093-8.175-2.35-10.742-3.758     l6.255-18.324c1.92,1.175,4.618,2.295,8.088,3.361c3.47,1.061,7.615,1.822,12.423,2.252v-32.547     c-3.312-1.485-6.598-3.144-9.856-4.966c-3.258-1.817-6.168-3.998-8.735-6.57c-2.567-2.562-4.629-5.624-6.173-9.208     c-1.545-3.584-2.322-7.821-2.322-12.744c0-9.192,2.431-16.323,7.294-21.403c4.857-5.069,11.46-8.354,19.793-9.85V50.344h16.671     v13.951c4.699,0.31,8.817,0.946,12.341,1.909c3.525,0.946,6.783,2.067,9.774,3.329l-5.771,17.672     c-1.817-0.848-4.112-1.702-6.891-2.562c-2.779-0.848-5.929-1.485-9.459-1.92v30.122c3.312,1.501,6.652,3.182,10.019,5.047     c3.361,1.882,6.353,4.096,8.974,6.652c2.616,2.578,4.754,5.586,6.413,9.067c1.653,3.481,2.486,7.604,2.486,12.417     c0,9.839-2.486,17.497-7.457,23.002c-4.966,5.504-11.776,9.045-20.429,10.644v14.914h-16.671L113.739,180.659L113.739,180.659z      M107.484,94.341c0,3.225,1.251,5.918,3.764,8.055c2.513,2.148,5.64,4.15,9.382,5.978v-26.14c-5.026,0.228-8.48,1.458-10.34,3.72     C108.42,88.205,107.484,91.006,107.484,94.341z M137.459,148.274c0-3.389-1.36-6.162-4.085-8.316     c-2.725-2.159-6.01-4.145-9.861-5.945v28.218c4.705-0.538,8.202-2.012,10.503-4.438     C136.311,155.361,137.459,152.19,137.459,148.274z"/>
                    </G>
                  </G>
                </Svg>
                <Text>Ví shopee pay</Text>
              </View>
              <Styletext1 second>Voucher giảm đến 40K</Styletext1>
            </View>
            <View style={{flex:1,borderLeftWidth:0.6,borderColor:'rgba(0,0,0,0.1)',paddingLeft:8}}>
              <View style={[styles.flexcenter,{lineHeight:18}]}>
                <Svg style={[styles.svg_icon,{marginRight:4}]} fill="none" viewBox="0 0 18 18"><Path stroke="#FFA600" stroke-width="1.3" d="M17.35 9A8.35 8.35 0 11.65 9a8.35 8.35 0 0116.7 0z"></Path><Path fill="#FFA600" fill-rule="evenodd" stroke="#FFA600" stroke-width=".2" d="M6.86 4.723c-.683.576-.998 1.627-.75 2.464.215.725.85 1.258 1.522 1.608.37.193.77.355 1.177.463.1.027.2.051.3.08.098.03.196.062.294.096.06.021.121.044.182.067.017.006.107.041.04.014-.07-.028.071.03.087.037.286.124.56.27.82.44.114.076.045.024.151.111a2.942 2.942 0 01.322.303c.087.093.046.042.114.146.18.275.245.478.235.8-.01.328-.14.659-.325.867-.47.53-1.232.73-1.934.696a4.727 4.727 0 01-1.487-.307c-.45-.182-.852-.462-1.242-.737-.25-.176-.643-.04-.788.197-.17.279-.044.574.207.75.753.532 1.539.946 2.474 1.098.885.144 1.731.124 2.563-.224.78-.326 1.416-.966 1.607-1.772.198-.838-.023-1.644-.61-2.29-.683-.753-1.722-1.17-2.706-1.43a4.563 4.563 0 01-.543-.183c.122.048-.044-.02-.078-.035a4.77 4.77 0 01-.422-.212c-.594-.338-.955-.722-.872-1.369.105-.816.757-1.221 1.555-1.28.808-.06 1.648.135 2.297.554.614.398 1.19-.553.58-.947-1.33-.86-3.504-1.074-4.77-.005z" clip-rule="evenodd"></Path></Svg>
                <Text>300 Xu</Text>
                
              </View>
              <Styletext1 second>Đổi xu lấy mã giảm giá</Styletext1>
            </View>
          </Styledview>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{width:width*items.length/4.5,paddingLeft:8,marginTop:8,flexDirection:'row',paddingBottom:8,paddingTop:12}}
          >
            {items.map((item,i)=>
            <Itemdisplay
                key={i}
                item={item}
                navigation={navigation}
                categories={items}
            />
            )}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{backgroundColor:'#fff',width:widthcate,marginTop:8,flexDirection:'row'}}
          >
          {
            categories.map((item,i)=>
              <Category
                key={i}
                item={item}
                navigation={navigation}
                categories={categories}
              />
            )}
          </ScrollView>
        
        </View>
        <FlashsaleList
          navigation={navigation}
        />
        <View style={{backgroundColor:'#fff',marginTop:8}}>
          <View style={[styles.flexspace,{padding:8,paddingBottom:0}]}>
            <View>
              <Text style={[styles.textorange,{textTransform:'uppercase',fontSize:16}]}>Tim kiem hang dau</Text>
            </View>
            <View style={[styles.flexcenter,{color:'#ee4d2d'}]}>
              <Styletext second>Xem thêm</Styletext>
              <Svg style={[styles.svg_icon,{marginLeft:4}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
            </View>
          </View>
        
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{backgroundColor:'#fff',width:width*listitem.length/2.5,paddingLeft:8,marginTop:8,flexDirection:'row',paddingBottom:8}}
          >
        
            {listitem.map((item,i)=>
            <Pressable onPress={() => Alert.alert('View Clicked...')} key={item.id} style={{paddingRight:8,width:`${100/(listitem.length)}%`}}>
              <View style={[{borderColor:'#e6e6e3',borderWidth:1,flex:1},styles.center]} key={item.id}>
                {i<8?<>
                <View style={{height:120,width:'100%'}}>
                  <Image style={{width:'100%',height:'100%',resizeMode:'contain'}} source={{uri:item.image}}/>
                </View>
                <View style={{backgroundColor:'#fff4ff',width:'100%',padding:4}}>
                  <Text
                  numberOfLines={2}
                  style={{
                        color: '#ee4d2d',
                        fontWeight: 'bold',
                    }}>{item.name}</Text>
                  <Text style={{marginTop:12}}>{item.number_order}</Text>
                </View></>:<View style={styles.center}>
                  <View style={[styles.center,{width:40,height:40,flex:0,
                  borderWidth: 1,borderColor: "#d0011b",borderRadius: 50,marginBottom:8}]}>
                    <Svg style={styles.icon_large} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                  </View>
                  <Text>Xem them</Text>
                </View>}
              </View>
            </Pressable>
            )}
          </ScrollView>
        </View>
        <View>
        <ScrollView 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
            padding:2,
            flexDirection:'row',
            flexWrap: 'wrap',
          }}>
            {products.map((data,i) => (
              <Item
                i={i}
                data={data}
                navigation={navigation}
              />
            ))}
          </ScrollView>
          {!loadmore?<View style={styles.center}>
            <Text style={styles.textorange}>Đang tải</Text>
          </View>:null}
        </View>
     </ScrollView></>
     :null}
     
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  token: state.auth.token,user:state.auth.user,
});

export default connect(mapStateToProps)(Homebuyer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    
  },
  flexspace:{
    display:'flex',
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  center:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  item_center:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  wrap:{
    width,
    height
  },
  item_name:{
    fontSize: 12,
    color: '#333',
    marginTop:8,
    minHeight:40,
    fontWeight: '600',},

  search:{
    backgroundColor:'#fff',
    padding:8,
    paddingTop:8,
    paddingBottom:8,
    flexDirection:'row',
    borderRadius:4,
  },
  count_unread:{
    position:'absolute',
    top:-6,
    right:-4,
    width:16,
    height:16,
    zIndex:100,
    borderRadius:8,
    backgroundColor:'#ee4d2d',
    borderColor:'#fff',
    borderWidth:1
  },
  cart_number:{
    position:'absolute',
    top:-6,
    right:-6,
    zIndex:100,
    width:24,
    height:16,
    backgroundColor:'#ee4d2d',
    borderRadius:8,
    borderColor:'#fff',
    borderWidth:1
  },
  searchwrap:{
    position:'absolute',
    top:0,
    minHeight:76,
    flexDirection:'row',
    elevation:10,
    paddingBottom:4,
    zIndex:1,
    left:0,
    alignItems:'flex-end',
    right:0
  },
  flexcenter:{
    flexDirection:'row',
    alignItems:'center'
  },

  wrapdot:{
    position:'absolute',
    flexDirection:'row',
    bottom:0,
    alignSelf:'center'
  },
  textorange:{
    color:'#ee4d2d'
  },
  textwhite:{
    color:'#fff'
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
  dot:{
    margin:3,
    color:'#fff'
  },
  dotActive:{
    color:'#ee4d2d',
    margin:3,
  },
  
  bottom:{
    position:'absolute',
    backgroundColor:'#fff',
    bottom:0,
    left:0,
    right:0
  },
  svg_icon:{
    width: 12,
    fontSize: 12,
    color: '#757575',
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
  svg_icon2:{
    width: 20,
    height: 20,
    color:'#757575',
    fill: 'currentColor',
  },
  icon_large:{
    width:16,
    height:16,
    color: '#d0011b',
    fontSize: 12,
    fill: 'currentColor',
    position: 'relative'
  }
});


