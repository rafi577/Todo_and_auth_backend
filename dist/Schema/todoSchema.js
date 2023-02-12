"use strict";
const schemaMongose = require('mongoose');
const todoSchema = new schemaMongose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'] //one for active and inactive is valid ohter ways it will be error
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = todoSchema;
