import {REGISTER_FAIL} from '../types/authTypes';
const authState = {
    loading: true,
    authenticate: false,
    error: '',
    successMessage:'',
    myInfo: ''
}

export const authReducer = (state = authState, action ) =>{
    const {type, payload} = action;
    
    if(type === REGISTER_FAIL){
       return {
        ...state,
        error: payload.error,
        loading: true,
        authenticate: false,
        successMessage: '',
        myInfo: ''
       }
    }


}