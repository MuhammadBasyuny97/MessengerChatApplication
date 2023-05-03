
const formidable = require('formidable');
const fs = require('fs');
const User = require('../models/authModel');
const messageModel = require('../models/messageModel');

module.exports.getFriends = async(req,res) => {
    const myId = req.myId;
    try{
           const friendGet = User.find({});
           const filter = friendGet.filter (f => f.id !== myId);
           res.status(200).json({success:true, friends: filter});
    }
    catch(error){
        res.status(500).json({
            error:{
                errorMessage:['Internal Server Error']
            }
        })
    }
}

module.exports.messageUploadDB = async(req, res) => {
    const{senderName, receiverId, message} = req.body;
    const senderId = req.myId;

    try{
    const insertMessage = await messageModel.create({
        senderId: senderId,
        senderName: senderName,
        receiverId: receiverId,
        message: {
            text: message,
            image: ''
        }
    })
    res.status(201).json({
        success:true,
        message: insertMessage
    })
}
catch(error){
    res.status(500).json({
        error:{
            errorMessage: ['Internal Server Error']
        }
    })
}
}

module.exports.getMessage = async(req,res) => {
   const myId = req.id;
   const fdId = req.params.id;

   try{
    const getAllMessage = await messageModel.find({});
    getAllMessage = getAllMessage.filter (m => ( (m.senderId === myId && m.receiverId === fdId) 
                                                   || (m.receiverId === myId && m.senderId === fdId)) ) 
    
     res.status(200).json({
        success: true,
        message: getAllMessage

     })
        
   }
   catch(error){
    res.status(500).json({
        error:{
            errorMessage: ['Internal Server Error']
        }
    })
   }
}

module.exports.ImageMessageSend = async(req,res) => {
    const form = formidable();
     const senderId = req.myId;

    form.parse(req, (err, fields, files) => {
        const {senderName, receiverId, imageName} = fields;

        const newPath = __dirname + `../../../front/public/image/${imageName}`;

        files.image.originalFileName = imageName;

        try{
             fs.copyFile(files.image.filepath, newPath, async(err) => {
                if(err){
                    res.status(500).json({
                        error:{
                            errorMessage: ['Failed Uploading Image']
                        }
                    })
                }else{
                    const insertMessage = await messageModel.create({
                        senderId: senderId,
                        senderName: senderName,
                        receiverId: receiverId,
                        message: {
                            text: '',
                            image: files.image.originalFileName
                        }
                    })
                    res.status(201).json({
                        success:true,
                        message: insertMessage
                    })
                }
             })
        }
        catch {
             res.status(500).json({
                error: {
                    errorMessage: ['Internal Server Error']
                }
             })
        }
    })

}