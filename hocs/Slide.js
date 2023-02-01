import React, { useState, useEffect,useRef } from 'react';
import styled from 'styled-components'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Animated,
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

const Flex=styled.View`
flex-direction:row;
`
const {width} = Dimensions.get('window');
const Item=({item,height})=>{
    return(
      <ImageBackground
          resizeMode='stretch'
          source={{uri:item.image}}
          style={{width:width,height:height}}
      />
    )
}

const Slide=(props)=>{
    const {navigation,data,height}=props
    const scrollX= useRef(new Animated.Value(0)).current;
    const [imgActive,setimgActive]=useState(0)
    let position = Animated.divide(scrollX, width)
    const parent=useRef()
    useEffect(()=>{
        const toggle = setInterval(() => {
        const index=imgActive>=data.length-1?0:imgActive+1
        if(parent){
        parent.current.scrollToIndex({index:index})
        }
        setimgActive(imgActive>=data.length-1?0:imgActive+1) 
        
      }, 3000);
  
      return () => clearInterval(toggle);
    })
    const onchange=(nativeEvent)=>{
        if(nativeEvent){
            const slice=Math.round(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width)
            setimgActive(slice)
        }
    }
    return(
        <View style={{width:width,height:height}}>
            <FlatList
                data={data}
                renderItem={({item})=><Item 
                item={item}
                height={height}
                />}
                ref={parent}
                keyExtractor={item => item.id}
                onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false}
                )}
                onScrollBeginDrag={({nativeEvent}) => onchange(nativeEvent)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            />
            
            <View style={styles.wrapdot}>
                {data.map((item,i)=>{
                let opacity = position.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return(
                <Animated.View
                    key={i}
                    style={{ opacity,height: 6, width: 6, backgroundColor:'#ee4d2d', margin: 2, borderRadius: 3 }}
                />)
                })}
            </View>
        </View>
      )
  }

export default Slide
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
  
    wrapdot:{
      position:'absolute',
      flexDirection:'row',
      bottom:8,
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
    
  });
  
