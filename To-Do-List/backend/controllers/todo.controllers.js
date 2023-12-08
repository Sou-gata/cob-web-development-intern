const Todo = require("../models/todos.model");
const { toSentenceCase } = require("../utils");

async function addTodo(req, res) {
    const { title, description, list, date, isCompleted = false } = req.body;
    if (!title) {
        return res.json({ success: false, message: "Title is required" });
    } else if (!description) {
        return res.json({ success: false, message: "Description is required" });
    } else if (!list) {
        return res.json({ success: false, message: "List is required" });
    } else if (!date) {
        return res.json({ success: false, message: "Date is required" });
    }
    const newTodo = new Todo({
        title: toSentenceCase(title),
        description: toSentenceCase(description),
        list: toSentenceCase(list),
        date,
        isCompleted,
    });
    try {
        await newTodo.save();
        res.status(201).json({ success: true, todo: newTodo });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
async function allTodos(req, res) {
    try {
        const todos = await Todo.find();
        res.status(200).json({ success: true, todos });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}
// async function completedTodos(req, res) {
//     try {
//         const todos = await Todo.find({ isCompleted: true });
//         res.status(200).json({ success: true, todos });
//     } catch (error) {
//         res.status(404).json({ success: false, message: error.message });
//     }
// }
// async function incompleteTodos(req, res) {
//     try {
//         const todos = await Todo.find({ isCompleted: false });
//         res.status(200).json({ success: true, todos });
//     } catch (error) {
//         res.status(404).json({ success: false, message: error.message });
//     }
// }
async function makeComplete(req, res) {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        todo.isCompleted = true;
        await todo.save();
        res.status(200).json({ success: true, todo });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
async function makeIncomplete(req, res) {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        todo.isCompleted = false;
        await todo.save();
        res.status(200).json({ success: true, todo });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
async function getTheTodo(req, res) {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        res.status(200).json({ success: true, todo });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

async function updateTodo(req, res) {
    const { id } = req.params;
    const { title, description, list, date, isCompleted } = req.body;
    try {
        const todo = await Todo.findById(id);
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (list) todo.list = list;
        if (date) todo.date = date;
        if (isCompleted) todo.isCompleted = isCompleted;
        await todo.save();
        res.status(200).json({ success: true, todo });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

async function deleteTodo(req, res) {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        res.status(200).json({ success: true, todo });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

module.exports = {
    addTodo,
    allTodos,
    // completedTodos,
    // incompleteTodos,
    makeComplete,
    makeIncomplete,
    getTheTodo,
    updateTodo,
    deleteTodo,
};
