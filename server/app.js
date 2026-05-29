const express = require('express');
const cors = require('cors');

//start of routes
const booksRoutes = require('./routes/books.js')
// end of routes

const app = express();

app.use(cors());
app.use(express.json());

app.use('/books', booksRoutes);

module.exports = app; 
