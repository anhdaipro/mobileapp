
import { Container, Styletext,styles, Flexrow } from "../marketing/styles"
import * as ImagePicker from 'expo-image-picker';
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
    Pressable,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    Alert,
    TextInput,
    Dimensions,
    StyleSheet,
    ImageBackground,
    Modal
  } from 'react-native';
  import axios from 'axios';
import {useState,useEffect, useMemo} from "react"
import {useSelector,useDispatch} from "react-redux"
import styled from "styled-components"
import { v4 as uuid } from 'uuid';
import { updateclassify, updatevariation } from "../../../actions/seller";
const Btnclassify=styled.Pressable`
border:1px solid #ee4d2d;
position:relative;
align-items:center;
justify-content:center;
margin-right:8px;
margin-bottom:8px;
height:32px;
width:80px
`
const StyleModalContent=styled.View`
background-color:#fff;
padding: 6px 8px;
z-index:10;
margin-top:auto;
width:100%;
position:relative
`
const StyleSwitch=styled.View`
position:relative;
border-radius:12px;
width:36px;
margin-left:4px;
background-color:${props=>props.open?'#5c7':'#b7b7b7'};
height:20px;
`
const Swidth=styled.View`
left:${props=>props.open?18:2}px;
background-color: #fff;
border-radius: 8px;
position:absolute;
width: 16px;
height: 16px;
margin-top: 2px;
`
const Classify=styled.Pressable`
border:1px solid ${props=>props.active?'#ee4d2d':'#757575'};
position:relative;
align-items:center;
margin-right:12px;
margin-bottom:12px;
justify-content:center;
height:32px;
width:80px
`
const Flexwrap=styled(Flexrow)`
flex-wrap:wrap
`
const Imagecontent=styled.Pressable`
width:80px;
height:100px;
margin:8px 8px 8px 0;
position:relative;
border:1px solid #ee4d2d
`
const Bottomimage=styled.View`
height:20px;
background-color:#ee4d2d;
width:100%;
position:absolute;
bottom:0;
align-items:center;
justify-content:center;
left:0
`
const Inputcontent=styled.View`
padding:8px 0
`
const Btnremove=styled.Pressable`
position:absolute;
top:-10px;
z-index:100;
right:-18px
`
const StyleView=styled.View`
padding:12px 8px;
border-color:rgba(0,0,0,0.1);
border-bottom-width:1px
`
const Header=styled.View`
padding: 12px 12px 12px 0;
border-color:rgba(0,0,0,0.1);
border-bottom-width:1px
`

const Addvarriation=(props)=>{
    const {navigation,route}=props
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)
    const [show,setShow]=useState(false)
    const [state,setState]=useState({addsize:false,addcolor:false,classify1:'',classify2:''})
    const datacolors=useSelector(state=>state.seller.colors)
    const datasizes=useSelector(state=>state.seller.sizes)
    const datavariations=useSelector(state=>state.seller.variations)
    const [colors,setColors]=useState(()=>datacolors)
    const dataclassify1=useSelector(state=>state.seller.classify1)
    const dataclassify2=useSelector(state=>state.seller.classify2)
    const [classify1,setClassify1]=useState(()=>dataclassify1)
    const [classify2,setClassify2]=useState(()=>dataclassify2)
    const [open,setOpen]=useState(false)
    const [value,setValue]=useState()
    const [editcolor,SetEditcolor]=useState(false)
    const [editsize,setEditsize]=useState(false)
    const [sizes,setSizes]= useState(()=>datasizes)
    const [variations,setVariations]=useState([])
    useEffect(()=>{
        setVariations(datavariations)
    },[datavariations])
    const valid=(open && colors.every(color=>color.image)) ||!open
    console.log(datavariations)
    const [complete,setComplete]=useState(false)
    const dispatch=useDispatch()
    const change=useMemo(()=>{
        if(JSON.stringify(colors)!=JSON.stringify(datacolors) || JSON.stringify(sizes)!=JSON.stringify(datasizes)){
            return true
        }
        else{
            return false
        }
    },[colors,sizes])
    
    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (complete || (!complete && !change)) {
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
                    navigation.dispatch(e.data.action)
                  },
                },
              ]
            );
          }),
        [navigation, complete]
    );

    const setvariations= ()=>{
        
        dispatch(updateclassify(colors,sizes,classify1,classify2))
        
        dispatch(updatevariation(variations))
        setComplete(true)
        navigation.navigate("Setvariation")
    }

    const pickImage = async (color) => {
        try{
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [9, 16],
            quality: 1,
          });
          console.log(result);
          if (!result.cancelled) {
            const file={
              ...result,type:`${result.type}/*`,name:generateString(12)
            }
            setColors(current=>current.map(item=>{
                if(item.value==color.value){
                    return({...item,image:result.uri,file_choice:file})
                }
                return({...item,})
            }))
          }
        }
        catch(e){
          console.log(e)
        }
    };
    
    const addcolor=()=>{
        setShow(true)
        setState({...state,addcolor:true,addsize:false})
    }

    const addsize=()=>{
        setShow(true)
        setState({...state,addcolor:false,addsize:true})
    }

    const removecolor=(colorchoice)=>{
        const list_color=colors.filter(color=>color.id!=colorchoice.id)
        const datavariations=variations.filter(variation=>variation.color_id!=colorchoice.id)
        setColors(list_color)
        setVariations(datavariations)
    }
   
    const removesize=(sizechoice)=>{
        const list_sizes=sizes.filter((size,i)=>size.id!=sizechoice.id)
        const datavariations=variations.filter(variation=>variation.size_id!=sizechoice.id)
        setSizes(list_sizes)
        setVariations(datavariations)
    }

    const setvalue=()=>{
        if(state.addcolor){
            setColors([...colors,{choice:false,id:small_id,value:value,file:null,file_preview:null,duration:0,filetype:'image',error:false}])
        }
        else{
            setSizes([...sizes,{id:small_id,value:value,choice:false}])
        }
        setShow(false)
        setValue('')
    }

    const setsizes=(itemchoice,name,value)=>{
        setSizes(current=>current.map(item=>{
            if(item.id==itemchoice.id){
                return({...item,[name]:value})
            }
            return({...item,})
        }))
        
        const addvariation=colors.filter(color=>color.choice).reduce((arr,obj)=>{
            return [...arr,{variation_id:obj.id+small_id,...obj,color_value:obj.value,color_id:obj.id,...itemchoice,size_value:itemchoice.value,size_id:itemchoice.id,sku_classify:'',price:null,inventory:0}]
        },[])
        const variations_item=sizes.filter(size=>size.choice).length>0?[...variations,...addvariation]:variations.map(item=>{
            return({...item,size_value:'',size_id:small_id})
        })
        const datavariations=value?variations_item:variations.filter(variation=>itemchoice.id!==variation.size_id)
        setVariations(datavariations)
    }

    const setcolors=(itemchoice,name,value)=>{
        setColors(current=>current.map(item=>{
            if(item.id==itemchoice.id){
                return({...item,[name]:value})
            }
            return({...item,})
        }))
        const addvariation=sizes.filter(size=>size.choice).length>0?sizes.filter(size=>size.choice).reduce((arr,obj)=>{
            return [...arr,{variation_id:obj.id+small_id,...obj,size_value:obj.value,size_id:obj.id,...itemchoice,color_value:itemchoice.value,color_id:itemchoice.id,sku_classify:'',price:null,inventory:0}]
        },[]):[{variation_id:small_id,...itemchoice,color_value:itemchoice.value,color_id:itemchoice.id,sku_classify:'',price:null,inventory:0}]
        const datavariations=value?[...variations,...addvariation]:variations.filter(variation=>itemchoice.id!==variation.color_id)
        setVariations(datavariations)
    }

    return(
        <Container>
            <View style={styles.flexcenter}>
                <TouchableHighlight underlayColor="rgba(0,0,0,0.2)" onPress={()=>navigation.goBack()}>
                    <View style={{marginRight:8,padding:4}}>
                        <Svg viewBox="0 0 22 17" style={[styles.icon_back]}><G stroke="none" strokeWidth="1" fill-rule="evenodd" transform="translate(-3, -6)"><Path d="M5.78416545,15.2727801 L12.9866648,21.7122915 C13.286114,22.0067577 13.286114,22.4841029 12.9866648,22.7785691 C12.6864297,23.0738103 12.200709,23.0738103 11.9004739,22.7785691 L3.29347136,15.0837018 C3.27067864,15.0651039 3.23845445,15.072853 3.21723364,15.0519304 C3.06240034,14.899273 2.99480814,14.7001208 3.00030983,14.5001937 C2.99480814,14.3002667 3.06240034,14.1003396 3.21723364,13.9476821 C3.23845445,13.9275344 3.2714646,13.9345086 3.29425732,13.9166857 L11.9004739,6.22026848 C12.200709,5.92657717 12.6864297,5.92657717 12.9866648,6.22026848 C13.286114,6.51628453 13.286114,6.99362977 12.9866648,7.288096 L5.78416545,13.7276073 L24.2140442,13.7276073 C24.6478918,13.7276073 25,14.0739926 25,14.5001937 C25,14.9263948 24.6478918,15.2727801 24.2140442,15.2727801 L5.78416545,15.2727801 Z"></Path></G></Svg>
                    </View>
                </TouchableHighlight>
                <Text style={styles.fontbig}>Thêm phân loại hàng</Text>
            </View>
            <View style={{marginTop:8}}>
                <View style={{paddingLeft:12}}>
                    <Header style={[styles.item_space]}>
                        <View>
                            {editcolor?
                            <TextInput value={classify1}
                                style={styles.input}
                                onChangeText={text=>setClassify1(text)}
                            />:
                            <Text>{classify1}</Text>}
                        </View>
                        
                        <Pressable onPress={()=>SetEditcolor(!editcolor)}>
                            <Text style={styles.textorange}>{editcolor?'Xong':'Sửa'}</Text>
                        </Pressable>
                        
                    </Header>
                    <View style={{paddingTop:12,paddingBottom:12}}>
                        <Flexwrap>
                            {colors.map((item,i)=>
                                <Classify onPress={()=>setcolors(item,'choice',!item.choice)} active={item.choice} key={item.id}>
                                    <Text style={styles.textorange}>{item.value}</Text>
                                    {editcolor &&(<Btnremove  onPress={()=>removecolor(item)}>
                                        <Svg viewBox="0 0 20 20" fill="none" style={[styles.svg_icon3,{zIndex:100}]} color="#ee4d2d"><Path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.041 7.102L8.94 10l-2.898 2.898 1.06 1.06L10 11.062l2.898 2.898 1.06-1.06-2.896-2.9 2.898-2.898-1.06-1.06L10 8.938 7.102 6.041l-1.06 1.06z" fill="currentColor"></Path></Svg>
                                    </Btnremove>)}
                                </Classify>
                            )}
                            <Btnclassify onPress={addcolor}>
                                
                                <Text>+ Thêm</Text>
                            </Btnclassify>
                        </Flexwrap>
                    </View>
                    <View style={[styles.item_space,{paddingRight:12}]}>
                        <View>
                            <Text>Thêm hình ảnh cho phân loại màu sắc</Text>
                            <Text>Khi bật tinh năng này tất cả hình ảnh phải được tải lên</Text>
                        </View>
                        
                        <Pressable onPress={()=>setOpen(!open)}>
                            <StyleSwitch open={open}>
                                <Swidth open={open}/>
                            </StyleSwitch>
                        </Pressable>
                        
                    </View>
                    <View>
                        {open &&(
                        <Flexwrap>
                            {colors.filter(item=>item.choice).map((color,index)=>
                                <Imagecontent  onPress={()=>pickImage(color)} key={color.id}>
                                    <View style={[styles.center,{height:80}]}>
                                        {color.image?
                                        <Image style={{width:'100%',height:'100%'}} resizeMode="contain" source={{uri:color.image}}/>:
                                        <Svg xmlns="http://www.w3.org/2000/svg" style={[styles.svg_icon3,{color:"#ee4d2d"}]} viewBox="0 0 32 32"><Path d="M17.5 2.5h-3v12h-12v3h12v12h3v-12h12v-3h-12v-12z"></Path></Svg>}
                                    </View>
                                    <Bottomimage>
                                        <Text style={styles.textwhite}>{color.value}</Text>
                                    </Bottomimage>
                                </Imagecontent>
                            )}
                        </Flexwrap>)}
                    </View>
                </View>
                <View style={{paddingLeft:12,marginTop:12}}>
                    <Header style={styles.item_space}>
                        <View>
                            {editsize?
                            <TextInput value={classify2}
                                style={styles.input}
                                onChangeText={text=>setClassify2(text)}
                            />:
                            <Text>{classify2}</Text>}
                            
                        </View>
                        <Pressable onPress={()=>setEditsize(!editsize)}>
                            <Text style={styles.textorange}>{editsize?'Xong':'Sửa'}</Text>
                        </Pressable>
                    </Header>
                    <View style={{paddingTop:12,paddingBottom:12}}>
                        <Flexwrap>
                            {sizes.map((item,i)=>
                                <Classify onPress={()=>setsizes(item,'choice',!item.choice)} active={item.choice} key={item.id}>
                                    <Text style={styles.textorange}>{item.value}</Text>
                                    {editsize && (<Btnremove onPress={()=>removesize(item)}>
                                        <Svg viewBox="0 0 20 20" fill="none" style={styles.svg_icon3} color="rgba(0, 0, 0, 0.26)"><Path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.041 7.102L8.94 10l-2.898 2.898 1.06 1.06L10 11.062l2.898 2.898 1.06-1.06-2.896-2.9 2.898-2.898-1.06-1.06L10 8.938 7.102 6.041l-1.06 1.06z" fill="currentColor"></Path></Svg>
                                    </Btnremove>)}
                                </Classify>
                            )}
                            <Btnclassify onPress={addsize}>
                            
                                <Text>+ Thêm</Text>
                            </Btnclassify>
                        </Flexwrap>
                    </View>
                </View>
            </View>
            <View style={[styles.fotter,{padding:8}]}>
                <Pressable disabled={valid?false:true} onPress={setvariations} style={[styles.btn,{flex:1,backgroundColor:valid?'#ee4d2d':'rgba(0,0,0,.1)'}]}>
                    <Text style={{color:valid ?'#fff':'rgba(0,0,0,.2)'}}>Net: Set Variation Info</Text>
                </Pressable>
            </View>
            <Modal animationType='slide' onRequestClose={()=>setShow(false)} visible={show} transparent>
                <TouchableWithoutFeedback onPress={(event) => event.target == event.currentTarget && setShow(false)}>
                    <View style={styles.modal}>
                        <StyleModalContent>
                            <StyleView style={styles.item_space}>
                                <Text>Chỉnh sửa phân loại hàng</Text>
                                <Pressable style={styles.btn_close} onPress={()=>setShow(false)}>
                                    <Svg style={styles.svg_icon2} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16"><Path fill-rule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></Path></Svg>
                                </Pressable>
                            </StyleView>
                            <Inputcontent style={styles.item_space}>
                                <TextInput style={{flex:1}} onSubmitEditing={setvalue}  onChangeText={(text)=>setValue(text)}/>
                                <Pressable style={{marginLeft:8}} onPress={()=>setValue('')}>
                                    <Svg viewBox="0 0 20 20" fill="none" style={styles.svg_icon3} color="rgba(0, 0, 0, 0.26)"><Path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.041 7.102L8.94 10l-2.898 2.898 1.06 1.06L10 11.062l2.898 2.898 1.06-1.06-2.896-2.9 2.898-2.898-1.06-1.06L10 8.938 7.102 6.041l-1.06 1.06z" fill="currentColor"></Path></Svg>
                                </Pressable>
                            </Inputcontent>
                        </StyleModalContent>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </Container>
    )
}
export default Addvarriation