const Todos = require("../models/todo.model")

const { getPostData } = require("../utils")

async function getTodos(req, res) {
    try {
        const todos = await Todos.findAll()

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(todos))
    } catch (err) {
        console.error(err)
    }
}

async function getTodo(req, res, id) {
    try {
        const todo = await Todos.findById(id)

        if (!todo) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(todo))
        }


    } catch (err) {
        console.error(err)
    }
}

async function createTodo(req, res) {
    try {

        const body = await getPostData(req)

        const { title } = JSON.parse(body)

        const todo = {
            title,
        }

        const newTodo = await Todos.create(todo)

        res.writeHead(201, { "Content-Type": "application/json" })
        return res.end(JSON.stringify(newTodo))

    } catch (err) {
        console.error(err)
    }
}

async function updateTodo(req, res, id) {
    try {
        const todo = await Todos.findById(id)

        if (!todo) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        }
        else {
            const body = await getPostData(req)

            const { title } = JSON.parse(body)

            const todoData = {
                title: title || todo.title
            }

            const updTodo = await Todos.update(id,todoData)

            res.writeHead(200, { "Content-Type": "application/json" })
            return res.end(JSON.stringify(updTodo))
        }


    } catch (err) {
        console.error(err)
    }
}

async function deleteTodo(req, res, id) {
    try {
        const todo = await Todos.findById(id)

        if (!todo) {
            res.writeHead(404, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: "Product Not Found" }))
        }
        else {
            await Todos.remove(id)
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({message: `Product ${id} remove`}))
        }


    } catch (err) {
        console.error(err)
    }
}


module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
}