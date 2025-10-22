const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type:String,
    },
    email: {
        type: String,
    }
});


fileSchema.post("save",async (doc)=> {
    try{
        console.log("DOC", doc);
        let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            auth:{
                user:"sunnysinghgs25@gmail.com",
                pass:"wgdl odxi bewp ifcs",
            }

        })
        let info = await transporter.sendMail({
            from:"sunny",
            to:doc.email,
            subject:"new File uploaded",
            html:`<h2>uploaded!!!</h2> <a href = "${doc.imageUrl}">view</a>`
        })
        console.log(info);
    }
    catch(error){
        console.log(error);
    }
    
})
module.exports = mongoose.model("File",fileSchema);


