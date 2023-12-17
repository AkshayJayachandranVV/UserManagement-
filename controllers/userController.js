const user = require("../models/userModel")
const bcrypt = require("bcrypt")


const addUser = async (req, res) => {

    const nameExists = await user.findOne({ username: req.body.username })
    console.log("username")
    
    try {
        if (nameExists) {
            res.redirect("/signup?message=user name already exists")
            console.log(nameExists)
        }
        else {
            console.log("notfound")
            const hashedpassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new user({
                username: req.body.username,
                password: hashedpassword,
                email:req.body.email,
                isAdmin:0
            })
            await newUser.save()
            res.redirect("/");
        }
    } catch (e) {

        console.log(e.message);
        res.redirect('/error?message= something went wrong!') 
    }

}




const checkUserIn=async(req,res)=>{
    try{
        const checkUser=await user.findOne({username:req.body.username})
        console.log(checkUser);
        if(checkUser)
        {
            const checkPass=await bcrypt.compare(req.body.password,checkUser.password)
            console.log("userfound")
            if(checkPass)
            {
                req.session.authenticated=true;
                req.session.username=checkUser.username;
                console.log("succes");  
                res.redirect(`/home/${req.body.username}`)
                
            }
            else
            {   
                res.redirect(`/?errpassword=invalid password`)
            }
        }
        else
        {
            res.redirect(`/?errusername=invalid username`)
        }

    }
    catch (error) {
        console.log(error.message)
        res.redirect('/error?message= something went wrong while logging!') 

    }
}


// const userchecking=async(req,res)=>
// {
//     const data =await user.find({username:req.body.username})
//     {
//         if(data)
//         {
//             console.log("value found")
//         }
//     }
// }



const userExit=async(req,res)=>
{
    console.log(" user session destroyed 1")
    await req.session.destroy()
    console.log("user session destroyed 2")
    res.redirect("/")
}



// const checkInUser = async (req, res) => {
//     console.log("1")

//     try {
//         if (req.body.username) {
//             const checkUsername = await user.findOne({ username: req.body.username });
//             console.log(checkUsername)
//             console.log("2");
//             if (req.body.username) {
//                 console("3")
//                 const checkPassword = await bcrypt.compare(req.body.password, checkUsername.password);
//                 if (checkPassword) {
//                     res.redirect("/home")
//                 }
//                 else {
//                     res.redirect("/login")
//                 }
//             }
//             else {
//                 res.redirect("/login")
//             }

//         }
//     }
//     catch {
//         console.log("error");
//     }
// }





module.exports = { checkUserIn, addUser,userExit }
