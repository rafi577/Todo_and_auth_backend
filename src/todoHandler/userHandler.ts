const userExpress = require('express');
const bcrypt = require('bcrypt');
const userMongose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModelSchema = require('../Schema/userSchema')



const userRouter = userExpress.Router();
const userModel = new userMongose.model("user",userModelSchema);




userRouter.post('/signup',async (req:any,res:any)=>{
    try{
        const hashPassowrd = await bcrypt.hash(req.body.password,10);
        const newUser = new userModel({
            name : req.body.name,
            user_name: req.body.user_name,
            password : hashPassowrd
        })
        console.log(newUser);
        await newUser.save();
        res.status(200).json({
            message : "signup successful."
        });
    }
    catch{
        res.status(500).json({
            message : "signup failed!"
        });
    }
})

userRouter.post('/login',async(req:any,res:any)=>{
    try{
        const user = await userModel.find({user_name : req.body.user_name});
        if(user){
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if(isValidPassword){
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.SECRET_KEY, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            }
            else{
                res.status(401).json({
                    "error": "Authetication failed!"
                });
            }
        }
        else{
            res.status(401).json({
                "error": "Authetication failed!"
            });
        }
    }
    catch{
        res.status(500).json({
            error: "something wrong!"
        })
    }
})


module.exports = userRouter;