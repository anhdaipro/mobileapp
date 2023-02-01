

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
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import React, { useState, useEffect } from 'react';
export const list_rating_category_bab=['Product quality','Seller service','Shipping service']
export const formatter=(number)=>{
  const str =number.toString()
 	return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
export const listaction=[{value:1,action:"Chỉnh sửa"},{value:2,action:"Chi tiết"},
{value:3,action:"Đơn hàng"},{value:4,action:"Sao chép"},{value:5,action:"Xóa"}]
export const list_review_text_star=[
  [
      'Chất lượng sản phẩm rất kém',
      'Đóng gói sản phẩm rất kém',
      'Shop phục vụ rất kém',
      'Rất không đáng tiền',
      'Thời gian giao hàng rất chậm'
  ],
  [
      'Chất lượng sản phẩm kém',
      'Đóng gói sản phẩm kém',
      'Shop phục vụ kém',
      'Không đáng tiền',
      'Thời gian giao hàng chậm'
      ],
  [
      'Chất lượng sản phẩm tạm được',
      'Đóng gói sản phẩm tạm được',
      'Shop phục vụ tạm được',
      'Giá cả chấp nhận được',
      'Thời gian giao hàng tạm được'
      ],
  [
      'Chất lượng sản phẩm tốt',
      'Đóng gói sản phẩm chắc chắn',
      'Shop phục vụ khá tốt',
      'Đáng đồng tiền',
      'Thời gian giao hàng nhanh'
      ],
  [
      'Chất lượng sản phẩm tuyệt vời',
      'Đóng gói sản phẩm rất đẹp và chắc chắn',
      'Shop phục vụ rất tốt',
      'Rất đáng tiền',
      'Thời gian giao hàng rất nhanh'
      ]
  ]
export  const time_end=new Date()
time_end.setMonth(new Date().getMonth()+6)
export const valid_from=new Date()
valid_from.setHours(new Date().getHours()+1)
valid_from.setMinutes(0)
export const valid_to=new Date()
valid_to.setHours(new Date().getHours()+2)
valid_to.setMinutes(0)

export const regExp = /^[a-zA-Z@.]+$/;
export function validatEemail(email)
{
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(email)) {
      return false;
  }
  return true;
}

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}

const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
export const generateString=(length)=>{
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export const list_review_choice=(number)=>{
  const list_review_choice=[]
  list_review_choice.push({name:'All',value:'true',keys:'review'})
  for(let i=number;i>0;i--){
    list_review_choice.push({name:`${i} Sao`,value:i,keys:'review_rating'})
  }
  list_review_choice.push({name:'Có Bình Luận',value:'comment',keys:'comment'},{name:'Có Hình Ảnh / Video',value:'media',keys:'media'})
  return list_review_choice
}
export function TaoSoNgauNhien(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
export function hidestring(username){
  let string=''
  for(let m=1;m<username.length-1;m++){
  string+='*'
  }
  return string
}
export const listchoice=[
{name:"Đang diễn ra",value:'current'},
{name:'Sắp diễn ra',value:"upcoming"},
{name:'Đã kêt thúc',value:"finished"}
]
export const limit_choice=[{value:false,name:'Unlimit'},{value:true,name:"Limit"}]
export const itemvariation=(data)=>{
  let item_variation=''
  if (data.color_value!='' && data.color_value!='' && data.size_value!=''){
      item_variation=data.color_value+','+data.size_value
      }
  else if(data.color_value!='' && data.size_value==''){
      item_variation=data.color_value
      }
  else if(data.color_value=='' && data.size_value!=''){
      item_variation=data.size_value
  }
  return item_variation
}
export const rating_choice=[5,4,3,2,1]
export const arraymove = (arr, fromIndex, toIndex) =>{
  const items=[...arr]
  var element = items[fromIndex];
  items.splice(fromIndex, 1);
  items.splice(toIndex, 0, element);
  return items
}
export const timeformat=(data)=>{
  return  ("0" + new Date(data).getDate()).slice(-2) + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" +
  new Date(data).getFullYear()
}
export const timevalue=(data)=>{
  return new Date(data).getFullYear() + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" + ("0" + new Date(data).getDate()).slice(-2)
}
export const safe_div=(x,y)=>{
  return y==0?x:x/y
}

export const timesubmit=(data)=>{
  return new Date(data).getFullYear() + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" + ("0" + new Date(data).getDate()).slice(-2)+ " " + ("0" + new Date(data).getHours()).slice(-2) + ":" + ("0" + new Date(data).getMinutes()).slice(-2)
}
export const timecreate=(data)=>{
  return ("0" + new Date(data).getDate()).slice(-2) + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" +
  new Date(data).getFullYear() + " " + ("0" + new Date(data).getHours()).slice(-2) + ":" + ("0" + new Date(data).getMinutes()).slice(-2)
}
export const timeago=(value)=>{
  const totalseconds=(new Date().getTime()-new Date(value).getTime())/1000
  let time=Math.round(totalseconds)+'s'
  if(totalseconds>60 && totalseconds<60*60){
    time=Math.round(totalseconds/60) +'m'
  }
  if(totalseconds>=60*60 && totalseconds<60*60*24){
    time=Math.round(totalseconds/3600) +'h'
  }
  else if(totalseconds>=60*60*24 && totalseconds<60*60*24*30){
    time=Math.round(totalseconds/(60*60*24)) +'d'
  }
  else if(totalseconds>=60*60*24*30 && totalseconds<60*60*24*30*12){
    time=Math.round(totalseconds/(60*60*24*30)) +'m'
  }
  else if(totalseconds>=60*60*24*30*12){
    time=Math.round(totalseconds/(60*60*24*30*12)) +'y'
  }
  return time
}
export const timepromotion=(data)=>{
  return ("0" + new Date(data).getHours()).slice(-2) + ":" + ("0" + new Date(data).getMinutes()).slice(-2)+ " " + ('0'+new Date(data).getDate()).slice(-2) + "-" + ("0"+(new Date(data).getMonth()+1)).slice(-2) + "-" +
  new Date(data).getFullYear()
}
export const pagesize=[12,24,48]
export const list_reason_cancel=[
  'Muốn thay đổi địa chỉ giao hàng',
  'Muốn nhập/thay đổi mã Voucher',
  'Người bán không trả lời thắc mắc / yêu cầu của tôi',
  'Đổi ý không muốn mua nữa',
  'Tìm thấy giá rẻ hơn ở chỗ khác',
  'Khác'
  ]
export function validatePassword(value) {
  let  errors = [];
  if(value!=null){
      if (value.length < 6) {
          errors.push("Your password must be at least 8 characters"); 
      }
      if (value.search(/[a-z]/) < 0) {
          errors.push("Your password must contain at least one letter.");
      }
      if (value.search(/[A-Z]/) < 0) {
          errors.push("Your password must contain at least one letter.");
      }
      if (value.search(/[0-9]/) < 0) {
          errors.push("Your password must contain at least one digit."); 
      }
      if(value.match(/[|\\/~^:,;?!&%$@*+]/)){
          errors.push("Your password must contain at least one digit."); 
      }
  }
  else{
      errors.push("Your password must contain at least one digit."); 
  }
  return errors;
}
export const sort_price_choice=[{name:'Giá: Thấp đến Cao',value:'asc'},{name:'Giá: Cao đến Thấp',value:'desc'}]
export const sort_options=[{name:'Phổ biến',value:"pop"},{name:'Mới nhất',value:"ctime"},{name:'Bán chạy',value:"sales"},{name:'Giá',value:'price'}]
export const code_type=[{image:"http://127.0.0.1:8000/media/my_web/deal.png",name:'Buy with deal shock',value:'1'},
{image:"http://127.0.0.1:8000/media/my_web/gift.png",name:'Buy to receive gift',value:'2'}]
export const combo_type=[{name:'Giảm giá theo %',value:'1'},
{name:'Giảm giá theo số tiền',value:'2'},{name:'Giảm giá đặc biệt',value:'3'}]

export const discount_type=[{name:'Theo phần trăm',value:'1'},
{name:'Theo số tiền',value:'2'}]
export const award_type=[{name:'Mã giảm giá của Shop',value:'1'},{name:'Shopee Xu',value:'2'},]
export function isVietnamesePhoneNumber(number) {
  return /([\+84 |84 |0|+84|84|(+84)|(+84 )]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}
export const checkDay = (date) => {
  const today = new Date()
  let day=''
  if(date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()){
      if(date.getDate() === (today.getDate())-1 ){
        day='Yesterday'
      }
      if(date.getDate() === (today.getDate())){
        day='Today'
      }
    }
    return day
};

export function groupBy(data, property) {
  return data.reduce((acc, obj) => {
    const key = obj[property];
    console.log(key)
    if (!acc[key]) {  
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, []);
}

export const percent=(value,value_last)=>{
  if(value>0 && value_last==0){
      return `+ 100`
  }
  else if(value==0 && value_last==0 || value==value_last){
      return `0.00`
  }
  else{
      if(value<value_last){
      return `- ${((1- value/value_last)*100).toFixed(2)}`
      }
      else{
          return `+ ${((value/value_last-1)*100).toFixed(2)}`
      }
  }
}
export const partition=(array, n)=>{
  return array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];
}

export function matchYoutubeUrl(url) {
  var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if(url.match(p)){
      return url.match(p)[1];
  }
  return false;
}

export const ratingitem=(number,item,size,color)=>{
    const int_start=item.review_rating
    const int_part = Math.trunc(int_start); // returns 3
    const float_part = Number((int_start-int_part).toFixed(2)); 
    return Array(number).fill(0).map((e,k)=>
        <View key={k} style={{position: 'relative',marginRight:1}}>
          <View style={{width: k+1<= Math.trunc(item.review_rating)?'100%':`${float_part*100}%`,overflow: 'hidden',
                position: 'absolute',height: '100%',left: 0,top: 0,zIndex: 1}}>
            <Svg style={{height:size,width:size,color:color,stroke: color,fill: 'currentColor'}} enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0"><Polygon points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" strokeMiterlimit="10"></Polygon></Svg>
          </View>
          <Svg style={{height:size,width:size,color:color,stroke:color,fill: 'currentColor'}} enableBackground="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0"><Polygon fill="none" points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4" strokeLinecap="round" stroke-linejoin="round" strokeMiterlimit="10"></Polygon></Svg>
        </View>
      )}

export const choice_option=[{'name':'Tên chương trình',value:1},
{'name':'Tên sản phẩm',value:2},
{'name':'Mã sản phẩm',value:3}]
export const today=new Date()
export const yesterday=new Date(new Date().setDate(new Date().getDate() - 1))
export const tomorow=new Date(new Date().setDate(new Date().getDate() + 1))
export const lastweek=new Date(new Date().setDate(new Date().getDate() - 7))
export const lastmonth=new Date(new Date().setDate(new Date().getDate() - 30))
//user
export const address_null={address:'',address_choice:'',default:null,name:'',phone_number:''}
export const typeaddress=['Văn Phòng','Nhà Riêng'];