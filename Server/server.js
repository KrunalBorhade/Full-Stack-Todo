const http = require('http');
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require("./controllers/todo.controller")


const server = http.createServer((req, res) => {

    if (req.url === "/todos" && req.method == "GET") {
        getTodos(req, res)
    }
    else if (req.url.match(/\/todos\/([0-9]+)/) && req.method == "GET") {
        const id = req.url.split("/")[2]
        console.log("id")
        getTodo(req, res, id)
    }
    else if (req.url = "/todos" && req.method == "POST") {
        createTodo(req, res)
    }
    else if(req.url.match(/\/todos\/([0-9]+)/) && req.method=="PUT"){
        const id= req.url.split("/")[2]
        console.log("id2")
        updateTodo(req,res,id)
    }
    else if (req.url.match(/\/todos\/([0-9]+)/) && req.method == "DELETE") {
        const id1 = req.url.split("/")[2]
        console.log("id")
        deleteTodo(req, res, id1)
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: "Route not Found" }))
    }
})
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))