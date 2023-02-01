import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, expiry} from '../actions/auths';
import {AsyncStorage} from 'react-native';
import VariationItem from './VariationItem';
import Timepicker from '../components/seller/Timepicker';

const Layout = ({children,checkAuthenticated,isAuthenticated }) => {
    useEffect(() => {
        (async()=>{
            const token=await AsyncStorage.getItem('token')
            if(token){
            checkAuthenticated()
            }
        })()
    },[isAuthenticated]);
    return (
        <>  
            {children}  
            <VariationItem/> 
            <Timepicker/>
        </>  
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,token:state.auth.token
});
export default connect(mapStateToProps,{checkAuthenticated})(Layout);
