"use strict";
const jwt2 = require('jsonwebtoken');
const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decode = jwt2.verify(token, process.env.SECRET_KEY);
        const { userName, userId } = decode;
        req.userName = userName;
        req.userId = userId;
        next();
    }
    catch (_a) {
        next("Auth failed!");
    }
};
module.exports = checkLogin;
