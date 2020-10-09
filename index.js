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

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", userRouter);
app.use("/", cardsRouter);

app.use( (req, res) => {
  res.status(404).send({ message: "Requested Resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
})


