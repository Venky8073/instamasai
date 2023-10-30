const mongoose=require('mongoose')

const blacklistSchema=mongoose.Schema({
    token:String
},{
    versionKey:false
})

const blacklistmodel=mongoose.model("blacklist",blacklistSchema)

module.exports={blacklistmodel}