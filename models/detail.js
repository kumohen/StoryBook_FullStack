const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const detailSchema = new mongoose.Schema({
    school:{
        type:String,
      
    },
   
    college:{
        type:String
       
    },
    experience:{
        type:String
    },
    hobbies:{
        type:String
    },
    about:{
        type:String
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
     },
   
})

mongoose.model("Detail",detailSchema)