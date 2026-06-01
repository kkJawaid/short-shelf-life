const { retrieveUserBooks, retrieveOneBook, addUserBook, deleteUserBook } = require("../models/bookModel");

const getAllBooks  = async(req, res) => {
    try {
        const books = await retrieveUserBooks(req.user.userId);
        return res.status(200).json({
            books
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to retrieve books."
        })
    }
}

const getSpecificBook  = async(req, res) => {
    try {
        const book = await retrieveOneBook(req.user.userId, req.params.id);
        return res.status(200).json({
            book
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to retrieve book."
        })
    }
}

const addBook = async(req, res) => {
    try {
        //validation check for title
        if (!req.body.book_name || req.body.book_name.trim() == "") {
            return res.status(400).json({
                message: "Please enter book title."
            })
        }   

        if (req.body.book_name.length > 30) {
            return res.status(400).json({
                message: "Book title should have 0 to 30 characters."
            })
        }

        //validation check for author 
        if (!req.body.author_name || req.body.author_name.trim() == "") {
            return res.status(400).json({
                message: "Please enter the author's name."
            })
        } 

        if (req.body.author_name.length > 30) {
            return res.status(400).json({
                message: "Author name should have 0 to 30 characters."
            })
        }
          
        //validation check for review 
        if (req.body.review.length.trim() > 1300) {
            return res.status(400).json({
                message: "Review should have 0 to 1300 characters."
            })
        }

        //adding book to shelf
        await addUserBook(req.user.userId, req.body.book_name, req.body.author_name, req.body.review, req.body.spine_color, req.body.spine_design);
        return res.status(201).json({
            message: "Successfully added book."
        })
    } 

    catch(error) {
        console.log(error);
            return res.status(500).json({
                message: "Unable to add book. Please try again."
        })
    }
}

const deleteBook  = async(req, res) => {
    try {
        const result = await deleteUserBook(req.user.userId, req.params.id);
        if (result && result.id) {
            return res.status(200).json({
                message: "Successfully deleted book."
            })
        }
        else {
            return res.status(404).json({
                message: "Could not find book."
            })
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to delete book."
        })
    }
}

module.exports = { getAllBooks,getSpecificBook, addBook, deleteBook };