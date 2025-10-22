const Post = require("../models/post.js");



exports.createPost = async(req,res)=>{
    try{
        const {title,body} = req.body;
        const post = new Post({title,body});
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"INTERNAL SERVER ERROR",
            success:false
        })
    }
}

exports.getPost = async(req,res)=>{
    try{

        const post = await Post.find({}).populate("comments").exec();
        res.status(200).json(post);

    }
    catch(error){
        console.log(error);
        
        res.status(500).json({
            message:"INTERNAL SERVER ERROR",
            success:false
        })
    }
}
exports.getPostById=async(req,res)=>{
   try{
    const{id} = req.params;
    const post  = await Post.findById({_id:id}).populate("comments").exec();
    
    
    res.status(200).json(post);
   }
   catch(error){
    res.status(500).json({
        message:"INTERNAL SERVER ERROR",
        success:false
    })
   }
}