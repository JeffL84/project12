const userRouter = require('express').Router();

const { getUsers } = require('../controllers/users');
const { getUser } = require('../controllers/users');
const { createUser } = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.post('/users', createUser);

module.exports =  { userRouter } ;