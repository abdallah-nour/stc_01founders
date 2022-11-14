// Dependencies
const express = require("express");
const router = express.Router();
const {
  createChallenge,
  getChallenges,
  deleteChallenge,
  displayChallenge,
} = require("../controllers/ChallengeController");
const { isAuthenticated } = require("../middleware/auth");

// Route path
router.get("/challenges", isAuthenticated, getChallenges);
router.post("/create_challenge", isAuthenticated, createChallenge);
router.post("/delete_challenge", isAuthenticated, deleteChallenge);
router.get("/challenge/:title", isAuthenticated, displayChallenge);

// Export module
module.exports = router;
