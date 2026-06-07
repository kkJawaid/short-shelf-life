const jwt = require('jsonwebtoken');
const { verifyPrivacy } = require("../models/authModel");

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Unable to authenticate user. Please try again.'
        })
    }
}

const authorizeShelfAccess = async (req, res, next) => {
    try {
        const privacyStatus = await verifyPrivacy(req.params.id);
        if (privacyStatus === undefined) {
            return res.status(404).json({
                message: "Shelf does not exist"
            })
        }
        if (privacyStatus.privacy === "public" || Number(req.params.id) === req.user.userId) {
            return next();
        }
        return res.status(403).json({
            message: "Private Shelf. You do not have access to this information"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Unable to authorize user. Please try again.'
        })
    }
}

module.exports = { authenticateUser, authorizeShelfAccess };