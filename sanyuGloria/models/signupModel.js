const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [3, 'Full name must be at least 3 characters'],
    maxlength: [50, 'Full name must not exceed 50 characters'],
    match: [/^[a-zA-Z\s]+$/, 'Full name should only contain letters and spaces']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        const digitsOnly = v.replace(/[^0-9]/g, '');
        return digitsOnly.length >= 10 && digitsOnly.length <= 15;
      },
      message: 'Phone number must be between 10 and 15 digits'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
signupSchema.index({ email: 1 });
signupSchema.index({ phone: 1 });

// Plugin for passport authentication
signupSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  errorMessages: {
    UserExistsError: 'A user with this email already exists',
    IncorrectPasswordError: 'Password is incorrect',
    IncorrectUsernameError: 'Email is not registered',
    MissingUsernameError: 'Email is required',
    MissingPasswordError: 'Password is required'
  }
});

module.exports = mongoose.model('User', signupSchema);