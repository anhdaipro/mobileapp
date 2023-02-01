import {StyleSheet,SafeAreaView,Text,View} from "react-native"
import styled from "styled-components"
export const Container=styled.SafeAreaView`
flex:1;
background-color:${props=>props.primary?"#fff":'transparent'}
`
export const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
export const Styletext1=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:10px
`
export const Styletext2=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:14px
`
export const styles = StyleSheet.create({
    modal:{
      flex:1 , 
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignItems:'center',
      justifyContent:'center'
    },
    modal_content:{
      width:'80%',
      backgroundColor:'#fff',
      elevation:10
    },
    avatar:{
      width:80,
      height:80
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
      alignItems:'center',
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
    center:{
        alignItems:'center',
        justifyContent:'center'
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
      width: 12,
      fontSize: 12,
      height: 12,
      color:'#757575',
      fill: 'currentColor',
      position: 'relative'
    },
    svg_icon1:{
      width: 14,
      height: 14,
      color:'#757575',
      fill: 'currentColor',
      position: 'relative'
    },
    svg_icon2:{
        width: 16,
        height: 16,
        color:'#757575',
        fill: 'currentColor',
        position: 'relative'
    },
    svg_icon3:{
        width: 20,
        height: 20,
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
    link:{
        color: '#2673dd',
        fontSize:14
    },
    input: {
        width:'100%'
    },
    itemText:{
        color:'#999',
    },
    itemTextSelected:{
        color:'#333',
        fontWeight:"500"
    },
    icon:{
        stroke: 'currentColor',
        fill: 'currentColor',
        height: 60,
        width: 60,
        color: '#ee4d2d'
    },
})
