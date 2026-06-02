const pool = require("../config/db");

const retrieveOtherShelves = async (id) => {
    const query = `
    SELECT id, shelf_name FROM Users
    WHERE id != $1
    `
    const result = await pool.query(query, [id]);
    return result.rows;
}

module.exports = { retrieveOtherShelves };