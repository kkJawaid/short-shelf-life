const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true
        });
        return res.status(200).json({
            message: "Successfully logged out. Happy reading!"
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to log out user."
        })
    }
}

module.exports = { logoutUser };