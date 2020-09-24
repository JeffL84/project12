const express = require('express');
//const fs = require('fs');
const path = require('path');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})

app.use(express.static(path.join(__dirname, 'public')));