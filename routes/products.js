const express = require ("express")
const router = express.Router()

const products=[
    {id: 1, name: `product 1` },
    {id: 2 ,name: `product 2` },
    {id: 3, name: `product 3` }
]

// show all products
router.get("/", (req,res)=>{
    res.status(200).json(products)
})

// show one product
router.get("/:id", (req,res)=>{
    const {id} = req.params
    const product = products.find(p => p.id === parseInt(id))

    if(product){
        res.status(200).json(product)
    }else{
        res.status(404).send("Product not found")
    }
})

// add one product
router.post("/", (req,res)=>{
    const {name} = req.body
    if(!name){
        return res.status(400).send("product name is required")
    }

    const newId = products.length + 1
    const newProduct = {
        id:newId,
        name
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

// edit a product
router.put("/:id", (req,res)=>{
    const {id} = req.params
    const {name} = req.body

    if(!name){
        return res.status(400).send("product name is required")
    }

    const product = products.find(p => p.id === parseInt(id))
    if(product){
        product.name = name
        res.status(200).json(product)
    }else{
        res.status(404).send("product not found")
    }
})

// delete one product
router.delete("/:id", (req,res)=>{
    const {id} = req.params
    const productIndex = products.findIndex(p => p.id === parseInt(id))

    if(productIndex !== -1){
        products.splice(productIndex, 1)
        res.status(200).send("product deleted")
    }else{
        res.status(404).send("product not found")
    }
})

module.exports = router