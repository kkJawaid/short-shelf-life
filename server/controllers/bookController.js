const { retrieveUserBooks } = require("../models/bookModel");

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

module.exports = { getAllBooks };