const jwt = require('jsonwebtoken');

const authenticateUser = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.status(403).json({
                message: "Authentication required"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: 'Unable to authenticate user. Please try again.'
        })
    }
}

module.exports = { authenticateUser };