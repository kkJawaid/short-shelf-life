const { retrieveUserBooks, retrieveOneBook, deleteUserBook } = require("../models/bookModel");

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

module.exports = { getAllBooks,getSpecificBook, deleteBook };