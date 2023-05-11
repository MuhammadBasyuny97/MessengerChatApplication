import React from 'react'

const ActiveFriends = ({user,setCurrentFriend}) => {
  return (
    <div onClick = {() => setCurrentFriend({
         _id: user.userInfo.id,
         email: user.userInfo.email,
         userName: user.userInfo.userName,
         image: user.userInfo.image
    })} className='active-friend'>
        <div className='image-active-icon'>
            <div className='image'>
               <img src={`./image/${user.userInfo.image}`} alt="" />
               <div className='active-icon'></div>
            </div>

            

        </div>

    </div>
  )
}

export default ActiveFriends