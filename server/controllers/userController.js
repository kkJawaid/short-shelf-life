const { retrieveUserInfo, editShelfModel, editEmailModel } = require("../models/userModel");

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

module.exports = { getUser, editShelf, editEmail };