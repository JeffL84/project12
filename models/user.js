const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
      //const regex = //(http:\/\/|https:\/\/)\w+.\w+(\/|.)\w*(\/|.)\w*(\/|.)\w*(\/|.)\w*#?/;
      return /(http:\/\/|https:\/\/)\w+.\w+(\/|.)\w*(\/|.)\w*(\/|.)\w*(\/|.)\w*#?/.test(v);
      //return v.match(regex);
    },
    message: 'Sorry, this is not a valid url',
  },
}});

module.exports = mongoose.model('user', userSchema);