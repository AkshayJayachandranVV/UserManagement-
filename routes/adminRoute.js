const express=require("express");
const admin=require("../controllers/adminController")
const bodyParser=require("body-parser")
const session = require('express-session');


const route=express();
route.use(bodyParser.urlencoded({ extended: true }));

route.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});



route.use(session({

    secret:"admin-secret",
    resave:false,
    saveUninitialized:false
}))


route.post("/",(req,res)=>{

     

})



route.get("/",(req,res)=>{
    if(req.session.auth)
    {
        
        console.log("username diplayed back")
        console.log(req.session.username)
        // res.redirect('/admin/adminPanel')
        // res.redirect('/admin/adminPanel/${req.session.username}')
        res.redirect(`/admin/adminPanel/${req.session.username}`)
        // console.log("entered 2")

    }else{
        
       
        res.render("adminLogin",{usernotfound:req.query.wrongname,invalidpassword:req.query.wrongpass});
    
    }
    
});        





//update User

route.get("/updateuser",(req,res)=>
{
    res.render("updateUser")    
})





//edit User

route.get("/editUser",adminLogged,(req,res)=>
{
    console.log(req.query.username)
    console.log(req.query.email)
    res.render("updateUser",{oldusername:req.query.username,oldemail:req.query.email});
})
route.post("/editUser",admin.updateUser)

//Authenticating admin
route.post("/",admin.checkAdmin);


function adminLogged(req,res,next)
{
    console.log("admin entered")
    if(req.session.auth)
    {
        console.log("session entered")
        next();
    }
    else{
        console.log("else session enetered")
        res.redirect("/")
    }
}

route.get('/adminPanel/:username',adminLogged,async (req,res)=>{

    

    const userData= await admin.showuser()
    // console.log(userData)
    res.render('adminPanel',{name:req.params.username,userData})
})

route.post("/adminPanel/:username",admin.sercheduser)



route.get('/logout',admin.adminExit)


route.post("/removeUser",admin.deleteuser)

module.exports=route;