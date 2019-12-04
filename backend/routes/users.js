const express = require("express");

const User = require("../model/user");

const router = express.Router();

router.post("/signup",(req,res,next)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    user.save()
    .then(savedUser => {
        res.status(201).json({
            message: "User added successfully",
            user: {
              ...savedUser,
              id: savedUser._id
            }
          });
    });

});

router.post("/login", (req,res,next)=>{
    const queryString = {email:req.body.email, password:req.body.password};
    User.findOne(queryString)
    .then(user=>{
        if(req.body.email == user.email && req.body.password == user.password){
            return res.status(200).json({
                message:"Auth Successful!!"
              });
        } else {
            return res.status(401).json({
                message:"Auth failed!!"
              });
        }
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed"
          });
    })
})

module.exports = router;