const express = require("express");
const dbConnect = require("./config/dbConnect.js");
const cloudinaryConnect = require("./config/cloudinary.js");
const app = express();
require('dotenv').config();


const  cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));


const postRoute = require("./routes/Post.js");
app.use("/api/v1",postRoute);
const authRoute = require("./routes/auth.js");
app.use("/api/v1",authRoute);



cloudinaryConnect();
const fileRoute = require("./routes/fileUpload.js")
app.use("/api/v1/upload",fileRoute);


app.listen(3000,()=>{
    console.log(`Running on Port ${3000}`);
})
dbConnect();
