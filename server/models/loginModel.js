const pool = require("../config/db");

const checkCred = async(email, password) => {
    const query = `
    SELECT id, email, password_hash FROM USERS 
    WHERE email=$1
    `;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = { checkCred }