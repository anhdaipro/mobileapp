import {
    SHOW_VARIATION,
    UPDATE_CITIES,
    UPDATE_ADDRESS,
    EDIT_ADDRESS,
    UPDATE_VARIATION,
} from '../actions/types';

const initialState={
    address:{},
    addresses:[],
    showvariation:false,
    data:null,
    type:null,
    quantity:1
}
const buyerReducer=(state=initialState,action)=>{
    const {type,payload}=action
    switch(type) {
        case UPDATE_CITIES:
            return{
                ...state,address:{...state.address,payload}
            }
        case EDIT_ADDRESS:
            return{
                ...state,type:payload.type,address:payload.address
            }
        case UPDATE_ADDRESS:
            return{
                ...state,addresses:payload
            }
        case SHOW_VARIATION:
            return{...state,
            type:payload.type,
            quantity:payload.quantity,
            showvariation:payload.show,
            data:payload,
            product:payload.product
        }
        case UPDATE_VARIATION:
            return{
                ...state,data:payload,
                type:'update'
            }
        default:
            return state
    }
}
export default buyerReducer
