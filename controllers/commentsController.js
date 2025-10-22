const Post  = require("../models/post.js");
const Comment = require("../models/commentsModel.js");

exports.creatComment = async(req,res)=>{
    try {
        const{post,user,body} = req.body;
        const comment = new Comment({post,user,body})
        const savedComment = await comment.save();

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new :true}).populate("comments")
        .exec();
                            
        res.status(200).json(updatedPost);
    } catch (error) {

        console.log(error)
        res.status(500).json({
            message:"INTERNAL SERVER ERROR",
            success:false
        })
    }
}