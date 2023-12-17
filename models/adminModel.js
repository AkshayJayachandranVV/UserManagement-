// const mongoose=require("mongoose");

// mongoose.connect("mongodb://0.0.0.0:27017/userdb")
//     .then(()=>{console.log("connection established with db")})
//     .catch((e)=>{console.error(e.message)})

// const adminSchema=new mongoose.Schema({

//     username:{
//            type:String,
//            require:true
//     },
//     password:{
//           type:String,
//           require:true
//     },
//     isAdmin:{
//     type:Number,
//     require:true
//     }
// });
// module.exports=mongoose.model("user",adminSchema)


const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/userdb")
    .then(() => { console.log("connection established with db") })
    .catch((e) => { console.error(e.message) })

const userSchema = mongoose.Schema({

    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    }


});

module.exports = mongoose.model("user", userSchema)
