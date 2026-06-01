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

module.exports = { retrieveUserBooks, retrieveOneBook };