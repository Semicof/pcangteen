 const express = require("express");
 const router = express.Router();
 const Product =  require("../models/Product");

 router.get("/",async(req,res)=>{
    try {
       const products = await Product.find();
       res.json(products);     
    } catch (error) {
        res.status(500).json({message:error.message});
    }
 })

 router.get("/:id",async(req,res)=>{
    try {
        const product  = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
 })

 router.post("/",async(req,res)=>{
    const product = new Product(req.body);
    try {
        const newProduct  = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
 })

 router.patch("/:id",async(req,res)=>{
    try {
        const updatedProduct  = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
 })

 router.delete("/:id",async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Delete successfully!"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
 })

 module.exports = router;