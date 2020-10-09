const path = require('path');
const cardDataPath = path.join(__dirname, "..", "data", "cards.json");
const fs = require('fs').promises;

const getDataFromFile = (pathToFile) => {
  return fs.readFile(pathToFile, { encoding: 'utf8'})
    .then(data => JSON.parse(data))
    .catch(err => console.log(err))
}

const getCards = (req, res) => {
  return getDataFromFile(cardDataPath)
    .then(cards => {
      res.send(cards)
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
}

module.exports = { getCards };