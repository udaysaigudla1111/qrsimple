const mongoose = require("mongoose");

const bcrypt = require("bcryptjs"); // for encrypting the password

const userSchema = mongoose.Schema(   // this user schema is same for both registering and logging in

{
    name:{
            type:String,
            required:true,

    },
    email:{
            type:String,
            required:true,
            unique:true,
    },
    password:{
            type:String,
            required:true,
    },
    isAdmin:{
            // just in case we need
            type:Boolean,
            required:true,
            default:false,
    },
    phonenumber : {
            type:Number,
            required:true,
           
    },
},
    {
        timestamps : true,
    }

);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//encrypting function
userSchema.pre("save", async function(next)  {  // pakka we should write the function like this
    if(!this.isModified("password")) {
        next();
    }
    const salt  = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//decrypting function
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
const User = mongoose.model('User',userSchema)
module.exports = User;