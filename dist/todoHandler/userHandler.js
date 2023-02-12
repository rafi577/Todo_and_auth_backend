"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userExpress = require('express');
const bcrypt = require('bcrypt');
const userMongose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModelSchema = require('../Schema/userSchema');
const userRouter = userExpress.Router();
const userModel = new userMongose.model("user", userModelSchema);
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashPassowrd = yield bcrypt.hash(req.body.password, 10);
        const newUser = new userModel({
            name: req.body.name,
            user_name: req.body.user_name,
            password: hashPassowrd
        });
        console.log(newUser);
        yield newUser.save();
        res.status(200).json({
            message: "signup successful."
        });
    }
    catch (_a) {
        res.status(500).json({
            message: "signup failed!"
        });
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.find({ user_name: req.body.user_name });
        if (user) {
            const isValidPassword = yield bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
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
            else {
                res.status(401).json({
                    "error": "Authetication failed!"
                });
            }
        }
        else {
            res.status(401).json({
                "error": "Authetication failed!"
            });
        }
    }
    catch (_b) {
        res.status(500).json({
            error: "something wrong!"
        });
    }
}));
module.exports = userRouter;
