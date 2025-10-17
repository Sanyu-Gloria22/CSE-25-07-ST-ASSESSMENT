const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const loginSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  password:{
    type:String,
    require:true,
    trim:true
  },
});


loginSchema.plugin(passportLocalMongoose,{
  usernameField:"emailAddress"
});
module.exports = mongoose.model("loginModel", loginSchema)