const userRouter = require('express').Router();

const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const { createUser } = require('../controllers/users');
const { changeUsername } = require('../controllers/users');
const { changeAvatar } = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', changeUsername);
userRouter.patch('/users/avatar', changeAvatar);

module.exports =  { userRouter } ;