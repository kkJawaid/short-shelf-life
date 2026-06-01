const { retrieveUserBooks, retrieveOneBook } = require("../models/bookModel");

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

module.exports = { getAllBooks,getSpecificBook };