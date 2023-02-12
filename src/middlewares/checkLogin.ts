
const jwt2 = require('jsonwebtoken');

const checkLogin = (req:any,res:any,next:any)=>{
    const {authorization} = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decode = jwt2.verify(token,process.env.SECRET_KEY)
        const {userName,userId} = decode;
        req.userName = userName;
        req.userId = userId;
        next();
    }
    catch{
        next("Auth failed!");
    }
    
}


module.exports = checkLogin;