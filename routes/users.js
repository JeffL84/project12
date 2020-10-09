const userRouter = require('express').Router();

const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);

module.exports = { userRouter };