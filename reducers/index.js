import {combineReducers} from "redux"
import authReducer from "./auth"
import buyerReducer from "./buyer"
import chatReducer from "./chat"
import sellerReducer from "./seller"
const rootReducer=combineReducers({auth:authReducer,buyer:buyerReducer,seller:sellerReducer})
export default rootReducer
