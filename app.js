const express = require("express")  
const app = express()
const port = 3000
const productsRouter = require("./routes/products")
const usersRouter = require("./routes/users")
const orderRouter = require("./routes/orders")

app.use(express.json())

app.use("/api/products", productsRouter)
app.use("/api/users", usersRouter)
app.use("/api/orders", orderRouter)

// base
app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`)
})