let {Schema, model} = require("mongoose")
let bcrypt = require('bcrypt')

let UserSchema = new Schema({
    username:{
        type:String,
        required:{value:true, message:"username is mandatory"},
        unique:{value:true, message:"This username is already using"}
    },
    email:{
        type:String,
        required:{value:true, message:"email is mandatory"},
        unique:{value:true, message:"This username is already using"}
    },
    password:{
        type:String,
        required:{value:true, message:"password is mandatory"}
    },
    role:{
        type:String,
        required:{value:true, message:"specify the role"},
        enum: ['admin', 'student', 'instructor']
    }
})

// UserSchema.pre('save', async function(next){
//     try {
//         let salt = await bcrypt.genSalt(10)
//         let hashedpassword = await bcrypt.hash(this.password, salt)
//         this.password = hashedpassword
//         next()
//     } catch (error) {
//         next(error)
//     }
// })

let User = model("User", UserSchema)
module.exports = User;