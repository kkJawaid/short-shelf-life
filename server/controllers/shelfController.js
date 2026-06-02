const { retrieveOtherShelves } = require("../models/shelfModel");

const browseAllShelves = async (req, res) => {
    try {
        const shelves = await retrieveOtherShelves(req.user.userId);
        return res.status(200).json({
            message: "Retrieved shelves successfully",
            shelves
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error retrieving shelves"
        })
    }
}

module.exports = { browseAllShelves }