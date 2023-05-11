import React,{useEffect,useState, useRef} from 'react';
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriends from './ActiveFriends';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch,useSelector } from 'react-redux';
import { getFriends, messageSend, getMessage, ImageMessageSend } from '../store/actions/messengerActions';
import toast, {Toaster, toaster} from 'react-hot-toast';
import useSound from 'use-sound'
import notificationSound from '../audio/notification.mp3';
import sendingSound from '../audio/sending.mp3'


import {io} from 'socket.io-client';
import { positions } from 'react-alert';

const Messenger = () => {
   const notificationSPlay = useSound(notificationSound);
   const sendingSPlay = useSound(sendingSound);

    const [currentfriend, setCurrentFriend] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const {friends, message} = useSelector(state => state.messenger);
    const {myInfo} = useSelector(state => state.auth);
    const [newMessage, setNewMessage] = useState('');
    const [socketMessage, setSocketMessage] = useState('');
    const [typingMessage, setTypingMessage] = useState('');
    const dispatch = useDispatch();

    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        console.log(socket)
        socket.current = io('ws://localhost:8000');
        socket.current.on('getMessage', (data) => {
             setSocketMessage(data);
        })
        socket.current.on('typingMessageGet', (data) => {
            setTypingMessage(data);
       })
    }, [])
    
    useEffect(() => {
        if(socketMessage && currentfriend){
            
            if(socketMessage.senderId === currentfriend._id && 
                socketMessage.receiverId === myInfo.id){
                dispatch({
                    type:'SOCKET_MESSAGE',
                    payload: {
                        message: socketMessage
                    }
                })
            }
        }
        setSocketMessage('');
    },[socketMessage])
    
    useEffect(() => {
        socket.current.emit('addUser',myInfo.id, myInfo);
    }, [])

    useEffect(() => {
        socket.current.emit('getUser',(users) => {
            const filterUsers = users.filter(u => u.userId !== myInfo.id);
            setActiveUsers(filterUsers);
        });
    }, [])

    useEffect (() => {
        if(socketMessage.senderId === currentfriend._id && 
            socketMessage.receiverId !== myInfo.id){
                notificationSPlay();
                toast.success(`${socketMessage.sendMessage} Send a New Message`)
            }
    }, [socketMessage])
   

    const inputHandle = e => {
        setNewMessage(e.target.value);

        socket.current.emit('typingMessage',{
            senderId: myInfo.id,
            receiverId: currentfriend._id,
            msg: e.target.value
        })
    }

    const sendMessage = e => {
        e.preventDefault();
        sendingSPlay();
        const data = {
            senderName: myInfo.userName,
            receiverId: currentfriend._id,
            message: newMessage ? newMessage : '❤'

        }
        socket.current.emit('sendMessage', {
            senderId: myInfo.id,
            senderName: myInfo.userName,
            receiverId: currentfriend._id,
            time: new Date(),
            message: {
                text: newMessage ? newMessage : '❤',
                image: ''
            }

        })
        socket.current.emit('typingMessage',{
            senderId: myInfo.id,
            receiverId: currentfriend._id,
            msg: ""
        })
        dispatch(messageSend(data));
        setNewMessage('');
    }


  useEffect(() => {
    if(friends && friends.length > 0){
        setCurrentFriend(friends[0]);
    }
  },[friends])
    

    useEffect(() => {
        dispatch(getFriends())
    },[friends])

    useEffect(() => {
        dispatch(getMessage(currentfriend._id))
    }, [currentfriend?._id])

    useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [message])

    const emojiSend = (emu) => {
        setNewMessage(`${newMessage}` + emu);

        socket.current.emit('typingMessage',{
            senderId: myInfo.id,
            receiverId: currentfriend._id,
            msg: emu
        })
    }

    const ImageSend = (e) => {
        console.log(e.target.files[0]);
        if(e.target.files.length !== 0){
            sendingSPlay();
            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName;

            const formData = new FormData();

            formData.append('senderName', myInfo.userName);
            formData.append('receiverId', currentfriend._id);
            formData.append('imageName', newImageName);
            formData.append('image', e.target.files[0]);

            socket.current.emit('sendMessage', {
                senderId: myInfo.id,
                senderName: myInfo.userName,
                receiverId: currentfriend._id,
                time: new Date(),
                message: {
                    text: '',
                    image: newImageName
                }
    
            })

            dispatch(ImageMessageSend(formData));

        }
       
    }

  return (
    <div className='messenger'>
        <Toaster>
            position ={'top-right'}
            reverseOrder = {false}
            toastOptions = {{
                style: {
                    fontSize : '18px'
                }
            }}
        </Toaster>
        <div className='row'>
            <div className='col-3'>
                <div className='left-side'>
                    <div className='top'>
                        <div className='image-name'>
                            <div className='image'>
                                <img src={`./image/${myInfo.image}`} alt="" />

                            </div>
                            <div className='name'>
                                <h3> {myInfo.userName}</h3>

                            </div>
                         </div>
                            <div className='icons'>
                                <div className='icon'>
                                    <FaEllipsisH/>
                                </div>
                                <div className='icon'>
                                    <FaEdit/>
                                </div>

                            </div>

                        </div>
                        <div>
                            
                        </div>
                        <div className='friend-search'>
                            <div className='search'>
                                <button><FaSistrix/></button>
                                <input type="text" placeholder='Search' className='form-control' />


                            </div>


                        </div>

                        <div className='active-friends'>
                            {
                                activeUsers && activeUsers.length > 0 ? activeUsers.map(u => 
                                <ActiveFriends user = {u} setCurrentFriend={setCurrentFriend}/> ):''
                                
                            }
                            
                           

                        </div>

                        <div className='friends' >
                           {
                                friends && friends.length > 0 ? friends.map(fd => {
                                    <div onClick={() => setCurrentFriend(fd)}  
                                    className= {currentfriend._id === fd._id ? "hover-friend active" : "hover-friend"}>
                                      <Friends friend = {fd}/> 
                                    </div>
                                }) : "No Friends"
                            }

                        </div>

                    </div>

                </div>
             {currentfriend ? <RightSide 
                currentfriend={currentfriend}
                inputHandle = {inputHandle}
                newMessage = {newMessage}  
                sendMessage={sendMessage}
                message = {message} 
                scrollRef = {scrollRef}
                emojiSend = {emojiSend}
                ImageSend = {ImageSend}
                activeUsers = {activeUsers}
                typingMessage = {typingMessage}
                     /> 
             : "Please Select Your Friend" } 
            </div>
        </div>

  )
}

export default Messenger