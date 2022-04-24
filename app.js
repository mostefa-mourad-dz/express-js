const express = require('express');
const logger = require('morgan');
const path = require('path');


/** Routers */
const bookRouter = require('./routes/book.route');

const app = express();


/***** Integration du MySQL */
const db = require("./models/index");
db.sequelize.sync()
.then(() => {
  return "Connection to database was successfull !";
})
.catch((err) => {
  return "Connection to database failed !";
});

/** Setting UP the envirement for express & passport */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Integrating the Routes */
app.use('/api/book',bookRouter);

app.use(function(err,req,res,next) {
  res.json({error:err.message});
});

module.exports = app;