const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_commets:Number,
    username:String,
    userId:String
},{
    versionKey:false
})

const postModel=mongoose.model("post",postSchema)

module.exports={postModel}


// {
//     "title":"dddd",
//     "body":"ddddd",
//     "device":"mobile",
//     "no_of_commets":20
//   }