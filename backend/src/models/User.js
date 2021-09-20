const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email was not provided!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'The entered email address is not a valid email!']
  },
  password: {
    type: String,
    required: [true, 'The password was not entered!'],
    minLength: [6, 'Password must have at least 6 characters!']
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm Password was not provided!'],
    validate: {
      validator: function(el) {
        return el === this.password;
      }, message: 'Passwords do not match!'
    }
  },
  role: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: [true, 'No full name was provided!']
  }
});

// hash the password
UserSchema.pre('save', async function(next) {

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  this._update.password = await bcrypt.hash(this._update.password, 12);
  next();
});


// check password at login
UserSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next({errors: {duplicateemail: {message:'Email address is already registered!'}}});
  } else {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
