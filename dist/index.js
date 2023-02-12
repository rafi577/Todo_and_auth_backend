"use strict";
const express = require('express');
const mongoose = require('mongoose');
const TodoHandler = require('./todoHandler/todoHandler');
const userHandler = require('./todoHandler/userHandler');
//express app initialization
const app = express();
app.use(express.json());
require('dotenv').config();
/**
working with treat,
treat pull,

**/
//application route
app.use('/todo', TodoHandler);
app.use('/user', userHandler);
//database connection with mongoose
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { dbName: "Collections", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("connected to database...");
})
    .catch((err) => console.log(err));
console.log(process.env.MONGO_URL);
// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};
app.use(errorHandler);
app.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}...`);
});
