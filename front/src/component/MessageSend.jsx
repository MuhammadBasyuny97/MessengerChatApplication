import React from 'react';
import { FaPlusCircle,FaFileImage,FaGift,FaPaperPlane } from "react-icons/fa";

const MessageSend = ({inputHandle, newMessage, sendMessage, emojiSend, ImageSend}) => {

     const emojis = [
          '😀', '😃', '😄', '😁',
          '😆', '😅', '😂', '🤣',
          '😊', '😇', '🙂', '🙃',
          '😉', '😌', '😍', '😝',
          '😜', '🧐', '🤓', '😎',
          '😕', '🤑', '🥴', '😱'
      ]


  return (

     <div className='message-send-section'>
          <input type="checkbox" id='emoji' />
             <div className='file hover-attachment'>
                  <div className='add-attachment'>
                         Add Attachment
                  </div>
                  <FaPlusCircle />
                  </div>  

          <div className='file hover-image'>
               <div className='add-image'>
                    Add Image 
               </div>
               <input type="file" onChange={ImageSend} id='pic' className='form-control'/>
               <label htmlFor='pic'> <FaFileImage/> </label>
          </div>

          <div className='file hover-gift'>
               <div className='add-gift'>
                    Add gift
               </div>
               <FaGift />
          </div>

     <div className='message-type'>
          <input type="text" onChange={inputHandle} value={newMessage} name='message'
            id='message' placeholder='Aa' className='form-control'/>

          <div className='file hover-gift'>
               <label htmlFor='emoji'> <FaPaperPlane/> </label>
          </div>
     </div>

     <div className='file' onClick={sendMessage}>
     ❤
     </div>

     <div className='emoji-section'>
          <div className='emoji'>
               {
                    emojis.map(e => <span onClick={() => emojiSend(e)}>{e}</span>)
               }

          </div>

     </div>


     </div>

  )
};

export default MessageSend;