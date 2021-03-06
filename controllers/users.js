const User = require('../models/user.js');

// const getDataFromFile = (pathToFile) => {
//   return fs.readFile(pathToFile, { encoding: 'utf8'})
//     .then(data => JSON.parse(data))
//     .catch(err => console.log(err))
// }

const getUsers = (req, res) => User.find({})
  // return User.find({});
  .then((users) => {
    res.send(users);
  })
  .catch(() => res.status(500).send({ message: '500 Internal server error' }));

const getUser = (req, res) => User.findById({ _id: req.params.id })
  .then((user) => {
    if (user) {
      return res.status(200).send(user);
    }
  })
  .catch((err) => {
    if (err.name = 'CastError') {
      res.status(404).send({ message: 'There is no such user' });
    } else {
      res.status(500).send({ message: '500 Internal server error' });
    }
  });
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  // return User.countDocuments({}) //from Live coding - may not be necessary for this task
  // .then(id => {})
  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ user }); // theory has this as an object {data: user}
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'User validation failed' });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    });
};

const changeUsername = (req, res) => {
  // updating the name of the user found by _id - look back at this for errors
  User.findByIdAndUpdate(req.params.id, 'name: req.body')
    .then((user) => res.send({ data: req.body }))
    .catch((err) => {
      res.status(500).send({ message: 'Error' });
    });
};

const changeAvatar = (req, res) => {
  // updating the name of the user found by _id - look back at this for errors
  User.findByIdAndUpdate(req.params.id, 'avatar: req.body')
    .then((user) => res.send({ data: req.body }))
    .catch((err) => {
      res.status(500).send({ message: 'Error' });
    });
};

module.exports = {
  getUsers, getUser, createUser, changeUsername, changeAvatar,
};
