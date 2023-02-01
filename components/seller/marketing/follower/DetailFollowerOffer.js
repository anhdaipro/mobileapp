import axios from 'axios';
import React, {useState,useEffect} from 'react'
import {detailvoucherURL, vouchershopURL} from "../../../../urls"
import {timesubmit,valid_from,valid_to,time_end,timevalue,timepromotion } from '../../../../constants';
import { Pressable,Alert, SafeAreaView,TextInput,Text,TouchableHighlight,View,Dimensions,StyleSheet } from 'react-native';
import styled from "styled-components"
import {URL} from "react-native-url-polyfill"
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
import {connect} from "react-redux"
import { updateitem,updatedate } from '../../../../actions/seller';
import { headers } from '../../../../actions/auths';
const StyledView=styled.View`
padding:12px;
background-color:#fff;
position:relative;
flex-direction:row;
border-color:rgba(0,0,0,0.1);
border-bottom-width:${props=>props.second?0:1}px
`
const StyleBtn=styled.Pressable`
padding:4px 8px;
margin-left:8px;
border:1px solid ${props=>props.active?'#ee4d2d':'rgba(0,0,0,.1)'}
`
const Title=styled.View`
padding:8px 12px
`

const DetailFollowOffer=(props)=>{
    const {route,navigation,token,items_choice,updatedate,updateitem,date,indexchoice}=props
    const { id,code_type } = route.params; 
    const [voucher,setVoucher]=useState({name_of_the_discount_program:'',code_type:'All',code:'',
        discount_type:'1',amount:null,percent:null,
        maximum_usage:null,voucher_type:"Offer",maximum_discount:0,minimum_order_value:null,
        valid_from:valid_from.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
        valid_to:valid_to.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
        setting_display:'Show many'})
    const {name_of_the_discount_program,
        code,
        discount_type,maximum_usage,
        voucher_type,maximum_discount,minimum_order_value,
        setting_display}=voucher
    const [items,setItems]=useState([])
    const [loading,setLoading]=useState(false)
    const [complete,setComplete]=useState(false)

    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (!complete) {
              // If we don't have unsaved changes, then we don't need to do anything
              return;
            }
    
            // Prevent default behavior of leaving the screen
            e.preventDefault();
    
            // Prompt the user before leaving the screen
            Alert.alert(
              'Discard changes?',
              'You have unsaved changes. Are you sure to discard them and leave the screen?',
              [
                { text: "Don't leave", cancelable:true, onPress: () => {} },
                {
                  text: 'Discard',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => {
                    resetoffer()
                    navigation.dispatch(e.data.action)
                  },
                },
              ]
            );
          }),
        [navigation, complete]
      );
    const url_voucher=id?`${detailvoucherURL}/${id}`:vouchershopURL
    useEffect(() => {
        (async () => {
        if(id){
            const res= await axios(url_voucher,headers())
            const data=res.data
            const limit=data.maximum_discount==null?'U':'L'
            setVoucher({...data.voucher,limit:limit,valid_from:timesubmit(data.valid_from),valid_to:timesubmit(data.valid_to)})
            setLoading(true)
            updateitem(data.items_choice)
        }
        else if(voucher_type){
            setVoucher({...voucher,code_type:code_type})
            setLoading(true)
        }
        else{
            setLoading(true)
        }
        })();
    }, [id]);

    useEffect(() => {
        if(date){
            if(indexchoice==0){
                setVoucher({...voucher,valid_from:date})
            }
            else{
                setVoucher({...voucher,valid_to:date})
            }
        }
    }, [date])

    const editdate=(value,index)=>{
        const data={date:value,index:index,show:true}
        updatedate(data)
    }

    const submit= async () =>{
        const datavoucher=voucher
        delete datavoucher.products
        const data={list_items:items_choice.map(item=>{
            return(item.id)
        }),...datavoucher}
        const res =await axios.post(vouchershopURL,JSON.stringify(data),headers())
        navigation.navigate("Listvoucher")
    }

    const list_items=(listitems)=>{
        return listitems.map(item=>{
            if(items_choice.some(product=>product.id==item.id)){
                return({...item,check:true,disable:true})
            }
            return({...item,check:false})
        })
    }

    const additem=()=>{
        setLoading(true)
        if(items.length==0){
            let url= new URL(url_voucher)
            let search_params=url.searchParams
            search_params.set('item','item')
            url.search = search_params.toString();
            let new_url = url.toString();
            axios.get(new_url,headers())
            .then(res=>{
                setItems(list_items(res.data))  
                navigation.navigate("ProductOffer",{items:list_items(res.data)})
            })
        }  
        else{
            setItems(list_items(items))
            navigation.navigate("ProductOffer",{items:list_items(items)})
        }
    }

    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>Chi tiết voucher</Text>
                </View>
            </View>
            {loading?
            <View style={{borderTopWidth:1,borderColor:'rgba(0,0,0,0.1)'}}>
                <StyledView style={styles.item_space}>
                    <Text>Loại voucher</Text>
                    <Pressable style={styles.flexcenter}>
                        <Text>Voucher {voucher.code_type=="1"?'toàn shop':voucher.code_type=="2"?'cho sản phẩm':"live"}</Text>
                        <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                    </Pressable>
                </StyledView>
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space} second>
                        <Text>Tên chương trình</Text>
                        <Text>{name_of_the_discount_program.length}/40</Text>
                    </StyledView>
                    <StyledView>
                        <TextInput onChangeText={(text)=>setVoucher({...voucher,name_of_the_discount_program:text})} value={name_of_the_discount_program} placeholder="Người mua sẽ không nhìn thấy tên chương trình" style={styles.input}/>
                    </StyledView>
                    
                    <StyledView style={styles.item_space}>
                        <View>
                            <Text >Mã giảm giá</Text>
                        </View>
                        <View >
                        <TextInput maxLength={5}  onChangeText={(text)=>setVoucher({...voucher,code:text})} value={code} style={styles.input} placeholder="EB7P Tối đa 5 kí tự"/>
                        </View>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Bắt đầu</Text>
                        <Pressable onPress={()=>editdate(voucher.valid_from,0)} style={styles.flexcenter}>
                            <Text>{timepromotion(voucher.valid_from)}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space} second>
                        <Text>Kết thúc</Text>
                        <Pressable onPress={()=>editdate(voucher.valid_to,0)} style={styles.flexcenter}>
                            <Text>{timepromotion(voucher.valid_to)}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                </View>
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space}>
                        <Text>Loại giảm giá</Text>
                        <Pressable style={styles.flexcenter}>
                            <Text>Chọn loại giảm giá</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Đơn tối thiểu</Text>
                        <View style={styles.flexcenter}>
                            <Text style={{marginRight:2}}>đ</Text>
                            <TextInput keyboardType='numeric' 
                            value={minimum_order_value} 
                            onChangeText={(text)=>setVoucher({...voucher,minimum_order_value:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})} 
                            placeholder="Chọn giá trị tối thiểu của đơn hàng"/>
                        </View>
                    </StyledView>
                    <StyledView style={styles.item_space} second>
                        <Text>Số mã có thể sử dụng</Text>
                        <View>
                            <TextInput keyboardType='numeric'  
                            onChangeText={(text)=>setVoucher({...voucher,maximum_usage:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})} 
                            value={maximum_usage} 
                            placeholder="Tổng số mã giảm giá có thể sử dụng"/>
                        </View>
                    </StyledView>
                </View>
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space} second>
                        <Text>Thiết lập hiển thị của Mã giảm giá</Text>
                        <Pressable style={styles.flexcenter}>
                            <Text>Kết thúc</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space} second>
                        <Text>Áp dụng cho nhóm sản phẩm</Text>
                        <Pressable onPress={additem} style={styles.flexcenter}>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable> 
                    </StyledView>
                </View>
            </View>:null}
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={code&& name_of_the_discount_program?false:true} onPress={submit} style={[styles.btn,{flex:1,backgroundColor:code&& name_of_the_discount_program ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                  <Text style={{color:code&& name_of_the_discount_program ?'#fff':'rgba(0,0,0,.2)'}}>Lưu</Text>
                </Pressable>
            </View>
        </Container>
    )
}

const mapStateToProps = state => ({
    token:state.auth.token,items_choice:state.seller.items_choice,date:state.seller.date,indexchoice:state.seller.indexchoice
});
  
export default connect(mapStateToProps,{updateitem,updatedate})(DetailFollowOffer);

