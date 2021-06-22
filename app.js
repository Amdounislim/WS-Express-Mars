const express = require('express')
const app = express()

// app.get("/", (req, res)=>{
//     res.send('welcome to app.js')
// })

app.use(express.json())

let users = [
    { name: "Youssef", age: 31, id: 1 },
    { name: "Aymen", age: 37, id: 2 },
    { name: "Islem", age: 28, id: 3 }
]
console.log(users)


//Get all users
//Get  "/users"
app.get("/users", (req, res) => {
    res.status(200).json(users)
})

//Add new user
//Post "/users"
app.post("/users", (req, res) => {
    let newUser = { ...req.body, id: Math.random() }
    users.push(newUser)
    res.status(200).json({
        msg: "User added with success",
        users
    })
})


//Delete user
//Delete '/users/:id'
app.delete("/users/:id", (req, res) => {
    let id = Number(req.params.id);
    users = users.filter(el => el.id !== id);
    res.status(200).json({
        msg: "User has been deleted",
        users
    })
})

//Update user
//Put "/users/:id"
app.put("/users/:id", (req, res) => {
    let id = Number(req.params.id);

    users = users.map(el => el.id === id ? { ...el, ...req.body } : el)
    res.status(200).json({
        msg: "User has been updated",
        users
    })
})

const port = process.env.PORT || 7000
app.listen(port, err => {
    err ? console.log(err) : console.log(`the server is running on port http://localhost:${port}`)
})