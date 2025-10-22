const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req,res,next)=>{
    try{
        console.log(req.body.token)
        console.log("new line")
        console.log(req.cookies.token)
        console.log("header file \n")
        console.log(req.header("Authorization").replace("Bearer ",""));


        const token = req.cookies.token//||req.header("Authorization").replace("Bearer ","")||req.body.token;
        if(!token){
            return res.status(404).json({
                message:"Token missing",
                Success:false

            })
        }
        //verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SEC);
            console.log(decode);
            req.user = decode;
        }catch(error){
            return res.status(401).json({
                message:"invalid token"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            message:"internal server error",
            Success:false,
        })
    }
    
}
exports.isStudent = (req,res,next)=>{
    try {
        if(req.user.role!=="Student"){
            return res.status(401).json({
                message:"youre not student",
                success:false,
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            Success:false,
        })
    }
}
exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                message:"youre not admin",
                success:false,
            })
        }
        next();

    } catch (error) {
        return res.status(500).json({
            message:"internal server error",
            Success:false,
        })
    }
}