// Dependencies
const express = require("express");
const router = express.Router();
const {
    loginPost,
    registerPost,
    registerGet,
    loginGet,
    logoutUser,
    usersList,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");

// path routes
router.get("/login", loginGet);

router.get("/register", registerGet);

router.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard");
});

router.post("/login", loginPost);

router.post("/register", registerPost);

router.get("/logout", logoutUser);

router.get("/users", isAuthenticated, usersList);

// Export module
module.exports = router;
