
import { formatter,itemvariation } from "../../../../constants"
import { updateitem } from "../../../../actions/seller"
import {styles,StyleBtn,Styletext} from "../styles"
import styled from "styled-components"
import { Pressable, SafeAreaView,TextInput,Text,ImageBackground,Alert,
    TouchableHighlight,View,Dimensions,StyleSheet } from 'react-native';
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
import { headers } from '../../../../actions/auths';
const StyledView=styled.View`
padding:8px
`
const StyleBtn1=styled.Pressable`
align-items:center;
justify-content:center;
padding:0 4px;
height:24px;
border:1px solid ${props=>props.primary?'#ee4d2d':'#757575'};
`
const StyledView1=styled.View`
flex:1;
position:relative
`
const StyleText=styled.Text`
color:${props=>props.primary?'#fff':'#757575'};
font-size:12px`
const Contentinput=styled.View`
padding:4px 8px;
border:1px solid rgba(0,0,0,0.1)
`
const VariationGift=(props)=>{
    const {route,navigation,token,updateitem,gifts}=props
    const {itemchoice} =route.params
    const [limit,setLimit]=useState()
    const [discount,setDiscount]=useState()
    const  setvariation=(vachoice,name,value)=>{
        const variations= itemchoice.variation.map(item=>{
            if(item.id==vachoice.id){
                return({...item,[name]:value})
            }
            return({...item})
        })
        const products=gifts.map(item=>{
            if(item.id===itemchoice.id){
                return({...item,variations:variations})
            }
            return({...item,})
        })
        
        updateitem({products:products,product_type:'gift'})
    }

    const setdiscount=()=>{
        const products=gifts.map(item=>{
            if(item.id===itemchoice.id){
                return({...item,variations:item.variations.map(variation=>{
                    return({...variation,promotion_price:discount})
                })})
            }
            return({...item,})
        })
        updateitem({products:products,product_type:'gift'})
    }
    const Variation=({item})=>{
        return(
            <View style={styles.flexcenter}>
                <StyledView1>
                    <Text>{itemvariation(item)}</Text>
                </StyledView1>
                <StyledView1>
                    <Text>{formatter(item.price)}</Text>
                </StyledView1>
                <StyledView1>
                    <Contentinput>
                        <Text style={{marginRight:4}}>đ</Text>
                        <TextInput keyboardType='numeric'  
                            onChangeText={(text)=>setvariation(item,'promotion_price',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))} 
                            value={item.promotion_price?item.promotion_price.toString():''}    
                        />
                    </Contentinput>
                </StyledView1>
            </View>
        )
    }
    return(
        <SafeAreaView>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Chỉnh sửa phân loại</Text>
                </View>
            </View>
            {loading?
            <View style={{borderTopWidth:1,borderColor:'rgba(0,0,0,0.1)'}}>
                <View style={styles.item_space}>
                    <View>
                        <Text>Giới hạn đặt hàng</Text>
                    </View>
                    <View>
                        <TextInput keyboardType='numeric' 
                        maxLength={7}
                        value={limit?limit.toString():''}
                        onChangeText={(text)=>setLimit(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))} 
                        style={styles.input}/>
                    </View>
                </View>
                <View style={[styles.item_space,{marginTop:8}]}>
                    <View>
                        <Text>Giá khuyến mãi</Text>
                    </View>
                    <View>
                        <TextInput keyboardType='numeric' 
                        maxLength={7}
                        value={discount?discount.toString():''}
                        onChangeText={(text)=>setDiscount(text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))} 
                        style={styles.input}/>
                    </View>
                    <StyleBtn1 disabled={discount?false:true} active={discount?true:false} onPress={setdiscount}>
                        <Styletext primary={discount?true:false}>Áp dụng</Styletext>
                    </StyleBtn1>
                </View>
                <View>
                    <StyledView>
                        <StyledView1>
                            <Text>Phân loại hàng</Text>
                        </StyledView1>
                        <StyledView1>
                            <Text>Giá gốc</Text>
                        </StyledView1>
                        <StyledView1>
                            <Text>Khuyến mãi</Text>
                        </StyledView1>  
                    </StyledView>
                    <View>
                        <FlatList
                            data={itemchoice.variations}
                            renderItem={({item})=><Variation/>}
                            keyExtractor={item=>item.variation_id}
                        />
                    </View>
                </View>
            </View>:null}
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    token:state.auth.token,gifts:state.seller.gifts
});
  
export default connect(mapStateToProps,{updateitem})(VariationGift);
