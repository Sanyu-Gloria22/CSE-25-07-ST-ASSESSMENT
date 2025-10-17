const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
    trim: true 
  },
  phoneNumber: { 
    type: Number, 
    required: true 
  },
   password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true, 
    unique: true, 
    trim: true 
  },
});

// Use Passport plugin
signupSchema.plugin(passportLocalMongoose, { usernameField: "emailAddress" });

const signupModel = mongoose.models.signupModel || mongoose.model("signupModel", userSchema);
module.exports = signupModel;
