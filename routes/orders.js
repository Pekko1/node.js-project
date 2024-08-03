const express = require ("express")
const router = express.Router()

const orders = [
    {id:1, user: "mario-rossi", products:["chair", "table"], date: new Date ("2024-01-15")},
    {id:2, user: "laura-verdi", products:["sofa"], date: new Date ("2024-02-20")},
    {id:3, user: "luca-viola", products:["chair", "sofa"], date: new Date ("2024-03-05")}
]

router.get("/", (req,res)=>{
    const {startDate, endDate, product} = req.query

    let filteredOrders = orders

    if(startDate || endDate){
        const start = startDate? new Date(startDate) : new Date(-8640000000000000)
        const end = endDate? new Date(endDate) : new Date()
        filteredOrders = filteredOrders.filter(order => order.date >= start && order.date <= end)
    }

    if(product){
        filteredOrders = filteredOrders.filter(order => order.products.includes(product))
    }

    res.status(200).json(filteredOrders)
})

router.get("/:id", (req,res) => {
    const {id} = req.params
    const order = orders.find(o => o.id === parseInt(id))

    if(order){
        res.status(200).json(order)
    }else{
        res.status(404).send("order not found")
    }
})

router.post("/", (req, res)=>{
    const {user, products} = req.body
    if(!user || !Array.isArray(products) || products.length === 0){
        return res.status(400).send("element are required")
    }

    const newId = orders.length + 1
    const newOrder = {
        id:newId,
        user,
        products,
        date: new Date()
    }
    orders.push(newOrder)
    res.status(201).json(newOrder)
})

router.put("/:id", (req,res)=>{
    const {id} = req.params
    const {user, products} = req.body

    const orderIndex = orders.findIndex(o => o.id === parseInt(id))

    if(orderIndex === -1){
        return res.status(404).send("order not found")
    }

    if(user !== undefined) orders[orderIndex].user = user
    if(Array.isArray(products)) orders[orderIndex].products = products

    res.status(200).json(orders[orderIndex])
})

router.delete("/:id", (req,res) => {
    const {id} = req.params
    const orderIndex = orders.findIndex(o => o.id === parseInt(id))

    if(orderIndex !== -1){
        orders.splice(orderIndex, 1)
        res.status(200).send("order deleted")
    }else{
        res.status(404).send("order not found")
    }
})

module.exports = router