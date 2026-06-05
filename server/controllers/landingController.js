const landingMessage = (req, res) => {
    return res.status(200).json({
        message: "Welcome, happy reading!"
    })
}

module.exports = { landingMessage };