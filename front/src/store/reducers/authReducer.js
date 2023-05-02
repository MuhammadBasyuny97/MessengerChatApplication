import {REGISTER_FAIL,REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS} from '../types/authTypes';
import tokenDecode from 'jwt-decode';

const authState = {
    loading: true,
    authenticate: false,
    error: '',
    successMessage:'',
    myInfo: ''
}

const TokenDecode = (token) => {
    const tokenDecoded = tokenDecode(token);
    const expTime = new Date (tokenDecoded.exp * 1000);
    if(new Date() > expTime){
        return null;
    }
    return tokenDecoded;
}
const getToken = localStorage.getItem('authToken');

if(getToken){
    const getInfo = TokenDecode(getToken);
    if(getInfo){
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false;
    }
}


export const authReducer = (state = authState, action ) =>{
    const {type, payload} = action;
    
    if(type === REGISTER_FAIL || type === USER_LOGIN_FAIL){
       return {
        ...state,
        error: payload.error,
        loading: true,
        authenticate: false,
        successMessage: '',
        myInfo: ''
       }
    }
   if(type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS){
     const myInfo = tokenDecode(payload.token);
    return {
        ...state,
        myInfo: myInfo,
        successMessage: payload.successMessage,
        error: ' ',
        authenticate: true,
        loading: false

    }
   }

   if( type === SUCCESS_MESSAGE_CLEAR){
    return {
        ...state,
        successMessage: " "
    }
   }
   if( type === ERROR_CLEAR){
    return {
        ...state,
        error:''
    }
   }

    
        return state;
    


}