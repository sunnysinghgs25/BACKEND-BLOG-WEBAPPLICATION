const File = require("../models/File.js");
const cloudinary = require("cloudinary").v2
exports.localFileUpload = async(req, res)=>{
    try {
        const {file} = req.files;
        console.log("FILE AA GYI JEE-->",file)


        const path = __dirname+"/files/"+Date.now()+ `.${file.name.split('.')[1]}`;


        console.log("path-->",path);
        file.mv(path,(error)=>{
            console.log(error)
        });
        res.status(200).json({
            Success:true,
            Message:"FILE UPLOADED"
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            Success:false,
            Message:"Internal server error"
        })
    }
}
async function clUpload(file,folder,quality){
    
    const option = {folder,
        resource_type:"auto",
    }
    if(quality){
        option.quality = quality;
    }
    console.log(file.tempFilePath)
   return await cloudinary.uploader.upload(file.tempFilePath,option)

}
function fileCheck (type,supportedTypes){
    return supportedTypes.includes(type);
}
exports.imageUpload = async(req,res)=>{
    try {
    const {name, tags,email} = req.body;
    const {file}  = req.files;
    console.log(file)
    const supportedTypes = ["jpg","jpeg","png"];

    const fileType = file.name.split('.')[1].toLowerCase()
    console.log(fileType);
    if(!fileCheck(fileType,supportedTypes)){
        return res.status(401).json({
            message:"Unsupported file type",
            success:false,
        })
    }
    const response = await clUpload(file, "project101")
    console.log(response);
    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl: response.secure_url,
    })
    res.status(200).json({
        message:"Uploaded",
        imageUrl:response.secure_url,
        success:true,
    })

}   catch(error){
    console.log(error);
    res.status(500).json({
    message:"internal server error",
    success:false,
    })
}
}
exports.videoUpload = async (req,res)=>{
    try {
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        const{file} = req.files;
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!fileCheck(fileType,supportedTypes)){
          return  res.status(401).json({
                message:"Unsupported file type",
                success:false,
            })
        }
        const response = await clUpload(file, "abc");
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            message:"Uploaded",
            imageUrl:response.secure_url,
            success:true,
        })




    } catch (error) {
        console.log(error);
    res.status(500).json({
            message:"internal server error",
            success:false,
        })
    }
}
exports.imageReducerUpload = async(req,res)=>{
    try{
        const {name, tags,email} = req.body;
         const {file}  = req.files;
        console.log(file)
    const supportedTypes = ["jpg","jpeg","png"];

    const fileType = file.name.split('.')[1].toLowerCase()
    console.log(fileType);
    if(!fileCheck(fileType,supportedTypes)){
        return res.status(401).json({
            message:"Unsupported file type",
            success:false,
        })
    }
    const response = await clUpload(file, "project101",10)
    console.log(response);
    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl: response.secure_url,
    })
    res.status(200).json({
        message:"Uploaded",
        imageUrl:response.secure_url,
        success:true,
    })

    }catch(error){
        res.status(500).json({
                message:"internal server error",
                success:false,
            })
    }
}