const router = require("express").Router();
const passport = require("passport");

const Client_URL = "http://localhost:3000";

router.get("/login/success", (req,res)=>{
    if(req.user){
        res.status(200).json({
            success:true,
            message:"successfull",
            user:req.user
        });
    }
})

router.get("/login/failure", (req,res)=>{
    res.status(401).json({
        success:false,
        message:"Failed",
    });   
});

router.get("/logout", (req,res)=>{
    req.logOut();
    res.redirect("http://localhost:3000");
});

router.get("/google",
    passport.authenticate("google", {
        scope: [ "profile" ]
}));

router.get("/google/callback",
    passport.authenticate("google",{
        successRedirect: Client_URL,
        failureRedirect: "/login/failure"
}));

module.exports=router