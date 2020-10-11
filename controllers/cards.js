const path = require('path');
const cardDataPath = path.join(__dirname, "..", "data", "cards.json");
const fs = require('fs').promises;
const Card = require('../models/card.js');

const getDataFromFile = (pathToFile) => {
  return fs.readFile(pathToFile, { encoding: 'utf8'})
    .then(data => JSON.parse(data))
    .catch(err => console.log(err))
}

const getCards = (req, res) => {
  return Card.find({})
    .then(cards => {
      res.send(cards)
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
}


const createCard = (req, res) => {
  const { name, link } = req.body;
  return Card.create({name, link})
    .then(card => {
      res.status(200).send({card})
    })
    .catch(() => res.status(500).send({message: "500 Internal server ERROR"}))
}

//somewhat helpful website: https://grokonez.com/node-js/nodejs-restapis-how-to-create-nodejs-express-restapis-post-get-put-delete-requests#Implement_Express_Application
//not developed yet
const deleteCard = (req, res) => {
  const { id } = req.params._id;
  return Card.deleteOne(id) //not sure how to connect this correctly
    .then(card => {
      res.status(200).send({card, message: "Card has been deleted"})
    })
    .catch(() => res.status(500).send({message: "500 Internal server error"}))
}

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id will become accessible
};

module.exports = { getCards , createCard, deleteCard };