const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", userRouter);
app.use("/", cardsRouter);

app.use( (req, res) => {
  res.status(404).send({ message: "Requested Resource not found" });
});