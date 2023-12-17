const express=require('express')
const app=express();
const userRoute=require("./routes/userRoute")
const adminRoute=require("./routes/adminRoute")
const bodyParser=require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/admin",adminRoute);
app.use("/",userRoute);


app.set("view engine","hbs")
app.set("views","./views")

// app.get("/",(req,res)=>
// {
//     res.render("login");
// });


app.listen(3000,()=>{
    console.log("connection established")
})