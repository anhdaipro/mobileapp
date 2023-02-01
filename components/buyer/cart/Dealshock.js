import axios from 'axios';
import React, {useState, useEffect,useRef} from 'react'
import { showvariation,headers} from '../../../actions/auths';
import {localhost,threadlURL,dealURL,addToCartBatchURL,updatecartURL, byproductdealURL,} from "../../../urls"
import {formatter,itemvariation} from "../../../constants"
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
import { Pressable,ScrollView,View,Text,SafeAreaView,StyleSheet,TouchableHighlight } from 'react-native';
import {connect} from "react-redux"
import Itemdeal from './Itemdeal';
import LoadingDots from '../../../hocs/Loading';
const StyleDot=styled.View`
height: 32px;
padding-left: 20px;
margin-top:12px;
background-color: #fff7ec;
color: rgba(0,0,0,.54);
justify-content:center;
border-bottom: 1px solid #f3f3f3;
`
const StyleLoading=styled.View`
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
`
const Dealshock = (props) => {
    const {route,navigation,showvariation,data,type}=props
    const { id } = route.params; // <-- access id match param here
    const { deal_id } =route.params;
    const [state, setState] = useState({loading:false,items:[]});
    const [items,setItems]=useState([])
    const [loading, setLoading] = useState(false)
    const [cart_id,setCart_id]=useState()
    const [count,setCount]=useState(0)
   
    useEffect(() => {
        (async()=>{
            const obj1=await axios.get(`${dealURL}/${deal_id}/${id}`,headers())
            const byproductcart=obj1.data.byproducts.map(item=>{
                return({...item,check:true,byproduct_id:item.id})
            })
            setLoading(true)
            setItems([...items,obj1.data.variation_choice,...byproductcart])
            setState({...state,loading:true,cartitem_id:obj1.data.cartitem_id})
            setCart_id(obj1.data.cartitem_id)
            const url= obj1.data.cartitem_id?axios.get(`${byproductdealURL}/${deal_id}?cart_id=${obj1.data.cartitem_id}`,headers()):axios.get(`${byproductdealURL}/${deal_id}`,headers())
            const obj2=await url
            const byproductdeal=obj2.data.byproducts.map(item=>{
                return({...item,check:false,item_id:item.id,quantity:1,size_value:'',color_value:''})
            })
            setItems(current =>[...current,...byproductdeal])
            setCount(obj2.data.count)
        })()
    }, [deal_id,id]);

    
    useEffect(()=>{
      if(type && data){
        updateitem(data.item,data.color_id,data.size_id)
      }
    },[type,data])
    const updateitem=(itemchoice,color_id,size_id)=>{
        let url=new URL(addToCartBatchURL)
        let search_params=url.searchParams
        search_params.set('item_id',itemchoice.item_id)
        if(color_id){
            search_params.set('color_id',color_id)
        }
        if(size_id){
            search_params.set('size_id',size_id)
        }
        url.search = search_params.toString();
        let new_url = url.toString();
        axios.get(new_url,headers())
        .then(res=>{
            const listitem=items.map(item=>{
                if(item.item_id==itemchoice.item_id){
                    return({...item,...res.data,check:true})
                }
                return({...item})
            })  
            setItems(listitem)
        }) 
    }
    
    const setlistitem=(itemchoice,name,value)=>{
        const list_item=items.map(item=>{
            if(item.item_id==itemchoice.item_id){
                return {...item,[name]:value}
            }
            else{
                return{...item}
            }
        })
        setItems(list_item)
    }
    
    const addtocartbatch=(e)=>{
        
        const main_product=items.find(item=>item.main)
        const byproducts=items.filter(item=>!item.main &&item.product_id).map(item=>{
            return({byproduct_id:item.byproduct_id,quantity:item.quantity!=''?item.quantity:1,check:item.check,
            product_id:item.product_id,item_id:item.item_id})
        })
        const data={cartitem_id:cart_id,deal_id:deal_id,action:'edit',
        product_id:main_product.product_id,quantity:main_product.quantity!=''?main_product.quantity:1,
        byproducts:byproducts,item_id:main_product.item_id}
        
        axios.post(addToCartBatchURL,JSON.stringify(data),headers())
        .then(resp => {
            
        })
    }
    const valid=items.find(item=>item.check && !item.main)
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.item_center}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <Svg  viewBox="0 0 22 17" style={[styles.icon_back,{marginRight:8}]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Mua thêm deal shock</Text>
                </View> 
            </View>
            {loading?<>
            <View>
                <ScrollView
               
                
                >
                    {items.map((item,i)=>{
                        if(item.main){
                        return(<Itemdeal
                            item={item}
                            navigation={navigation}
                            key={item.id}
                           
                            setlistitem={(item,name,value)=>setlistitem(item,name,value)}
                        />)
                        }
                    }  
                )}
                </ScrollView>
                <StyleDot><Text>Tận hưởng nhiều ưu đãi hơn khi Mua thêm deal sốc</Text></StyleDot>
                <ScrollView>
                    {items.map((item,i)=>{
                    if(!item.main){
                    return(<Itemdeal
                        item={item}
                        key={item.id}
                        navigation={navigation}
                        setlistitem={(item,name,value)=>setlistitem(item,name,value)}
                        />)
                        }
                        }
                    )}
                </ScrollView>
            </View>
            <View style={styles.fotter}>
                <View style={[{flex:1},styles.item_center]}><Text>Đã chọn {items.filter(item=>item.check && !item.main).length}/{items.filter(item=>!item.main).length}</Text></View>
                <Pressable disabled={valid?false:true} style={[{flex:1},styles.btn]} onPress={e=>addtocartbatch(e)}><Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>OK</Text></Pressable>
            </View>          
            </>:
            <StyleLoading>
                <LoadingDots/>
            </StyleLoading>}
          
        </SafeAreaView>   
    )
}
const mapStateToProps = state => ({
    data:state.buyer.data,type:state.buyer.type
});
  
export default connect(mapStateToProps,{showvariation})(Dealshock);


const styles = StyleSheet.create({
    container: {
      flex: 1,
     
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
      minHeight:74,
      paddingBottom:8,
      elevation: 10,
      flexDirection:'row',
      alignItems:'flex-end',
      justifyContent:'space-between',
      backgroundColor:'#fff',
      shadowColor: '#515751',
      
    },
    icon_back:{
      width: 20,
      height: 20,
      color:'#ee4d2d',
      fill: 'currentColor',
      position: 'relative'
    },
    image:{
        height: 80,
        width: 80,
        position: 'relative', 
    },
    fotter:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        shadowColor: '#515751',
        elevation:10,
        flexDirection:'row',
        backgroundColor:'#fff'
    }
    ,
    icon_check:{
        position: 'absolute',
        height: 5,
        width: 9,
        borderColor:'#fff',
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        transform: [{ rotate: "-45deg" }],
        left: 4,top: 5
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
      padding:4,
      height:40,
      backgroundColor:'#ee4d2d'
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
      color:'#757575'
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
    price_old:{
        color:'rgba(0,0,0,.1)',
        textDecorationStyle:'line-through',
    },
    price_curent:{
    color:'#ee4d2d',
    fontWeight:'500'
    },
    icon:{
    stroke: 'currentColor',
      fill: 'currentColor',
      height: 60,
      width: 60,
      color: '#ee4d2d'
    },
    
   
  })
