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

router.post("/run", async (req, res) => {
    const { lang = "js", code } = req.body;

    if (code === undefined)
        return res.status(401).json({ Error: "Empty code body" });
    const filePath = await generateFile(lang, code);
    const output = await executeCode(filePath);
    return res.json({ filePath: filePath, output: output });
});

// Export module
module.exports = router;
