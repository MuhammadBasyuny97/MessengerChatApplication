import axios from 'axios';
import {REGISTER_FAIL} from '../types/authTypes';
export const userRegister = (data) => {
    return async (dispatch) => {
       const config = {
        header: {
            'Content-Type':'application/json'
        }
       }
       try{
         const response = await axios.post('/api/messengers/user-register',data,config);
         console.log(response.data);
         
       }
       catch(error){
         dispatch({
            type: REGISTER_FAIL,
            payload: {
                error: error.response.data.error.errorMessage
            }
         })
       }
      
    }
    
} 