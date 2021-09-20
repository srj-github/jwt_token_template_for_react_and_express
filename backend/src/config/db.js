const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}?authSource=admin`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB !!');
  } catch(e) {
    console.log(e);
    throw e;
  }
};

const CloseMongoServer = async() => {
  try {
    await mongoose.disconnect(mongoUrl);
    console.log('DB Disconnected!');
  } catch(e) {
    console.log(e);
    throw e;
  }
};


exports.InitiateMongoServer = InitiateMongoServer;
exports.CloseMongoServer = CloseMongoServer;
