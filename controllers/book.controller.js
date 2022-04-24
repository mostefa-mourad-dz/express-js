const db = require("../models/index");
const Book = db.books;
const Op = db.Sequelize.Op;


// Create and Save a new Book
exports.create = (req, res, next) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
  // Create a Book
  const book = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Save Book in the database
  Book.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    });
};

// Retrieve all Books from the database.
exports.findAll = async (req, res, next) => {
  const title = req.query?.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  let books = await Book.findAll({where:condition})
  if(books) {
      res.send(books);
  }
  else {
    res.status(500).send({
        message: "Some error occurred while retrieving books."
    });
  }
};
// Find a single Book with an id
exports.findOne = (req, res, next) => {
    const id = req.params.id;
    Book.findByPk(id)
    .then(data => {
    if (data) {
        res.send(data);
    } else {
        res.status(404).send({
            message: `Cannot find Book with id=${id}.`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error retrieving Book with id=" + id
    });
    });
};
// Update a Book by the id in the request
exports.update = (req, res, next) => {
    const id = req.params.id;
    Book.update(req.body, {
      where: { id: id }
    })
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Book was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Book with id=" + id
    });
    });
};
// Delete a Book with the specified id in the request
exports.delete = (req, res, next) => {
    const id = req.params.id;
    Book.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
};

