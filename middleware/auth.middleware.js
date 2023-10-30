const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.username=decoded.username
                req.body.userId=decoded.userId
                next()
            }else{
                res.status(400).send({"msg":"token not verified"})
            }
        })
    }else{
        res.status(400).send({"msg":"please login"})
    }
}

module.exports={auth}