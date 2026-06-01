const { retrieveUserInfo } = require("../models/userModel");

const getUser = async(req, res) => {
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
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to retrieve user information."
        })
    }
}

module.exports = { getUser };