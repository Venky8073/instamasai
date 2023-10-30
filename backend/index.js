const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./router/user.router")
const { postRouter } = require("./router/post.router")

const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to insta masai')
})

app.use('/users',userRouter)
app.use('/posts',postRouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log("DB running")
    }catch(err){
        console.log(err)
    }
})