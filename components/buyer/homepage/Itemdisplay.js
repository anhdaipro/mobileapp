import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image,
    StyleSheet
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  const Itemdisplay=(props)=>{
    const {categories,item,navigation}=props
    return(
        <View style={{width:`${100/(categories.length)}%`}}>
        {
            item.map((category,index)=>
            <TouchableOpacity key={index}
                onPress={() =>navigation.navigate('Category', { slug:category.url })}
                >
                <View style={[styles.center,{padding:4}]}>
                  <Image style={{width:40, height:40}}  source={{uri: category.image}}/>   
                   <View style={{height:32}}>
                       <Text numberOfLines={2} style={styles.textwhite}>{category.name}</Text>
                   </View>
                </View>    
            </TouchableOpacity>
            
            )}             
        </View>
    )
  }
  export default Itemdisplay
  const styles = StyleSheet.create({
    center:{
        alignItems:'center',
        height:'50%',
        flex:1,
    },
  
    flexspace:{
      justifyContent:'space-between'
    },
    
    textorange:{
      color:'#ee4d2d'
    },
    textwhite:{
      color:'#fff',
      fontSize:12,
      textAlign:'center',
      fontWeight:'400'
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
    }
  });