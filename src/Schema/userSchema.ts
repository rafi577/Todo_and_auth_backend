const schemaUsers = require('mongoose');


const userSchema = new schemaUsers.Schema({
    name : {
        type:String,
        require : true
    },
    user_name:{
        type : String,
        require : true
    },
    password :{
        type : String,
        require: true
    },
    status : {
        type: String,
        enum : ['active','inactive']
    }
});


module.exports = userSchema;