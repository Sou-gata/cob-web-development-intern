const express = require("express");
const router = express.Router();

const {
    addTodo,
    allTodos,
    // completedTodos,
    // incompleteTodos,
    makeComplete,
    makeIncomplete,
    getTheTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todo.controllers");

router.post("/add", addTodo);
router.get("/all", allTodos);
router.get("/make-completed/:id", makeComplete);
router.get("/make-incomplete/:id", makeIncomplete);
router.get("/todo/:id", getTheTodo);
router.patch("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);
// router.get("/completed", completedTodos);
// router.get("/incomplete", incompleteTodos);

module.exports = router;
