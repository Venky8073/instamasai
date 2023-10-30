const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const { userModel } = require('../models/user.model')
// const { blacklistmodel } = require('../models/blacklist.model')

const userRouter=express.Router()

userRouter.post('/register',async(req,res)=>{
    const obj=req.body
    try{
        const find=userModel.findOne({email:obj.email})
        // console.log(find)
        if(find.email){
            res.status(200).send({"msg":"user already exist"})
        }
        else{
            bcrypt.hash(obj.password,2,async(err,hash)=>{
                if(hash){
                    const user=new userModel({...obj,password:hash})
                    await user.save()
                    res.status(200).send({"msg":"user added","user":user})
                }
                else{
                    res.status(400).send({"msg":"error in hashing"})
                }
            })
        }
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const find=await userModel.findOne({email})
        if(find){
            bcrypt.compare(password,find.password,(err,result)=>{
                if(err){
                    res.status(400).send({"msg":err})
                }else{
                    const token=jwt.sign({username:find.name,userId:find._id},"masai")
                    bcrypt.compare(password,find.password,(err,result)=>{
                        if(result){
                            res.status(200).send({"msg":"logged in","token":token})
                        }else{
                            res.status(400).send({"msg":err})

                        }
                    })
                }
            })
        }else{
            res.status(400).send({"msg":"wrong password"})
        }
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

userRouter.get('/logout',async(req,res)=>{
    let token=req.header.authorization.split(' ')[1]
    try{
        let blocklist= new blacklistmodel({token})
        await blocklist.save()
        res.status(200).send({"msg":"logged out"})
    }catch(err){

    }
})

module.exports={userRouter}