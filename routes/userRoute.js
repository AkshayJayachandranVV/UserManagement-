const express=require("express");
const route=express.Router();
const bodyParser=require("body-parser");
const user = require("../controllers/userController");
const session=require("express-session")

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}))


route.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

route.use(session({
    secret:'idk',
    resave:false,
    saveUninitialized:false
}))


route.get("/",(req,res)=>{
    if(req.session.authenticated)
    {

     res.redirect("/login")
    }
   
    else{
        res.render("login",{usernotfound:req.query.errpassword,invaliduser:req.query.errusername})
        // res.render("login")
    }
    
})


 route.post("/",user.checkUserIn)



 route.get("/login",(req,res)=>
 {
    console.log("heloo")
    if(req.session.authenticated)
    {
           res.redirect(`/home/${req.session.username}`)
    }
    else{
        const message=req.query.message;
        res.render("login",{message})
        // res.render("userHome")
    }
   
 })



 route.get("/userLogout",user.userExit)




 function signedIn(req,res,next){
    if(req.session.authenticated)
    {
         next();
    }
    else
    {
        res.redirect("/")
    }
}
   


route.get("/home/:username",signedIn,(req,res)=>
{
    console.log("33333")
    res.render("userHome",{welcome:req.params.username})
})


function userSign(req,res,next)
{
    if(req.session.authenticated)
    {
        res.redirect(`/home/${req.session.username}`)
    }
    else{
       next()
    }
}

route.get("/signup",userSign,(req,res)=>
{
    res.render("signup");
})

route.post("/signup",user.addUser)

//error page
route.get("/error",(req,res)=>{

  res.render("error",{errorMessage:message})    
})




// route.post("/valuefound",user.userchecking)




route.get('**',(req,res)=>{
    res.status(400).render('error',{errorMessage:"oops invalid request"})
})


module.exports=route;