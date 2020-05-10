const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Detail =  mongoose.model("Detail")





router.get('/detail/:id',requireLogin,(req,res)=>{
    let id = req.params.id ;
    Detail.find({postedBy:id})
    .populate("postedBy","_id name pic")
 
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myDetail',requireLogin,(req,res)=>{
    Detail.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})





router.post('/createDetail',requireLogin,(req,res)=>{
    const {school,college,experience,hobbies,about} = req.body 
  
    req.user.password = undefined
    const detail = new Detail({
        school,college,experience,hobbies,about,
        postedBy:req.user
    })
    detail.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})










module.exports = router