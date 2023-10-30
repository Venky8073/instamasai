const express=require('express')
const { postModel } = require('../models/post.model')
const {auth}=require("../middleware/auth.middleware")

const postRouter=express.Router()

postRouter.use(auth)

postRouter.post('/add',async(req,res)=>{
    try{
        const added=new postModel(req.body)
        await added.save()
        res.status(200).send({"msg":"post added successfully","post":added})

    }catch(err){
        res.status(400).send({"msg":err})
    }
})

postRouter.get('/',async(req,res)=>{
    try{
        const posts=await postModel.find({userId:req.body.userId})
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({"msg":err})

    }
})

postRouter.patch('/update/:id',async(req,res)=>{
    const id=req.params.id
    try{
        await postModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"post updated"})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

postRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const find=await postModel.findOne({_id:id})
        if(find){
            await postModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"deleted succeefully"})

        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={postRouter}