const mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://jay999x:Royce333%409@cluster0.rmdbi.mongodb.net/");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const User = new Schema({
    name: String,
    email: String,
    password: String
});

const Todo = new Schema({
    userId: objectId,
    title: String,
    done: Boolean
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todoss', Todo);

module.exports = {
    UserModel,
    TodoModel
}