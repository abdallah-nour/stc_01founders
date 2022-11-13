// Dependencies
const express = require("express");
const userRoutes = require("./users");
const pagesRoutes = require("./pages");
const challengeRoutes = require("./challenge");
const codeExecutionRoutes = require("./codeExecution.js");
const router = express.Router();
const { checkUser } = require("../middleware/auth");

// Routes path
router.get("*", checkUser);
router.use("/", userRoutes);
router.use("/", pagesRoutes);
router.use("/", challengeRoutes);
router.use("/", codeExecutionRoutes);

// Export module
module.exports = router;
