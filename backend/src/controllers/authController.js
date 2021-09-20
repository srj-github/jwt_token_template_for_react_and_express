const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const singToken = id => {
  return jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createUserToken = async(user, code, req, res, message) => {
  const token = singToken(user.id);

  let d = new Date();
  d.setDate(d.getDate() + 1);

  res.cookie('jwt', token, {
    expires: d,
    httpOnly: true,
    sameSite: 'strict'
  });

  user.password = undefined;
  res.status(code).json({
    status: 'ok',
    message: message,
    token,
    data: {user}
  });
};

// create new user
exports.registerUser = async(req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
	const {email, password, confirmPassword, role, fullName} = req.body;
	const newUser = await UserModel.create({
	  email,
	  password,
	  confirmPassword,
	  role,
	  fullName
	});
	createUserToken(newUser, 201, req, res, 'The user was created!');
      }
      return true;
    } catch(err) {
      console.log(err);
      if (err.errors) {
        let errors = [];
        for (let [key, value] of Object.entries(err.errors)) {
          errors.push(value.message);
        }
        res.status(400).send({
          status: 'error',
          message: JSON.stringify(errors)
        });
      }
      if (err.message === 'jwt malformed') {
        res.status(401).send({fail: 'Token Invalid!'});
      }
      next(err.message);
      return false;
    }

 } else {
   res.status(401).send({fail: 'You are not allowed!'});
   return false;
 }
};

exports.loginUser = async(req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400).send({
      status: 'error',
      message: 'Please provide a username and password!'});
    return false;
  }

  const user = await UserModel.findOne({email}).select('+password');
  if (!user || (!await user.correctPassword(password, user.password))) {
    res.status(400).send({
      status: 'error',
      message: 'Incorrect username or password!'});
    return false;
  }
  createUserToken(user, 200, req, res, 'You have logged in!');

  return true;
};


exports.logoutUser = async(req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 1 * 1000),
      httpOnly: true,
      sameSite: 'strict'
    });
  res.status(200).send({
    status: 'ok',
    message: 'User is logged out!'});
  };

exports.checkUser = async(req, res) => {
  let currentUser;
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    currentUser = await UserModel.findById(decoded.id);
  } else {
    currentUser = null;
  }
  res.status(200).send({currentUser});
};


exports.resetPassword = async(req, res) => {
  const {email, currentPassword, newPassword, confirmNewPassword} = req.body;
  if (newPassword !== confirmNewPassword) {
    res.status(400).send({
      status: 'error',
      message: 'Passwords do not match!'
    });
    return false;
  }
  if (newPassword.length <7) {
    res.status(400).send({
      status: 'error',
      message: 'Password must have at least 6 characters!'
    });
    return false;
  }

  const user = await UserModel.findOne({email}).select('+password');
  if (!await user.correctPassword(currentPassword, user.password)) {
    res.status(400).send({
      status: 'error',
      message: 'Current Password is not correct!'
    });
    return false;
  }
  await UserModel.findOneAndUpdate({email: email}, {password: newPassword});

  res.status(200).send({
    status: 'ok',
    message: 'The password was succesfully changed!'});
  return true;
};
