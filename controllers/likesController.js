const Like = require("../models/likesModel.js");
const Post  =require("../models/post.js");

exports.likePost = async(req,res)=>{
    try{
        const{post,user} = req.body;
        const like = new Like({post,user});
        const savedLike = await like.save();
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new :true}).populate("likes").exec();
        res.status(200).json(updatedPost);
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:"INTERNAL SERVER ERROR",
            success:false
        })
    }
}
exports.deleteLike = async(req,res)=>{
    try{
        const {post,like} = req.body;
        const deleteLike = await Like.findOneAndDelete({post:post,_id:like})
        const deletePost = await Post.findByIdAndUpdate(post,{$pull:{likes:deleteLike._id}},{new:true});
        res.status(200).json(deletePost);
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"INTERNAL SERVER ERROR",
            success:false
        })
    }
}