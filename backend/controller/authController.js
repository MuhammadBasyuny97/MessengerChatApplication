const formidable = require('formidable');
const validator = require('validator');
const registerModel = require('../models/authModel.js');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.userRegister = (req,res) => {
    const form = formidable();
    form.parse(req,async (err,fields,files) => {
        console.log(fields);
        //console.log(files);
       const {userName, email, password, confirmPassword} = fields;
       const {image} = files;
       const error = [];

       if(!userName){
        error.push('Please provide your user name')
       }
       if(!email){
        error.push('Please provide your email')
       }
       if(email && !validator.isEmail(email)){
        error.push('Please provide your Valid Email')
       }
       if(password){
        error.push('Please provide your password')
       }
       if(confirmPassword){
        error.push('Please provide your confirm passowrd')
       }
       if(password && confirmPassword && password !== confirmPassword){
        error.push('Your Password and Confirm Password not same')
       }
       if(password && password.length < 6){
        error.push('Please Provide Password must be 6 characters at least')
       }
       if(Object.keys(files).length === 0){
        error.push('Please Provide user image');
       }

       if(error.length > 0){
        res.status(400).json({error:{
            errorMessage: error
        }
    })
       } else
            {
               const imageName = files.image.originalName;
               const randNumber = Math.floor(Math.random() * 99999);
               const newName = imageName + randNumber;
               files.image.originalName = newName;

               const newPath = __dirname + `../../../front/public/image/
                                           ${files.image.originalName}`
                 
                                           
          try {
            const checkUser = await registerModel.findOne({
                email: email
            })

            if(checkUser){
                res.status(400).json({
                    error:{
                        errorMessage: ['Your Email already existed']
                    }
                })
            }
            fs.copyFile(files.image.filepath, newPath, async(error) => {
                if(!error){
                    const userCreate = await registerModel.create({
                        userName,
                        email,
                        password: await bcrypt.hash(password,10),
                        image: files.image.originalFileName
                    })

                    const token = jwt.sign({
                        id: userCreate._id,
                        userName: userCreate.userName,
                        email: userCreate.email,
                        image: userCreate.image,
                        registerTime: userCreate.createdAt
                    }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXP});
                    console.log(token);
                    console.log('Registration Complete Successfully');

                  const options = {expires: new Date(Date.now() + process.env.TOKEN_EXP
                     *24 * 60 * 60 * 1000)};
                  res.status(201).cookie('authToken',token,options).json({
                    successMessage : 'Your Register is Successful', token
                })
                }else{
                    res.status(500).json({
                        error:{
                            errorMessage: [`Internal Server Error`]
                        }
                    })
                }
             
            })

          }
          catch(error){
            res.status(500).json({
                error:{
                    errorMessage: [`Internal Server Error`]
                }
            })

          }
    }
    
})
}