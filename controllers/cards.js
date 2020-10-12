const path = require('path');
const cardDataPath = path.join(__dirname, "..", "data", "cards.json");
const fs = require('fs').promises;
const Card = require('../models/card.js');
const ERROR_CODE = 400;

// const getDataFromFile = (pathToFile) => {
//   return fs.readFile(pathToFile, { encoding: 'utf8'})
//     .then(data => JSON.parse(data))
//     .catch(err => console.log(err))
// }

const getCards = (req, res) => {
  return Card.find({})
    .then(cards => {
      if (cards) {
        return res.status(200).send(cards);
      }
      res.status(404).send({message: "There are no cards!"});
    })
    .catch(() => {
      return res.status(500).send({message: "500 Internal server error"})}
      )
}


const createCard = (req, res) => {
  const { name, link, owner } = req.body;
  return Card.create({name, link, owner})
    .then(card => {
      res.status(200).send({card})
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
          res.status(400).send({ message: "User validation failed" });
      } else {
          res.status(500).send({ message: "Internal server error" });
      }
  }); 
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

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
  { new: true },
);

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // remove _id from the array
  { new: true },
)


module.exports = { getCards , createCard, deleteCard , likeCard , dislikeCard };