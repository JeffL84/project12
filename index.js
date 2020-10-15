const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const app = express();
const { userRouter } = require('./routes/users.js');
const { cardsRouter } = require('./routes/cards.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '5f82572775553fb0d88808eb'
  };
  next();
});

app.use("/", userRouter);
app.use("/", cardsRouter);

app.use( (req, res) => {
  res.status(404).send({ message: "Requested Resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})


