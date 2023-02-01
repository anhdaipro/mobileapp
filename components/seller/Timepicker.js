import { useState,useEffect,useMemo } from "react"
import { styles } from "./marketing/styles"
import { updatedate,setshow } from "../../actions/seller";
import {connect} from "react-redux"
import { ImageBackground, Pressable,Text,TouchableHighlight,Modal,TouchableWithoutFeedback,
    View,SafeAreaView,Image,Dimensions,StyleSheet } from "react-native"
import styled from "styled-components"
import { updateprofile } from "../../actions/auths";
import ScrollPicker from "../../hocs/Picker";
import dayjs from "dayjs";
const BoxItem=styled.Pressable`
    padding:8px;
    flex-direction:row;
    align-items:center;
    justify-content:space-between
    `
const StyleModalContent=styled.View`
    width:100%
    `
const Scrollbar=styled.View`
    margin:4px;
    flex:1;
    flex-direction:row;
    position:relative
    `
const Timelist=styled.View`
    margin:0
    `
const {width} = Dimensions.get('window');
const height = width*0.6;
const list_month=Array(12).fill().map((_, i)=>i+1)
const list_date=Array(31).fill().map((_, i)=>i+1)
const list_minutes=Array(60).fill().map((_, i)=>i)
const list_hour=Array(24).fill().map((_, i)=>i)
const Timepicker=(props)=>{
    const {datechoice,show,setshow,updatedate}=props
    const [state,setState]=useState({})
    const [formData,setformData]=useState({month:1,year:2020,date:1,hour:1,minute:1})
    useEffect(() => {
        const datepicker={date:dayjs(datechoice).date(),month:dayjs(datechoice).month()+1,year:dayjs(datechoice).year(),hour:dayjs(datechoice).hour(),minute:dayjs(datechoice).minute()}
        setformData(prev=>{return{...prev,...datepicker}})
    }, [show])
    const {date,month,year,hour,minute}=formData
    
    console.log(date)
    console.log(datechoice)
    const year_now=dayjs().year()
    const list_year=Array(year_now+5).fill().map((_, i) => i).filter(item=>item>year_now-50)
    const indexyear=list_year.findIndex(item=>item===year)
    const complete=()=>{
        updatedate({date:dayjs(`${year}-${('0'+month).slice(-2)}-${('0'+date).slice(-2)} ${('0'+hour).slice(-2)}:${('0'+minute).slice(-2)}`),show:false})
    }
    useEffect(() => {
        if(dayjs(year,month,date)=="Invalid Date"){  
            setState({...state,valid_date:true}) 
        }
        else{
            setState({...state,valid_date:false})
        }
    }, [year,month,date])
    const setdate=(name,value)=>{
        setformData({...formData,[name]:value})
        console.log(value)
    }
    return(
        <Modal animationType='slide' onRequestClose={()=>setshow(false)} visible={show} transparent>
            <TouchableWithoutFeedback onPress={(event) => event.target == event.currentTarget && setshow(false)}>
                <View style={styles.modal}>
                    <View style={styles.modal_content}>
                        <View>
                            <View style={[styles.item_space,{padding:8}]}>
                                <Pressable onPress={()=>setshow(false)}>
                                    <Text>Thoát</Text>
                                </Pressable>
                                <Pressable onPress={complete}>
                                    <Text style={styles.textorange}>Xác nhận</Text>
                                </Pressable>
                            </View>
                            <View style={[{padding:12,borderColor:'rgba(0,0,0,0.1)',borderTopWidth:1},styles.flexcenter]}>  
                                <Scrollbar>
                                    <ScrollPicker
                                        dataSource={Array(31).fill().map((_, i)=>i+1)}   
                                        renderItem={(data, index, isSelected) => <Pressable onPress={()=>setdate('date',data)}>
                                        <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{('0'+data).slice(-2)}</Text>
                                        </Pressable>}
                                        selectedIndex={formData.date-1}
                                        itemHeight={40}
                                        style={{marginRight:4}}
                                        wrapperHeight={200}
                                        wrapperColor={'#ffffff'}
                                        highlightColor={'#d8d8d8'}
                                        onValueChange={(data, selectedIndex) => {
                                        setdate('date',data)
                                        }} 
                                    />
                                </Scrollbar>
                                <Scrollbar>
                                    <ScrollPicker
                                        dataSource={Array(12).fill().map((_, i)=>i+1)}   
                                        renderItem={(data, index, isSelected) => <Pressable>
                                            <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{('0'+data).slice(-2)}</Text>
                                        </Pressable>}
                                        selectedIndex={formData.month-1}
                                        itemHeight={40}
                                        wrapperHeight={200}
                                        wrapperColor={'#ffffff'}
                                        highlightColor={'#d8d8d8'}
                                        onValueChange={(data, selectedIndex) => {
                                        setdate('month',data)
                                        }} 
                                    />
                                </Scrollbar>
                                
                                <Scrollbar>
                                    <ScrollPicker
                                        dataSource={list_year}   
                                        renderItem={(data, index, isSelected) => <Pressable>
                                            <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{data}</Text>
                                        </Pressable>}
                                        selectedIndex={indexyear}
                                        itemHeight={40}
                                        wrapperHeight={200}
                                        wrapperColor={'#ffffff'}
                                        highlightColor={'#d8d8d8'}
                                        onValueChange={(data, selectedIndex) => {
                                        setdate('year',data)
                                        }} 
                                    />  
                                </Scrollbar>
                                <Scrollbar>
                                    <ScrollPicker
                                        dataSource={Array(24).fill().map((_, i)=>i)}     
                                        renderItem={(data, index, isSelected) => <Pressable>
                                            <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{('0'+data).slice(-2)}</Text>
                                        </Pressable>}
                                        selectedIndex={hour}
                                        itemHeight={40}
                                        wrapperHeight={200}
                                        wrapperColor={'#ffffff'}
                                        highlightColor={'#d8d8d8'}
                                        onValueChange={(data, selectedIndex) => {
                                        setdate('hour',selectedIndex)
                                        }} 
                                    />  
                                </Scrollbar>
                                <Scrollbar>
                                    <ScrollPicker
                                        dataSource={Array(60).fill().map((_, i)=>i)}   
                                        renderItem={(data, index, isSelected) => <Pressable>
                                            <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{('0'+data).slice(-2)}</Text>
                                        </Pressable>}
                                        selectedIndex={minute}
                                        itemHeight={40}
                                        wrapperHeight={200}
                                        wrapperColor={'#ffffff'}
                                        highlightColor={'#d8d8d8'}
                                        onValueChange={(data, selectedIndex) => {
                                        setdate('minute',selectedIndex)
                                        }} 
                                    />  
                                </Scrollbar>
                            </View>
                        </View>  
                    </View>
                </View>
            </TouchableWithoutFeedback>
      </Modal>
    )
}
const mapStateToProps = state => ({
    token:state.auth.token,datechoice:state.seller.date,show:state.seller.show
  }); 
export default connect(mapStateToProps,{updatedate,setshow})(Timepicker);
