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

const editShelfModel = async(id, newShelf) => {
    const query=`
    UPDATE users
    SET shelf_name=$1
    WHERE id=$2
    `
    await pool.query(query, [newShelf, id]);
}

module.exports = { retrieveUserInfo, editShelfModel }