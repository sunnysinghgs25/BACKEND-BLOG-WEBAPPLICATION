const cloudinary = require('cloudinary').v2
require("dotenv").config()
const cloudinaryConnect = ()=>{
    try {
        cloudinary.config({ 
            cloud_name: "dy9qdskeg", 
            api_key:  331716334972695, 
            api_secret: "eonLySothk0fcLQbaxThwItghyM" // Click 'View API Keys' above to copy your API secret
        });


    console.log(" connected to cloudinary")
    } catch (error) {
        console.log(error)
    }
}
module.exports = cloudinaryConnect;