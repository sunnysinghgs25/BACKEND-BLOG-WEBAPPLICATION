const express = require("express");
const router = express.Router();
const{login,signup, student, admin} = require("../controllers/auth.js")
const{auth,isStudent,isAdmin} = require("../middlewares/auth.js");

router.post("/login",login);
router.post("/signup",signup);
router.get("/student",auth,isStudent,student);
router.get("/admin",auth,isAdmin,admin);
router.get("/test",auth,(req,res)=>{
    res.status(200).json({
        message:"test route"
    })
})
module.exports = router;