exports.dummy = async(req,res)=>{
    try{
        res.status(200).json({
            message:"ALL OK HERE"
        });
    }catch(err){
        res.send(500).json({
            message :"internal server err",
        })
    }

}