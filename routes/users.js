const userRouter = require('express').Router();
const path = require('path');
const dataPath = path.join(__dirname, "..", "data", "users.json");
const fs = require('fs').promises;


const getDataFromFile = (pathToFile) => {
  return fs.readFile(pathToFile, { encoding: 'utf8'})
    .then(data => JSON.parse(data))
    .catch(err => console.log(err))
}

const getUsers = (req, res) => {
  return getDataFromFile(dataPath)
    .then(users => {
      res.send(users)
    })
}

const getUser = (req, res) => {
  return getDataFromFile(dataPath)
    .then(users => {
      return users.find((user => user._id === req.params.id));
    })
    .then(user => {
      if (user) {
        return res.status(200).send(user);
      }

      res.status(404).send({message: "There is no such user"});
    })
    .catch((err) => res.status(400).send(err))
}

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);

module.exports = userRouter;