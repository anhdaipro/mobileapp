
import { updateAddressURL,cityListURL } from "../../../urls";
import { updateaddress,editaddress} from "../../../actions/auths";
import axios from 'axios';
import React, {useState, useEffect,useRef,useCallback} from 'react'
import styled from 'styled-components'
import {styles,Container} from "../styles"
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
import { Pressable,ScrollView,View,Text,SafeAreaView,StyleSheet,TextInput,Image,TouchableHighlight } from 'react-native';
import {connect} from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
const Flex=styled.View`
flex-direction:row;
`
const FlexStart=styled(Flex)`
align-items: flex-start;
`
const Flexend=styled.View`
align-items: flex-end;
justify-content:flex-end;
`
const Item=styled.View`
padding:12px 8px;

border-color:rgba(0,0,0,0.1);
border-bottom-width:1px
`
const StylePress=styled.Pressable`
padding:4px;
color:${props=>props.primary?'#ee4d2d':'#757575'};
border: 1px solid ${props=>props.primary?'#ee4d2d':'#757575'}
`
const Dotstyle=styled.View`
height:100%;
width:1px;
background-color:#757575;
margin:0 6px
`
const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
const ListAddress=(props)=>{
    const {navigation,addresses,updateaddress,editaddress}=props
    const [state, setState] = useState({addresses:[],username:null,image:null,address:null});
    const [show,setShow]=useState(false)
    const [loading,setLoading]=useState(false)
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
    useEffect(() => {
        const getJournal = async () => {
            const res=await axios.get(updateAddressURL,headers())
            let data=res.data
            setLoading(true)
            updateaddress(data)
        }
        getJournal();
    }, []);
        
    function createAddress(e){
      const address_null = {address:'',address_choice:'',default:addresses.length==0?true:false,name:'',phone_number:''}
      const type="create"
      editaddress(address_null,type)
      navigation.navigate('Newaddress',{headers:headers})
    }

    function setdefault(e,address){
        const data={action:'default',id:address.id}
        const list_addresses=state.list_addresses.map(item=>{
            if(item.id==address.id){
                return ({...item,default:true})
            }
            else{
                return ({...item,default:false})
            }
        })
        setState({...state,list_addresses:list_addresses})
        axios.post(updateAddressURL,JSON.stringify(data),headers())
        .then(res=>{
        })   
    }

    const setdelete=(e,address)=>{
        setAction(true)
        setState({...state,address:address})
    }

    const deleteAddress=useCallback((address)=>{
        const data={action:'delete',id:address.id}
        const list_addresses=state.list_addresses.filter(item=>item.id!=address.id)
        setState({...state,list_addresses:list_addresses})
        setAction(false)
        axios.post(updateAddressURL,JSON.stringify(data),headers())
        .then(res=>{
        })
    }, [state]);

    


    const setformdata=useCallback((e)=>{
        const address=state.address
        const name=e.target.name
        address[name]=e.target.value
        setState({...state,address:address})
    }, [state]);

   
    const showaddress=(address)=>{
      const type="update"
      editaddress(address,type)
      navigation.navigate('Newaddress',{headers:headers})
    }

    
    const defaultaddress=useCallback(()=>{
        state.address.default=!state.address.default
        setState({...state,address:state.address})
    }, [state]);


    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.item_center}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Địa chỉ</Text>
                </View> 
            </View>
            <View>
                <View style={{padding:8}}>
                    <Text>Địa chỉ</Text>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View>
                        {addresses.map(address=>
                            <Item key={address.id}>
                                <Pressable onPress={()=>showaddress(address)}>
                                    <Flex>
                                        <Text>{address.name}</Text>
                                        <Dotstyle/>
                                        <Text style={styles.textnomal}>(+84) {address.phone_number}</Text>
                                    </Flex>
                                    <View>
                                        <Styletext second>{address.address}</Styletext>
                                    </View>
                                    <View>
                                        <Styletext second>{address.town}, {address.district},{address.city}</Styletext>
                                    </View>
                                    <Flex style={{marginTop:8}}>
                                        <StylePress primary>
                                            <Styletext primary>Mặc định</Styletext>
                                        </StylePress>
                                        <StylePress style={{marginLeft:8}}>
                                            <Styletext second>Địa chỉ lấy hàng</Styletext>
                                        </StylePress>
                                    </Flex>
                                </Pressable>
                            </Item>
                        )}  
                    </View>
                    <View style={{padding:8}}>
                        <Pressable onPress={()=>createAddress()} style={[styles.item_center]}>       
                            <Svg style={[styles.svg_icon2,{marginRight:4}]} data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><G data-name="Layer 1"><Path d="M512 1024A512.2 512.2 0 0 1 312.7 40.2a512.12 512.12 0 0 1 398.6 943.5A507.07 507.07 0 0 1 512 1024zm0-960a447.88 447.88 0 0 0-316.8 764.8A448 448 0 1 0 686.4 99.2 444.4 444.4 0 0 0 512 64z"></Path><Path d="M768 480H544V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64z"></Path></G></Svg>
                            <Text style={styles.textorange}>Thêm địa chỉ mới</Text>   
                        </Pressable>
                    </View>
                </View>
            </View>          
        </Container>       
    )
}

const mapStateToProps = state => ({
    addresses:state.buyer.addresses
});
  
export default connect(mapStateToProps,{updateaddress,editaddress})(ListAddress);
