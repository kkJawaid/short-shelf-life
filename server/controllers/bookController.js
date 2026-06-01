const { retrieveUserBooks, retrieveOneBook, addUserBook, editUserBook, deleteUserBook } = require("../models/bookModel");

const getAllBooks = async (req, res) => {
    try {
        const books = await retrieveUserBooks(req.user.userId);
        return res.status(200).json({
            books
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to retrieve books."
        })
    }
}

const getSpecificBook = async (req, res) => {
    try {
        const book = await retrieveOneBook(req.user.userId, req.params.id);
        return res.status(200).json({
            book
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to retrieve book."
        })
    }
}

function validateBookTitle(val) {
    if (!val || val.trim() == "") {
        return "Please enter book title.";
    }
    if (val.length > 30) {
        return "Book title should have 0 to 30 characters."
    }
    return 0;
}

function validateAuthorName(val) {
    if (!val || val.trim() == "") {
        return "Please enter the author's name.";
    }
    if (val.length > 30) {
        return "Author name should have 0 to 30 characters."
    }
    return 0;
}

function validateReview(val = "") {
    if (val.trim().length > 1300) {
        return "Review should have 0 to 1300 characters."
    }
    return 0;
}

const addBook = async (req, res) => {
    try {
        const error = validateBookTitle(req.body.book_name) || validateAuthorName(req.body.author_name) || validateReview(req.body.review);
        if (error) {
            return res.status(400).json({
                message: error
            });
        }
        //adding book to shelf
        await addUserBook(req.user.userId, req.body.book_name, req.body.author_name, req.body.review, req.body.spine_color, req.body.spine_design);
        return res.status(201).json({
            message: "Successfully added book."
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to add book. Please try again."
        })
    }
}

const editBook = async (req, res) => {
    try {
        //validation
        const error =
            (req.body.book_name !== undefined && validateBookTitle(req.body.book_name)) ||
            (req.body.author_name !== undefined && validateAuthorName(req.body.author_name)) ||
            (req.body.review !== undefined && validateReview(req.body.review));
        if (error) {
            return res.status(400).json({
                message: error
            });
        }

        let setVal = [];
        let values = [req.user.userId, req.params.id];
        let count = 2;
        if (req.body.book_name) {
            count = count + 1;
            setVal.push(`book_name=$${count}`);
            values.push(req.body.book_name);
        }
        if (req.body.author_name) {
            count = count + 1;
            setVal.push(`author_name=$${count}`);
            values.push(req.body.author_name);
        }
        if (req.body.review) {
            count = count + 1;
            setVal.push(`review=$${count}`);
            values.push(req.body.review);
        }
        let query = `
                UPDATE books
                SET ${setVal.join(',')}
                WHERE user_id=$1 AND id=$2
                `
        const result = await editUserBook(query, values);
        return res.status(200).json({
            message: "Book updated successfully",
            result
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to edit book."
        })
    }
}

const deleteBook = async (req, res) => {
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
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to delete book."
        })
    }
}

module.exports = { getAllBooks, getSpecificBook, addBook, editBook, deleteBook };