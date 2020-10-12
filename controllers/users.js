const path = require('path');
//const dataPath = path.join(__dirname, "..", "data", "users.json");
const fs = require('fs').promises;
const User = require('../models/user.js');
const ERROR_CODE = 400;

// const getDataFromFile = (pathToFile) => {
//   return fs.readFile(pathToFile, { encoding: 'utf8'})
//     .then(data => JSON.parse(data))
//     .catch(err => console.log(err))
// }

const getUsers = (req, res) => {
  return User.find({})
  //return User.find({});
    .then(users => {
      res.send(users)
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
};

const getUser = (req, res) => {
  //console.log(User.find({_id: req.params.id}));
  return User.find({_id: req.params.id})
    .then((user) => {
      console.log("first", user);
      if (!user) {
        console.log("second", user);
        return res.status(404).send({message: "There is no such user"});
      }
      console.log("third", user);
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  //return User.countDocuments({}) //from Live coding - may not be necessary for this task
    //.then(id => {})
      return User.create({name, about, avatar})
    .then(user => {
      res.status(200).send({user}) //theory has this as an object {data: user}
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
          res.status(400).send({ message: "User validation failed" });
      } else {
          res.status(500).send({ message: "Internal server error" });
      }
  });
};

const changeUsername = (req, res) => {
  // updating the name of the user found by _id - look back at this for errors
  User.findByIdAndUpdate(req.params.id, 'name: req.body')
    .then(user => res.send({ data: req.body }))
    .catch((err) => {
      //console.log(err);
      res.status(500).send({ message: 'Error' });})
};

const changeAvatar = (req, res) => {
  // updating the name of the user found by _id - look back at this for errors
  User.findByIdAndUpdate(req.params.id, 'avatar: req.body')
    .then(user => res.send({ data: req.body }))
    .catch((err) => {
      //console.log(err);
      res.status(500).send({ message: 'Error' });})
};


module.exports = { getUsers , getUser , createUser , changeUsername , changeAvatar  };