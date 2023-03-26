const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async(req,res) =>{

    try{
            const { name, email, password, phonenumber } = req.body;

            const userExists = await User.findOne({email});

            if(userExists){
                res.status(400)
                throw new Error('User already Exists');
            }
            const user = await User.create(req.body);

            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                password:user.password,
                isAdmin:user.isAdmin,
                phonenumber:user.phonenumber,
                token:generateToken(user._id),
            });

    }
    catch(error){
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
    
});

//login
const authUser = asyncHandler(async(req,res) =>{

    try{
            const {  email, password } = req.body;
            const user = await User.findOne({email});

            if( user && (await user.matchPassword(password))){
                res.status(200).json({

                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    isAdmin:user.isAdmin,
                    phonenumber:user.phonenumber,
                    token:generateToken(user._id),
                });
            }
            else{
                res.status(400);
                throw new Error("Invalid Email or password");
            }
           

    }
    catch(error){
        console.log(error.message);
        res.status(400).json({message:error.message});
    }
    
});

module.exports =  {registerUser,authUser}