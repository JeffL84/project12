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
    //link to the card author's model, ObjectId type, required field
  },
  likes: {
   //a list of users who liked the post, an ObjectId array, an empty array by default (default field)
    },
  createdAt: {
    //creation date, Date type, default value Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);