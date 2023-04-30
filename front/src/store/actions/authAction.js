import axios from 'axios';
import {REGISTER_FAIL,REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR} from '../types/authTypes';
export const userRegister = (data) => {
    return async (dispatch) => {
       const config = {
        header: {
            'Content-Type':'application/json'
        }
       }
       try{
         const response = await axios.post('/api/messengers/user-register',data,config);
         console.log(response.data.token);
         localStorage.setItem('authToken',response.data.token);
         dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                successMessage: response.data.successMessage,
                token: response.data.token
            }
                   

         })
         
       }
       catch(error){
         dispatch({
            type: REGISTER_FAIL,
            payload: {
                error: error.response.data.error
            }
         })
       }
      
    }
    
} 