const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async(req,res)=>{
    try {
        
        const{name,email,password,role}  = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                Message:"User already exist",
                Success:false
            })
        }
       // hashing
       let hashPass
        try{
            hashPass = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                Message:"Not able to hash",
                Success:false,
            })
        }


        //creating user;
        const user = await User.create({
            name,
            email,
            password:hashPass,
            role
        })
        return res.status(200).json({
            data: user,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Message:"Internal server error",
            Success:false,
        })
    }
}
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email){
            return res.status(400).json({
                Message:"enter email id"
            });
        }
        if(!password){
            return res.status(400).json({
                Message:"enter password"
            });
        }
        let emailExist = await User.findOne({email});
        if(!emailExist){
            return res.status(400).json({
                Message:"email id is not signed in"
            });
        }
        //password check;
        if(!(await bcrypt.compare(password,emailExist.password))){
            return res.status(400).json({
                Message:"invalid password"
            });
        }
        const payload = {
            email:emailExist.email,
            id :emailExist._id,
            role:emailExist.role,
        }
        let token = jwt.sign(payload,
            process.env.JWT_SEC,
            {
                expiresIn:"2h"
            },

        );
        // const oldUser = {...emailExist,token,}
        // oldUser.password = undefined;
        emailExist = emailExist.toObject();
        emailExist.token = token;
        emailExist.password = "undefined";
        console.log(emailExist)
        const options= {
            expiresIn: new Date(Date.now() + 30000),
            httpOnly:true
        }
        return res.cookie("token",token,options).status(200).json({emailExist,token,success:true});

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            Message:"internal server error"
        });
    }
}
exports.student = async(req,res)=>{
    try{
        res.status(200).json({
            Message:"login successfull student",
            success:true,

        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            Message:"internal server error"
        });
    }
}
exports.admin = async(req,res)=>{
    try{
        res.status(200).json({
            Message:"login successfull admin",
            success:true,

        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            Message:"internal server error"
        });
    }
}