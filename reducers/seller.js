import {
    ADD_CATEGORY,UPDATE_CATEGORY,
    ADD_ITEM,
 SHOW_MODAL, UPDATE_BUYMORE, UPDATE_CLASSIFY, UPDATE_COMBO, UPDATE_DATE, 
 UPDATE_ITEMINFO, UPDATE_SHIPPING,UPDATE_VARIATION,RESET_ITEM, RESET_OFFER
} from '../actions/types';

const initialState={
    items_choice:[],
    gifts_choice:[],
    categories:[],
    list_category_choice:[],
    sizes:[{id:'qwerty',value:'M',choice:false}],
    classify1:'Màu sắc',
    classify2:'Size',
    iteminfo:{length:'',weight:'',width:'',height:''},
    colors:[{id:'asdfgh',value:'Xanh',file_choice:null,choice:false}],
    shippings:[],
    buymores:[],
    variations:[],
    date:null,
    show:false,
    combo:{},
    indexchoice:0
}
const sellerReducer=(state=initialState,action)=>{
    const {type,payload}=action
    switch(type){
        case ADD_ITEM:{
            if(payload.product_type=='product'){
                return{
                    ...state,items_choice:payload.products
                }
            }
            else{
                return{
                    ...state,gifts_choice:payload.products
                }
            }
        }
        case UPDATE_ITEMINFO:
            return{
                ...state,iteminfo:{...state.iteminfo,...payload}
            }
        case RESET_OFFER:
            return {
                ...state,gift_choice:[],items_choice:[],date:null,combo:{}
            }
        case RESET_ITEM:
            return {
                ...state,list_category_choice:[],
                sizes:[],
                iteminfo:{length:'',weight:'',width:'',height:''},
                colors:[],
                shippings:[],
                categories:[],
                list_category_choice:[],
                buymores:[],
                variations:[],
            }
        case ADD_CATEGORY:{
            const {categories,list_category_choice}=payload
            return{
                ...state,list_category_choice:payload.list_category_choice,categories:categories
            }
        }
         case UPDATE_CATEGORY:
            return{
                ...state,list_category_choice:payload
            }
        case UPDATE_CLASSIFY:{
            const {colors,sizes,classify1,classify2}=payload
            return {
                ...state,colors,sizes,classify1,classify2
            }
        }
            
        case UPDATE_BUYMORE:
            return {
                    ...state,buymores:payload
            }
        case UPDATE_SHIPPING:
            return {
                ...state,shippings:payload
            }
        
        case UPDATE_VARIATION:
            return {
                ...state,variations:payload
            }
        case SHOW_MODAL:
            return{
                ...state,show:payload
            }
        case UPDATE_COMBO:
            return{
                ...state,combo:{...state.combo,...payload}
            }
        case UPDATE_DATE:
            return{...state,date:payload.date,indexchoice:payload.index,show:payload.show}
        default:
            return state
    }  
}
export default sellerReducer