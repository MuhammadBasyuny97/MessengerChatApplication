
import  axios  from 'axios';
import {FRIEND_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS} from '../types/messengerTypes';

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
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: response.data.message
        })
    }
    catch(error){
         console.log(error);

    }
}

export const getMessage = (id) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`/api/messengers/get-message/${id}`);
            dispatch({
                type: MESSAGE_GET_SUCCESS,
                payload: {
                     message: response.data.message
                }
            })
        }
        catch(error){
            console.log(error.response.data);
        }
    }
}

export const ImageMessageSend = (data) => async(dispatch) => {
    try{
        const response = await axios.post('/api/messenger/image-message-send',data);
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: response.data.message
        })
    }
    catch(error){
        console.log(error.response.data);
    }
}