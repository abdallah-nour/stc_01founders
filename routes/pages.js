// Dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isAuthenticated } = require("../middleware/auth");

// Route Path
router.get("/scoreboard", isAuthenticated, (req, res) => {
    User.find({})
        .sort({ score: -1 })
        .find((err, users) => {
            res.render("scoreboard", { users: users });
        });
});

// module export
module.exports = router;
