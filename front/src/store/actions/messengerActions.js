
import  axios  from 'axios';
import {FRIEND_GET_SUCCESS} from '../types/messengerTypes';

export const getFriends = () => async(dispatch) => {

    try{
        const response = await axios.get('/api/messengers/get-friends');
        dispatch({
            type: FRIEND_GET_SUCCESS,
            payload: {
                friends: response.data.friends
            }
        })
    }
    catch(error){
        console.log(error.response.data);
    }
}

export const messageSend = (data) => async (dispatch) => {
    try{
        const response = await axios.post('/api/messengers/send-message', data);
        console.log(response.data);
    }
    catch(error){
         console.log(error);

    }
}