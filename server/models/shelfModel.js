const pool = require("../config/db");

const retrieveOtherShelves = async (id) => {
    const query = `
    SELECT id, shelf_name FROM Users
    WHERE id != $1
    `
    const result = await pool.query(query, [id]);
    return result.rows;
}

const retrieveSpecificShelf = async (userId, shelfId) => {
    const query = `
    SELECT * FROM Books
    WHERE user_id != $1 AND user_id=$2
    `
    const result = await pool.query(query, [userId, shelfId]);
    return result.rows;
}

module.exports = { retrieveOtherShelves, retrieveSpecificShelf };