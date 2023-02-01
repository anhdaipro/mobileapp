import axios from 'axios';
import React, {useState,useEffect} from 'react'
import {detailvoucherURL, vouchershopURL} from "../../../../urls"
import {timesubmit,valid_from,valid_to,time_end,timevalue,timepromotion } from '../../../../constants';
import { Pressable, SafeAreaView,TextInput,Text,TouchableHighlight,View,Alert,
    Dimensions,StyleSheet, Modal } from 'react-native';
import styled from "styled-components"
import {URL} from "react-native-url-polyfill"
import {styles,Container, Styletext,PressAdjust,ViewInput, Inputinner,Iconcontent,StyleSucces} from "../styles"
import dayjs from "dayjs";
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
import { updateitem,updatedate, resetoffer } from '../../../../actions/seller';

const StyledView=styled.View`
padding:12px;
background-color:#fff;
position:relative;
flex-direction:row;
border-color:rgba(0,0,0,0.1);
border-bottom-width:${props=>props.second?0:1}px
`
const StyleBtn1=styled.Pressable`
padding:4px 8px;
margin-right:8px;
border:1px solid ${props=>props.active?'#ee4d2d':'rgba(0,0,0,.1)'}
`
const StyleInput=styled.View`
padding:2px 4px;
width:100%;
border:1px solid rgba(0,0,0,.2);
`
const Styletext1=styled.Text`
color:${props=>props.primary?'#ee4d2d':'#757575'};
font-size:12px
`

const now=new Date()
const date_valid_from=new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours()+1,0)
const date_valid_to=new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours()+2,0)
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const list_discount_type=[
    {value:'2',name:'Mức giảm'},
    {value:'1',name:'Theo %'},
    {value:'3',name:'Hoàn xu'}]
    
const Detailvoucher=(props)=>{
    const {route,navigation,token,items_choice,updatedate,updateitem,date,indexchoice,resetoffer}=props
    const { id,code_type,headers} = route.params; 
    const [show,setShow]=useState(false)
    const [index,setIndex]=useState(0)
    const [voucher,setVoucher]=useState(()=>{return{name_of_the_discount_program:'',code_type:'All',code:'',
        discount_type:'1',amount:null,percent:null,
        maximum_usage:null,voucher_type:"Offer",maximum_discount:0,minimum_order_value:null,
        valid_from:dayjs(date_valid_from).format("YYYY-MM-DD HH:mm"),
        valid_to:dayjs(date_valid_to).format("YYYY-MM-DD HH:mm"),
        setting_display:'Show many'}})
    const {name_of_the_discount_program,
        code,amount,percent,
        discount_type,maximum_usage,
        voucher_type,maximum_discount,minimum_order_value,
        setting_display}=voucher
    const [items,setItems]=useState([])
    const [loading,setLoading]=useState(false)
    const [state,setState]=useState({complete:false,time:3})
    const [complete,setComplete]=useState(false)
    
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (complete) {
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

    const list_items=(listitems)=>{
        return listitems.map(item=>{
            if(items_choice.some(product=>product.id==item.id)){
                return({...item,check:true,disabled:true})
            }
            return({...item,check:false})
        })
    }
  
    const url_voucher=id?`${detailvoucherURL}/${id}`:vouchershopURL
    useEffect(() => {
        (async () => {
        if(id){
            const res= await axios(url_voucher,headers())
            const data=res.data
            const limit=data.maximum_discount==null?'U':'L'
            setVoucher({...voucher,...data.voucher,limit:limit,valid_from:dayjs(data.valid_from).format("YYYY-MM-DD HH:mm"),valid_to:dayjs(data.valid_to).format("YYYY-MM-DD HH:mm")})
            setLoading(true)
            updateitem(data.products)
        }
        else if(voucher_type){
            setVoucher({...voucher,code_type:code_type})
            setLoading(true)
        }
        })();
    }, [id,voucher_type]);




    useEffect(() => {
        if(date){
            if(index==0){
                setVoucher({...voucher,valid_from:date})
            }
            else{
                setVoucher({...voucher,valid_to:date})
            }
        }
    }, [date])

    const editdate=(value,indexchoice)=>{
        setIndex(indexchoice)
        updatedate({show:true,date:indexchoice==0?voucher.valid_from:voucher.valid_to})
    }
    let timeSecond=3
    const submit= async () =>{
        const datavoucher=voucher
        delete datavoucher.products
        const data={list_items:items_choice.map(item=>{
            return(item.id)
        }),...datavoucher}
        const res =await axios.post(url_voucher,JSON.stringify(data),headers())
        setState(prev=>{return{...prev,complete:true}})
        setShow(true)
        setComplete(true)
        const countDown=setInterval(timers,1000)
        function timers(){
          if(timeSecond==0){
            clearInterval(countDown)
            setShow(false)
            navigation.navigate("Listvoucher")
            setState(prev=>{return{...prev,complete:false}})
          }
          else{
            timeSecond--;
          }
        }
        
    }

    const additem=()=>{
        if(items_choice.length==0){
            if(items.length==0){
                let url= new URL(url_voucher)
                let search_params=url.searchParams
                search_params.set('item','item')
                url.search = search_params.toString();
                let new_url = url.toString();
                axios.get(new_url,headers())
                .then(res=>{
                    setItems(list_items(res.data))  
                    navigation.navigate("ProductOffer",{items:list_items(res.data),product_type:'product'})
                })
            }  
            else{
                setItems(list_items(items))
                navigation.navigate("ProductOffer",{items:list_items(items),product_type:'product'})
            }
        }
        else{
            navigation.navigate("Productvoucher",{items:list_items(items)})
        }
    }
    const setformdata=(name,value)=>{
        setVoucher({...voucher,[name]:value})
    }
    const setdatevalid=(data)=>{
        if(index==0){
            setVoucher({...voucher,valid_from:data})
        }
        else{
            setVoucher({...voucher,valid_to:data})
        }
    }

    return(
        <Container>
            <View style={styles.header}>
                <View style={styles.flexcenter}>
                    <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                        <View style={{marginRight:8,padding:4}}>
                            <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" stroke-width="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.fontbig}>{id?"Chỉnh sửa":"Tạo"} Voucher {voucher.code_type=='1'?"toàn shop":'sản phẩm'}</Text>
                </View>
            </View>
            {loading?
            <View style={{borderTopWidth:1,borderColor:'rgba(0,0,0,0.1)'}}>
                <View>
                    <StyledView style={styles.item_space} second>
                        <Text>Tên chương trình(không hiển thị với người mua)</Text>
                        <Text>{name_of_the_discount_program.length}/40</Text>
                    </StyledView>
                    <StyledView>
                        <StyleInput>
                            <TextInput 
                            onChangeText={(text)=>setVoucher({...voucher,name_of_the_discount_program:text})} 
                            value={name_of_the_discount_program} 
                            maxLength={40}
                            placeholder="Người mua sẽ không nhìn thấy tên chương trình" 
                            style={styles.input}/>
                        </StyleInput>
                    </StyledView>
                </View>
                {code_type && code_type=="2"?
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space} second>
                        <Text>Áp dụng cho nhóm sản phẩm</Text>
                        <Pressable onPress={additem} style={styles.flexcenter}>
                            <Text>{items_choice.length>0?`${items_choice.length} đã chọn`:'Chọn sản phẩm'}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable> 
                    </StyledView>
                </View>:null}
                {id?
                <StyledView style={[{marginTop:8,},styles.item_space]}>
                    <View style={styles.flexcenter} second>
                        <Text>người mua mục tiêu</Text>
                        <Pressable onPress={additem} style={styles.flexcenter}>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable> 
                    </View>
                    <Text>Tất cả mục tiêu</Text>
                </StyledView>:null}
                
                <View style={{marginTop:8}}>
                    <StyledView>
                        <Text>Thiết lập mã giảm giá</Text>
                    </StyledView>
                    <StyledView second> 
                        {list_discount_type.map(item=>
                            <StyleBtn1 onPress={()=>setVoucher({...voucher,discount_type:item.value})} key={item.value} active={item.value==discount_type?true:false}>
                                <Styletext1 primary={item.value==discount_type?true:false}>{item.name}</Styletext1>
                            </StyleBtn1>
                        )}
                    </StyledView>
                    <StyledView second>
                        <View style={[styles.item_space,{width:'100%',backgroundColor:'#eaffff',padding:4}]}>
                            <View style={[styles.flexcenter,{flex:1,marginRight:4,position:'relative'}]}>
                                <Svg style={[styles.svg_icon,{marginRight:4}]} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 95.3 122.88" enableBackground="new 0 0 95.3 122.88" fillRule="evenodd" clipRule="evenodd" xmlSpace="preserve"><G><Path class="st0" d="M0.91,73.04h93.37c1.47-1.96,1.25-3.97,0-6L59.64,22.9H37.03L0.91,67.03C-0.1,69.08-0.5,71.1,0.91,73.04 L0.91,73.04z M45.38,97.3c0-1.25,1.02-2.27,2.27-2.27c1.25,0,2.27,1.02,2.27,2.27v23.32c0,1.25-1.02,2.27-2.27,2.27 c-1.25,0-2.27-1.02-2.27-2.27V97.3L45.38,97.3z M65.66,93.83c-0.91-0.85-0.97-2.27-0.12-3.19c0.85-0.91,2.27-0.97,3.19-0.12 l17.98,16.63c0.91,0.85,0.97,2.27,0.12,3.19c-0.85,0.91-2.28,0.97-3.19,0.12L65.66,93.83L65.66,93.83z M27.15,90.47 c0.94-0.82,2.37-0.73,3.19,0.21c0.82,0.94,0.73,2.37-0.21,3.19L12.15,109.6c-0.94,0.82-2.37,0.73-3.19-0.21 c-0.82-0.94-0.73-2.37,0.21-3.19L27.15,90.47L27.15,90.47z M45.09,0h5.13v8.9c4.88,1.17,8.53,5.58,8.53,10.8v0.72h-22.2v-0.72 c0-5.22,3.66-9.63,8.54-10.8V0L45.09,0z M47.82,88.58L47.82,88.58c5.99,0,10.9-4.9,10.9-10.9v-0.7H36.92v0.7 C36.92,83.68,41.82,88.58,47.82,88.58L47.82,88.58z"/></G></Svg>
                                <Text numberOfLines={2} style={{flex:1}}>Sử dụng mức giảm giá được đề xuất để tăng doanh số bán hàng</Text>
                            </View>
                            <View style={{marginRight:0,position:'relative'}}>
                            <StyleBtn1 style={{marginRight:0}} active>
                                <Text style={styles.textorange}>Dùng ngay</Text>
                            </StyleBtn1>
                            </View>
                           
                        </View>

                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>{list_discount_type.find(item=>item.value==discount_type).name}</Text>
                        <Inputinner>
                            {discount_type==='2'?
                            <Text style={{marginRight:4}}>đ</Text>:null}
                            <TextInput keyboardType='numeric' 
                            style={{flex:1,textAlign:'center'}}
                            maxLength={2}
                            value={discount_type!=='2'?percent:amount} 
                            onChangeText={(text)=>setformdata(discount_type!=='2'?'percent':'amount',text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''))} 
                            placeholder=""/>
                            {discount_type!=='2'?
                            <Text style={{marginLeft:4}}>%{discount_type==='1'?'Giảm':''}</Text>:null}
                        </Inputinner>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Đơn tối thiểu</Text>
                        <View style={styles.flexcenter}>
                            <Text style={{marginRight:2}}>đ</Text>
                            <TextInput keyboardType='numeric' 
                            value={minimum_order_value} 
                            maxLength={10}
                            onChangeText={(text)=>setVoucher({...voucher,minimum_order_value:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})} 
                            placeholder="Chọn giá trị tối thiểu của đơn hàng"/>
                        </View>
                    </StyledView>
                    <StyledView style={styles.item_space} second>
                        <Text>Số mã có thể sử dụng</Text>
                        <View style={{flexDirection:'row'}}>
                            <PressAdjust onPress={e=>setVoucher({...voucher,maximum_usage:parseInt(maximum_usage)-1})} disabled={maximum_usage && maximum_usage>1?false:true}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:maximum_usage && maximum_usage>1?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></Polygon></Svg>
                            </PressAdjust>
                            <ViewInput 
                                keyboardType='numeric'
                                maxLength={3}
                                value={maximum_usage?maximum_usage.toString():''}
                                onChangeText={(text)=>setVoucher({...voucher ,maximum_usage:text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '')})}
                                style={{color:'#ee4d2d',textAlign:'center'}}
                            />
                            
                            <PressAdjust disabled={maximum_usage?false:true} onPress={()=>setVoucher({...voucher,maximum_usage:parseInt(maximum_usage)+1})}>
                                <Svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x="0" y="0" style={[styles.svg_icon,{color:maximum_usage?'#757575':'rgba(0,0,0,.09)'}]}><Polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></Polygon></Svg>
                            </PressAdjust>
                        </View>
                    </StyledView>
                </View>
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space}>
                        <Text>Thiết lập thời gian và hiển thị</Text>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Bắt đầu</Text>
                        <Pressable onPress={()=>editdate(voucher.valid_from,0)} style={styles.flexcenter}>
                            <Text>{dayjs(voucher.valid_from).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space}>
                        <Text>Kết thúc</Text>
                        <Pressable onPress={()=>editdate(voucher.valid_to,1)} style={styles.flexcenter}>
                            <Text>{dayjs(voucher.valid_to).format("DD-MM-YYYY HH:mm")}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                    <StyledView style={styles.item_space} second>
                        <Text>Thiết lập hiển thị</Text>
                        <Pressable onPress={()=>editdate(voucher.valid_to,1)} style={styles.flexcenter}>
                            <Text>{setting_display}</Text>
                            <Svg style={[styles.svg_icon,{marginLeft:4,color:'#ee4d2d'}]} enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"><Path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></Path></Svg>
                        </Pressable>
                    </StyledView>
                </View>
                
                <View style={{marginTop:8}}>
                    <StyledView style={styles.item_space}>
                        <View>
                            <Text >Mã giảm giá</Text>
                        </View>
                        <View >
                            <TextInput maxLength={5}  onChangeText={(text)=>setVoucher({...voucher,code:text})} value={code} style={styles.input} placeholder="EB7P Tối đa 5 kí tự"/>
                        </View>
                    </StyledView>
                </View>     
            </View>:null}
            <View style={[styles.fotter,{padding:8}]}>
                <StyleBtn1 active disabled={code&& name_of_the_discount_program?false:true} style={[styles.btn,{flex:1}]}>
                  <Text style={{color:'#ee4d2d'}}>Xem trước</Text>
                </StyleBtn1>
                <Pressable disabled={code&& name_of_the_discount_program?false:true} onPress={submit} style={[styles.btn,{flex:1,backgroundColor:code&& name_of_the_discount_program ?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                  <Text style={{color:code&& name_of_the_discount_program ?'#fff':'rgba(0,0,0,.2)'}}>{id?"Lưu":"Xác nhận"}</Text>
                </Pressable>
            </View>
            <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
                <View style={styles.modal}>
                    {state.complete?
                    <StyleSucces>
                        <View style={styles.center}>
                            <Iconcontent>
                                <Svg style={styles.svg_icon_success} enableBackground="new 0 0 12 12" viewBox="0 0 12 12" x="0" y="0"><G><Path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></Path></G></Svg>
                            </Iconcontent>
                            <View style={{marginTop:8}}>
                                <Styletext>Đã tạo thành công</Styletext>
                            </View>
                        </View>
                    </StyleSucces>:null}
                </View>
            </Modal>
        </Container>
    )
}

const mapStateToProps = state => ({
    token:state.auth.token,items_choice:state.seller.items_choice,date:state.seller.date,indexchoice:state.seller.indexchoice
});
  
export default connect(mapStateToProps,{updateitem,updatedate,resetoffer})(Detailvoucher);

