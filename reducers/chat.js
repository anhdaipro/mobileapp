import {
    SHOW_CHAT,
    SHOW_THREADS,
} from '../actions/types';

const initialState={
    thread:null,
    messages:[],
    threads:[],
    showchat:false,
}
const chatReducer=(state=initialState,action)=>{
    const {type,payload}=action
    switch(type) {
        
        case SHOW_THREADS:
            return{
                ...state,
                threads:payload
            }
        case SHOW_CHAT:
            return{
                ...state,
                showchat:true,
                messages:payload.messages,
                members:payload.members,
                thread:payload.thread
        }
        default:
            return state
    }
}
export default chatReducer