const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {type:String, unique:true},
  password: String,
});

const RegisterModel = mongoose.model('registers', UserSchema);

module.exports = RegisterModel;