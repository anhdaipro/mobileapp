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
const Category=(props)=>{
  const {categories,item,navigation}=props
  return(
      <View style={{height:280,width:`${100/(categories.length)}%`}}>
      {
          item.map((category,index)=>
          <TouchableOpacity key={index}
          onPress={() =>navigation.navigate('Category', { slug:category.url })}
          
          style={styles.center}
          >
                <View>
                <Image style={{width:100, height:100}}  source={{uri: category.image}}/>   
                 
                  
                 <View >
                     <Text>{category.title}</Text>
                 </View>
              </View>    
          </TouchableOpacity>
          
          )}             
      </View>
  )
}
export default Category
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
  }
});