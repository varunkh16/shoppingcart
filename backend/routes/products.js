const express = require("express");

const Product = require("../model/product");

const router = express.Router();

router.post("/",(req,res,next)=>{
    const product = new Product({
        title:req.body.title,
        content:req.body.content
    })
    
    product.save().then(createdProduct => {
        console.log(createdProduct);
        res.status(201).json({
          message: "Product added successfully",
          product: {
            ...createdProduct,
            id: createdProduct._id
          }
        });
      });
});

router.put("/:id", (req,res,next)=>{
  const product = new Product({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content
})

  Product.updateOne({_id:req.params.id}, product)
  .then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });

})

router.get("/:id",(req,res,next)=>{
  Product.findById({_id:req.params.id}).then(
    product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
  });
});

router.get("",(req,res,next)=>{
  Product.find().then(documents=>{
    res.status(200).json({
      message: "Posts fetched successfully!",
      products: documents
    });
  })
})

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(
    result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }
  );
});

module.exports = router;