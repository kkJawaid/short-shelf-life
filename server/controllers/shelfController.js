const { retrieveOtherShelves, retrieveSpecificShelf } = require("../models/shelfModel");

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

const browseSpecificShelf = async (req, res) => {
    try {
        const shelf = await retrieveSpecificShelf(req.user.userId, req.params.id);
        return res.status(200).json({
            message: "Retrieved shelf successfully",
            shelf
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error retrieving this user's shelf"
        })
    }
}

module.exports = { browseAllShelves, browseSpecificShelf }