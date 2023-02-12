const express2 = require('express');
const todoMongoose  = require('mongoose');
const todoSchemaModel = require('../Schema/todoSchema')
const loginCheck = require('../middlewares/checkLogin');

const router = express2.Router();
const todoModel =new todoMongoose.model('WORK',todoSchemaModel);


//get details by id
router.get('/:id',loginCheck,async(req:any,res:any)=>{
    try {
        const data = await todoModel.find({ _id: req.params.id });
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
})


//get all details
router.get("/",loginCheck,  (req:any, res:any) => {
    todoModel.find({},(err:any,todos:any)=>{
        if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
              data : todos.map((data:any)=>{
                return {
                    titile : data.title
                }
              }),
              message:"success"
            });
          }
    })
  });



//post todo
router.post('/',loginCheck,(req:any,res:any)=>{
    const newTodo = new todoModel(req.body);
    console.log(newTodo);
    newTodo.save((err:any)=>{
        if(err){
            res.status(500).json({
                message : "there is an error!"
            });
        }
        else{
            res.status(200).json({
                message : "todo saved successfully!"
            });
        }
    })
});


//update todo with id
router.put('/:id',loginCheck,(req:any,res:any)=>{
    todoModel.findByIdAndUpdate(req.params.id,req.body,(err:any,data:any)=>{
        if(err){
            res.status(500).json({
                error : "could not updated"
            });
        }
        else{
            res.status(200).json({
                prev : data,
                updated : req.body
            })
        }
    })
})


//remove todo with id
router.delete('/:id',loginCheck,(req:any,res:any)=>{
    todoModel.findByIdAndDelete(req.params.id,(err:any)=>{
        if(err){
            res.status(404).json({
                error : "Todo not founded"
            })
        }
        else{
            res.status(200).json({
                message : "todo was successfully deleted"
            })
        }
    })
})

module.exports = router;