const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");  // for the environment variables i mean .env
const cors = require("cors");
const path =  require("path");

//model
const Product = require("./models/productModel");

const app = express(); //  Calls the express function "express()" and puts new Express application inside the app variable (to start a new Express application). It's something like you are creating an object of a class. Where "express()" is just like class and app is it's newly created object.
dotenv.config();


//middleware
app.use(express.json());
app.use("/users",userRoutes);

//  -----------------deployment----------------------------

__dirname = path.resolve();
if(process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname,"/frontend/build")));

    app.get("*", (req,res) => {
            res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    });
}
else{
    app.get("/",(req,res) => {
        res.send("GET request called");
});
}

//  -----------------deployment----------------------------
    

//routes
app.get("/",(req,res) => {
        res.send("GET request called");
});


//POST REQUEST
app.post("/product",async (req,res) =>{
   try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
      
   }
   catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
   }
})

//GET REQUEST
app.get("/products", async(req,res) =>{
    try {
        const products  = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

//GET REQUEST BY ID
app.get("/product/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const product  = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

//PUT REQUEST
app.put("/product/:id", async(req,res) => {
    try {
        const {id}  = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message: `cannot find any product with Id ${id}`});
        }
        const updatedproduct  = await Product.findById(id);
        res.status(200).json(updatedproduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

//DELETE REQUEST
app.delete("/product/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const product  = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:`cannot find any product with Id ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})




const uri = "mongodb+srv://ggudla172:udaysaimongodb@mycluster1.uutv2gl.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to Mongodb");
    } catch (error) {
        console.error(error);
    }
}

connect();
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

