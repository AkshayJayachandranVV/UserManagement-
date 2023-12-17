const user=require("../models/userModel")
const bcrypt=require("bcrypt");





const checkAdmin=async (req,res)=>{
    try{

     console.log("try entered")
     const findAdmin=await user.findOne({username:req.body.username})
     console.log(user.isAdmin)
     if(findAdmin.isAdmin==1)
     {
        if(req.body.username)
        {

            console.log("enterred username");
           

            console.log(findAdmin)
            
            if(findAdmin)
            {
                const checkpassword=await bcrypt.compare(req.body.password,findAdmin.password)
                if(checkpassword)
                {
                    req.session.auth = true;
                    console.log("enterred password");
                    req.session.username=req.body.username;
                    console.log(req.body.username)
                    console.log("req.body.username")
                    // res.redirect(`/admin/adminPanel/${req.body.username}`)
                       res.redirect(`/admin/adminPanel/${req.body.username}`)
                    // res.redirect("/admin/adminPanel")
                }
                else
                {
                    res.redirect(`/admin?wrongpass=invalid password`)
                }
            }
            else{
                
                res.redirect("/admin?wrongname=invalid username")
            }

        }
    
     }
     }
    catch{
        console.log("error")
        res.redirect('/error?message= Oops something went wrong!') 

    }
}


const adminExit=async(req,res)=>
{
    console.log("session destroyed 1")
    await req.session.destroy()
    console.log("session destroyed 2")
    res.redirect("/admin")
}
  

const showuser=async(req,res)=>
{
    try{
        const returnUsers=await user.find({isAdmin:0})
        if(returnUsers)
        {
            return returnUsers
        }
        else
        {
            console.log("couldnot found")
        }
    }
    catch(e)
    {
        console.log(e.message)
    }
}


const sercheduser=async(req,res)=>{

    try{
        console.log("try enetered")

        console.log(req.body.filterUser)
        if(req.body.filterUser)
        {
            console.log("if entered")
            const filterUser=req.body.filterUser;
            const regex = new RegExp(`^${filterUser}`)
            console.log(filterUser)
            // const regex=new RegExp(`^${filterUser}$`);
           // console.log(regex)
            //const filteredUser=await user.find({username:{$regex: new RegExp(`^${filterUser}`, 'i') }})
            const filteredUser=await user.find({username:{$regex: regex }})

            console.log(filteredUser)
            res.render("adminPanel",{userData:filteredUser,name:req.session.username})
        }
        else{
            res.redirect(`/admin/adminPanel/${req.session.username}`)
        }

    }
    catch(e){
        
        console.log("e.message");
        console.log(e.message);
        res.redirect('/error?message= something went wrong! while searching') 

    }
}



const updateUser=async (req,res)=>{

   try{

    const oldusername=req.body.oldusername;
    const oldemail=req.body.email;
    const newusername=req.body.newusername;
    const newemail=req.body.newemail;
    console.log(req.body.newemail)
    await user.updateOne({username:oldusername},{$set:{username:newusername,email:newemail}})

    // res.redirect("/admin/adminPanel")
    res.redirect(`/admin/adminPanel/${req.session.username}`)

   }
   catch(e)
   {
    console.log(e.message)
   }
    
    // res.redirect("/admin")

}



const deleteuser= async(req,res)=>
{
    console.log(req.body.username)
    try{
        console.log("delete try entered")
        await user.deleteOne({username:req.body.username})
        // res.redirect("/admin/adminPanel")
        res.redirect("/admin")
    }
    catch(e){
        console.log(e.message)
        res.redirect('/error?message= something went wrong!') 
    }
}


module.exports={checkAdmin ,showuser,deleteuser,updateUser,sercheduser,adminExit}