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

module.exports = { retrieveUserBooks };