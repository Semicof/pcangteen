const express = require("express");
const router = express.Router();
const Receipt =  require("../models/Receipt");

router.get("/",async(req,res)=>{
   try {
      const Receipts = await Receipt.find();
      res.json(Receipts);     
   } catch (error) {
       res.status(500).json({message:error.message});
   }
})

router.get("/:id",async(req,res)=>{
   try {
       const Receipt  = await Receipt.findById(req.params.id);
       res.json(Receipt);
   } catch (error) {
       res.status(500).json({message:error.message});
   }
})

router.delete("/:id",async(req,res)=>{
   try {
       await Receipt.findByIdAndDelete(req.params.id);
       res.json({message:"Delete successfully!"});
   } catch (error) {
       res.status(500).json({message:error.message});
   }
})

module.exports = router;