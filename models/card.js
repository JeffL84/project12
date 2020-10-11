const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
      //const regex = //(http:\/\/|https:\/\/)\w+.\w+(\/|.)\w*(\/|.)\w*(\/|.)\w*(\/|.)\w*#?/;
      return /(http:\/\/|https:\/\/)\w+.\w+(\/|.)\w*(\/|.)\w*(\/|.)\w*(\/|.)\w*#?/.test(v);
      //return v.match(regex);
      },
    message: 'Sorry, this is not a valid url',
  }
  },
  owner: {
    type: String, //thought type ws supposed to be ObjectId but got error
    required: true,
  },
  likes: {
    type: Array,
    default: [],
    },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);