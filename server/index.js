const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// routes

// create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})


// get all todo
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// get a todo
app.get("/todos/:todoId", async (req, res) => {
    try {
        console.log(req.params)
        const { todoId } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id=($1)", [todoId]
        );
        res.json(todo.rows);
    } catch (error) {
        console.log(error.message);
    }
})


// update a todo
app.put("/todos/:todoId", async (req, res) => {
    try {
        console.log(req.params)
        const { todoId } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description=($1) WHERE todo_id=($2)", [description, todoId]
        );
        res.json('todo was updated');
    } catch (error) {
        console.log(error.message);
    }
})

// delete a todo
app.delete("/todos/:todoId", async (req, res) => {
    try {
        console.log(req.params)
        const { todoId } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id=($1)", [todoId]
        );
        res.json('todo was deleted');
    } catch (error) {
        console.log(error.message);
    }
})



app.listen(5000, () => {
    console.log('server has started on port 5000')
})