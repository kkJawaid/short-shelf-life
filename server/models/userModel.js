const pool = require("../config/db");

const retrieveUserInfo = async(id) => {
    const query = `
    SELECT shelf_name, email 
    FROM USERS 
    WHERE id=$1
    `
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

module.exports = { retrieveUserInfo }