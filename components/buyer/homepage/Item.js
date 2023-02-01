import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,Image } from "react-native";
import { formatter } from "../../../constants";

const Item=(props)=>{
    const {i,data,navigation}=props
    return(
        <TouchableOpacity key={i}
            onPress={() =>
            navigation.navigate('Product', { productID: data.id })}
            style={{width: '50%',padding:3, }}>
            <View key={data.id} style={{backgroundColor:'#fff'}}>
                <View
                    style={{
                      width: '100%',height: 160,
                      backgroundColor: '#757575',
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
                            <Text style={styles.textwhite}>Yêu thích</Text>
                        </View>
                        <Image source={{uri: data.image}} style={styles.image} /> 
                    </View>
                    <View style={{padding:8}}>
                        <Text numberOfLines={2}style={styles.item_name}>{data.name}</Text>
                        <View style={[styles.flexcenter,{justifyContent: 'space-between',padding:3}]}>
                            <View style={styles.flexcenter}>
                                <Text style={[styles.textorange,styles.fontsmall]}>₫</Text>
                                <Text style={styles.textorange}>{formatter((data.max_price+data.min_price)/2)}</Text>
                        </View>
                        <Text style={styles.fontsmallest}>đã bán {data.number_order}</Text>
                    </View>
                </View>
            </View>  
        </TouchableOpacity>
    )
}
export default Item
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
    flexcenter:{
    flexDirection:'row',
    alignItems:'center'
    },
    image:{
        width: '100%', height: '100%'
    },
    item_name:{
      fontSize: 12,
      color: '#333',
      marginTop:8,
      minHeight:40,
      fontWeight: '600',},
  
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
    }
    ,
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