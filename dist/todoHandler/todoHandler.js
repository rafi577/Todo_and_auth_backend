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
const express2 = require('express');
const todoMongoose = require('mongoose');
const todoSchemaModel = require('../Schema/todoSchema');
const loginCheck = require('../middlewares/checkLogin');
const router = express2.Router();
const todoModel = new todoMongoose.model('WORK', todoSchemaModel);
//get details by id
router.get('/:id', loginCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield todoModel.find({ _id: req.params.id });
        res.status(200).json({
            result: data,
            message: "Success",
        });
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
}));
//get all details
router.get("/", loginCheck, (req, res) => {
    todoModel.find({}, (err, todos) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        }
        else {
            res.status(200).json({
                data: todos.map((data) => {
                    return {
                        titile: data.title
                    };
                }),
                message: "success"
            });
        }
    });
});
//post todo
router.post('/', loginCheck, (req, res) => {
    const newTodo = new todoModel(req.body);
    console.log(newTodo);
    newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                message: "there is an error!"
            });
        }
        else {
            res.status(200).json({
                message: "todo saved successfully!"
            });
        }
    });
});
//update todo with id
router.put('/:id', loginCheck, (req, res) => {
    todoModel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "could not updated"
            });
        }
        else {
            res.status(200).json({
                prev: data,
                updated: req.body
            });
        }
    });
});
//remove todo with id
router.delete('/:id', loginCheck, (req, res) => {
    todoModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(404).json({
                error: "Todo not founded"
            });
        }
        else {
            res.status(200).json({
                message: "todo was successfully deleted"
            });
        }
    });
});
module.exports = router;
