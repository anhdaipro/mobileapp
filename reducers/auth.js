import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    SHOW_CHAT,
    SHOW_THREADS,
    UPDATE_PROFILE_SUCCESS,
    SHOW_VARIATION,
    UPDATE_USER_SUCCESS,
    UPDATE_ADDRESS,
    EDIT_ADDRESS,
    ADD_ITEM,
    UPDATE_VARIATION,
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    user: null,
    profile:null,
    count_notify_unseen:0,
    count_message_unseen:0,
};

const authReducer=(state = initialState, action)=>{
    const { type, payload } = action;
    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user:payload,
                count_notify_unseen:payload.count_notify_unseen,
                count_message_unseen:payload.count_message_unseen
            }
        case UPDATE_PROFILE_SUCCESS:
            return{
                ...state,profile:{...state.profile,...payload}
            }
        case UPDATE_USER_SUCCESS:
            return{
                ...state,user:{...state.user,...payload}
            }
        case LOGIN_SUCCESS:
            
            return{
                ...state,
                isAuthenticated: true,
                token:payload.access,
                expirationDate:payload.access_expires
            }
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
           
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user:null
            }
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: null,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};
export default authReducer

