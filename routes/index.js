// Dependencies
const express = require("express");
const userRoutes = require("./users");
const pagesRoutes = require("./pages");
const challengeRoutes = require("./challenge");
const router = express.Router();
const { checkUser } = require("../middleware/auth");

// Routes path
router.get("*", checkUser);
router.use("/", userRoutes);
router.use("/", pagesRoutes);
router.use("/", challengeRoutes);

// Export module
module.exports = router;
