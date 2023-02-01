import { ReactReduxContext } from "react-redux";
import { SHOW_MODAL, UPDATE_COMBO, UPDATE_DATE,ADD_ITEM, ADD_CATEGORY, UPDATE_CLASSIFY, UPDATE_VARIATION, UPDATE_CATEGORY, UPDATE_BUYMORE, UPDATE_SHIPPING, UPDATE_ITEMINFO, RESET_ITEM, RESET_OFFER } from "./types";

export const  updateitem=(data) => async dispatch =>{
    dispatch({
        type: ADD_ITEM,
        payload: data
    });
}
export const updatedate=(data)=> async dispatch =>{
    dispatch({
        type:UPDATE_DATE,
        payload:data
    })
}
export const  updatecombotype=(data)=>{
    return{
        type:UPDATE_COMBO,
        payload:data
    }
}
export const addcategory=(list_category_choice,categories) =>{
    return{
        type:ADD_CATEGORY,
        payload:{list_category_choice:list_category_choice,categories:categories}
        
    }
}
export const updatecategory=(data)=>{
    return{
        type:UPDATE_CATEGORY,
        payload:data
    }
}
export const resetoffer=()=> async dispatch =>{
    dispatch({
        type:RESET_OFFER
    })
}
export const updateclassify=(colors,sizes,classify1,classify2)=>{
    return{
        payload:{colors,sizes,classify1,classify2},
        type:UPDATE_CLASSIFY
    }

}
export const updatevariation=(data)=>{
    return{
        payload:data,
        type:UPDATE_VARIATION
    }

}
export const updatecolor=(data)=>{
    return{
        payload:data,
        type:UPDATE_COLOR
    }

}
export const updatebuymore=(data)=>{
    return{
        payload:data,
        type:UPDATE_BUYMORE
    }

}
export const updateiteminfo=(data)=>{
    return{
        type:UPDATE_ITEMINFO,
        payload:data
    }
}
export const resetitem=()=>{
    return{
        type:RESET_ITEM
    }
}
export const updateshipping=(data)=>{
    return{
        payload:data,
        type:UPDATE_SHIPPING
    }
}
export const setshow=(data)=>async dispatch =>{
    dispatch({
        type:SHOW_MODAL,
        payload:data
    })
}