const pool = require("../config/db")

const verifyPrivacy = async(id) => {
    const query = 
    `
    SELECT privacy FROM users
    WHERE id=$1
    `
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

module.exports = { verifyPrivacy };