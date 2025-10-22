const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB CONNECTED on",process.env.DB_URL);
    }).catch((error)=>{
        console.log("Not able to connect")
        console.error(error.message)
        process.exit(1);
    })
}

module.exports = dbConnect;