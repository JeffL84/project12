const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const mongoose = require('mongoose');
const { url } = require('inspector');


// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

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

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", userRouter);
app.use("/", cardsRouter);

app.use( (req, res) => {
  res.status(404).send({ message: "Requested Resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})

module.exports = mongoose.model('user', userSchema);
module.exports = mongoose.model('card', cardSchema);