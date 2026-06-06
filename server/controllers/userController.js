const bcrypt = require('bcrypt');
const { retrieveUserInfo, editShelfModel, editEmailModel, retrievePassword, editPasswordModel, editPrivacyModel, deleteUserModel } = require("../models/userModel");

const getUser = async (req, res) => {
    try {
        const user = await retrieveUserInfo(req.user.userId);

        if (!user) {
            return res.status(400).json({
                message: "User is not authenticated"
            })
        }

        return res.status(200).json({
            message: "Successfully retrieved user information",
            user,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to retrieve user information."
        })
    }
}

const editShelf = async (req, res) => {
    try {
        if (!req.body.shelfName || req.body.shelfName.trim() === "") {
            return res.status(400).json({
                message: "Shelf name cannot be empty."
            });
        }

        await editShelfModel(req.user.userId, req.body.shelfName);
        return res.status(200).json({
            message: "Successfully updated shelf name"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while updating shelf name. Please try again"
        })
    }
}

const editEmail = async (req, res) => {
    try {
        if (!req.body.emailName || req.body.emailName.trim() === "") {
            return res.status(400).json({
                message: "Email field cannot be empty."
            });
        }

        await editEmailModel(req.user.userId, req.body.emailName);
        return res.status(200).json({
            message: "Successfully updated email"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while updating email. Please try again"
        })
    }
}

const editPassword = async (req, res) => {
    try {
        if (!req.body.newPassword || req.body.newPassword.trim() === "") {
            return res.status(400).json({
                message: "Password cannot be empty."
            });
        }
        const user = await retrievePassword(req.user.userId);
        const result = await bcrypt.compare(req.body.newPassword, user.password_hash);
        if (result) {
            return res.status(400).json({
                message: "New password cannot be same as the old password"
            })
        }
        const newHash = await bcrypt.hash(req.body.newPassword, 10);
        await editPasswordModel(req.user.userId, newHash);
        return res.status(200).json({
            message: "Successfully updated password"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while updating password. Please try again"
        })
    }
}

const editPrivacy = async (req, res) => {
    try {
        if (req.body.privacy === undefined) {
            return res.status(400).json({
                message: "Privacy field cannot be empty."
            });
        }
        if (typeof req.body.privacy !== "boolean") {
            return res.status(400).json({
                message: "Privacy must be a boolean."
            });
        }
        // if public, frontend will send true
        // if private, frontend will send false
        let privacyStatus = req.body.privacy ? "private" : "public";

        await editPrivacyModel(req.user.userId, privacyStatus);
        return res.status(200).json({
            message: "Successfully updated privacy status"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while updating privacy status. Please try again"
        })
    }
}

const deleteUser = async(req,res) => {
    try{
        const result = await deleteUserModel(req.user.userId);
        if (!result) {
            return res.status(400).json({
                message: "User id not found"
            })
        }
        res.clearCookie("token", {
            httpOnly:true
        })
        return res.status(200).json({
            message: "Successfully deleted user"
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while deleting user. Please try again."
        })
    }
}

module.exports = { getUser, editShelf, editEmail, editPassword, editPrivacy, deleteUser };