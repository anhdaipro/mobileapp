import {StyleSheet,SafeAreaView,Text,View,Pressable} from "react-native"
import styled from "styled-components"
export const Container=styled.SafeAreaView`
flex:1;
`
export const Flexrow=styled.View`
flex-direction:row
`
export const Flexcenter=styled(Flexrow)`
align-items:center
`

export const PressAdjust=styled.Pressable`
align-items: center;
justify-content: center;
border:1px solid rgba(0,0,0,.09);
width:24px;
height:24px;
`
export const ViewInput=styled.TextInput`
width:40px;
height:24px;
border: 1px solid rgba(0,0,0,.09);
border-left-width: 0;
border-right-width: 0;
text-align:center
`
export const Styletext=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:12px
`
export const Inputinner=styled(Flexcenter)`
border:1px solid rgba(0,0,0,0.1);
height:28px;
padding:4px;
width:88px
`
export const Styletext1=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:10px
`
export const Styletext2=styled.Text`
color:${props=>props.primary?'#ee4d2d':props.second?'#757575':'#fff'};
font-size:14px
`
export const StyleBtn=styled.Pressable`
align-items:center;
justify-content:center;
height:40px;
border:1px solid ${props=>props.primary?'#ee4d2d':'#757575'};
`
export const Iconcontent=styled.View`
align-items: center;
background-color:#fff;
width:32px;
height:32px;
border-radius:16px;
justify-content: center;
`
export const StyleSucces=styled.View`
align-items: center;
z-index:100;
top:50%;
border-radius:8px;
position:absolute;
width:50%;
justify-content: center;
padding:16px 20px;
background-color:rgba(0,0,0,0.6)
`
export const Btnorange=styled.Pressable`
align-items:center;
justify-content:center;
height:40px;
background-color: #ee4d2d;
border:1px solid #ee4d2d
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
    elevation:{
      elevation: 10,
    },
    dropdown:{
    position:'absolute',
    right:0,
    top:40,
    zIndex:100,
    elevation: 5,
    backgroundColor:'#fff',
    padding:8,
    width:120,
    },
    icon_back:{
      width: 20,
      height: 20,
      color:'#ee4d2d',
      fill: 'currentColor',
      position: 'relative'
    },
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
    flexrow:{
        flexDirection:'row',
    },
    item_space:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
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
    },
    svg_icon_success:{
      width: 16,
      fontSize: 16,
      height: 16,
      color:'rgba(0,0,0,0.5)',
      fill: 'currentColor',
      position: 'relative'
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
    textnomal:{
      color:'#333'
    },
    textsecond:{
      color:'#757575'
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
    image:{
      height: 80,
      width: 80,
      position: 'relative', 
  },
    icon:{
        stroke: 'currentColor',
        fill: 'currentColor',
        height: 60,
        width: 60,
        color: '#ee4d2d'
    },

})