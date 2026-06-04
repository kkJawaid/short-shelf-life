const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//start of routes
const authRoutes = require("./routes/auth.js")
const booksRoutes = require('./routes/books.js')
const shelvesRoutes = require("./routes/shelves.js")
const userRoutes = require("./routes/user.js")
// end of routes

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/books', booksRoutes);
app.use('/shelves', shelvesRoutes);
app.use('/user', userRoutes);

module.exports = app; 
