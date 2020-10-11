const path = require('path');
const dataPath = path.join(__dirname, "..", "data", "users.json");
const fs = require('fs').promises;
const User = require('../models/user.js');

const getDataFromFile = (pathToFile) => {
  return fs.readFile(pathToFile, { encoding: 'utf8'})
    .then(data => JSON.parse(data))
    .catch(err => console.log(err))
}

const getUsers = (req, res) => {
  return User.find({})
  //return User.find({});
    .then(users => {
      res.send(users)
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
};

const getUser = (req, res) => {
  return User.find({_id: req.params.id})
  //return User.find({id: req.params.id}); from 17:08 in live coding
    //.then(users => {
    //  return users.find((user => user._id === req.params.id)); })
    .then(user => {
      if (user) {
        return res.status(200).send(user);
      }

      res.status(404).send({message: "There is no such user"});
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
    .catch(err => {
      res.status(400).send(err)
    })
};

module.exports = { getUsers , getUser , createUser };