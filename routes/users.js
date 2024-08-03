const express = require ("express")
const router = express.Router()

const users=[
    {id: 1, name: "Mario", surname: "Rossi", email:"mario-rossi@gmail.com"},
    {id: 2 ,name: "Laura", surname: "Verdi", email:"laura-verdi@gmail.com"},
    {id: 3, name: "Luca", surname: "Viola", email:"luca-viola@gmail.com"}
]

router.get("/", (req,res)=>{
    res.status(200).json(users)
})

router.get("/:id", (req,res)=>{
    const {id} = req.params
    const user = users.find(u => u.id === parseInt(id))

    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).send("User not found")
    }
})

router.post("/", (req,res)=>{
    const {name, surname, email} = req.body
    if(!name || !surname || !email) {
        return res.status(400).send("elements are required")
    }

    const newId = users.length + 1
    const newUser = {
        id:newId,
        name,
        surname,
        email
    }
    users.push(newUser)
    res.status(201).json(newUser)
})

router.put("/:id", (req, res)=>{
    const {id} = req.params
    const {name, surname, email} = req.body

    const userIndex = users.findIndex(u => u.id === parseInt(id))

    if(userIndex === -1){
        return res.status(404).send("user not found")
    }
    
    if(!name && !surname && !email){
        return res.status(400).send("at least one camp is required")
    }

    if(name) users[userIndex].name = name
    if(surname) users[userIndex].surname = surname
    if(email) users[userIndex].email = email

    res.status(200).json(users[userIndex])
})

router.delete("/:id", (req,res)=>{
    const {id} = req.params
    const userIndex = users.findIndex(u => u.id === parseInt(id))

    if(userIndex !== -1){
        users.splice(userIndex, 1)
        res.status(200).send("user deleted")
    }else{
        res.status(404).send("user not found")
    }
})

module.exports= router