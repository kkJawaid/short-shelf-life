const pool = require("../config/db");

const createUser = async(shelf_name, email, hashed_pass) => {
    const query = `
        INSERT INTO USERS
        (shelf_name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, shelf_name, email
    `;
    const values = [shelf_name, email, hashed_pass];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const checkEmail = async(email) => {
    const query = `
    SELECT email FROM USERS 
    WHERE email = $1
    `
    const values = [email]
    const result = await pool.query(query, values);
    return result.rows[0]; 
}

module.exports = { createUser, checkEmail }