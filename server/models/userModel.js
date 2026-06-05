const pool = require("../config/db");

const retrieveUserInfo = async(id) => {
    const query = `
    SELECT shelf_name, email, privacy
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

const editEmailModel = async(id, newEmail) => {
    const query=`
    UPDATE users
    SET email=$1
    WHERE id=$2
    `
    await pool.query(query, [newEmail, id]);
}

const editPrivacyModel = async(id, privacy) => {
    const query=`
    UPDATE users
    SET privacy=$1
    WHERE id=$2
    `
    await pool.query(query, [privacy, id]);
}

const deleteUserModel = async(id) => {
    const query = `
    DELETE FROM USERS
    WHERE id = $1
    RETURNING id
    `
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

module.exports = { retrieveUserInfo, editShelfModel, editEmailModel, editPrivacyModel, deleteUserModel }