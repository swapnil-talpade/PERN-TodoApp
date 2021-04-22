import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo'

const ListTodos = () => {

    const [todos, setTodos] = useState([])
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos")  //not using method:GET because my default fetch uses GET
            const jsonData = await response.json();
            console.log(jsonData)
            setTodos(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        getTodos()

    }, [])
    // console.log(todos)


    // delete function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
            })
            console.log(deleteTodo)
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)

        }
    }
    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>{<EditTodo todo={todo} />}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>))}
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos
