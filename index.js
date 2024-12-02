const express = require('express');
const app = express();
const {auth, JWT_SECRET} = require('./auth')
const {UserModel, TodoModel} = require("./db");

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jay999x:Royce333%409@cluster0.rmdbi.mongodb.net/todo-app");
app.use(express.json());


app.post("/signup", async function(req, res){
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;

await UserModel.create({
    name: name,
    email: email,
    password: password

});

res.json({
    message:"User Created Succesfully"
})
});

app.post("/signin", async function(req, res){

const name = req.body.name;
const email = req.body.email;
const password = req.body.password ;
 const user = await UserModel.findOne({
       
        email:email,
        password: password

    });
    if(user){
        const token = jwt.sign({
            id: user._id.toString() 
        },JWT_SECRET);

        res.json({
            token
        })
    }

    else{
        res.status(403).json({
            message: 'Invalid user Credentials'
        })
    }

});

app.post("/todo", auth,  async function(req, res){

    const title = req.body.title;
    const done = req.body.done;
    const userId = req.userId;

    await TodoModel.create({
        userId: userId,
        title: title,
        done: done


    });
    res.json({
        message:"Todo Created"
    })
});

app.get("/todos", auth, async function(req, res){

const User = req.userId;
console.log(User)
const todo = await TodoModel.find({
    UserId: User._id
});
console.log(todo)
res.json({
    todo
})



});

app.listen(3000);