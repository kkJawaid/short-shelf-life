const pool = require("../config/db");

const retrieveUserBooks = async (id) => {
    const query = `
    SELECT id, book_name, author_name, review, spine_color, spine_design
    FROM books
    WHERE user_id=$1
    `
    const result = await pool.query(query, [id]);
    return result.rows;
}

const retrieveOneBook = async (userId, bookId) => {
    const query = `
    SELECT id, book_name, author_name, review, spine_color, spine_design
    FROM books
    WHERE user_id=$1 AND id=$2
    `
    const result = await pool.query(query, [userId, bookId]);
    return result.rows[0];
}

const addUserBook = async(userId, book_name, author_name, review, spine_color, spine_design) => {
    const query = `
    INSERT INTO Books
    (user_id, book_name, author_name, review, spine_color, spine_design)
    VALUES
    ($1, $2, $3, $4, $5, $6)
    `
    const values = [userId, book_name, author_name, review, spine_color, spine_design]
    await pool.query(query, values);
}

const deleteUserBook = async(userId, bookId) => {
    const query = `
    DELETE FROM books 
    WHERE user_id=$1 AND id=$2
    RETURNING id
    `
    const result = await pool.query(query, [userId, bookId]);
    return result.rows[0];
}

module.exports = { retrieveUserBooks, retrieveOneBook, addUserBook, deleteUserBook };