// Dependencies
const express = require("express");
const router = express.Router();
const {
  createChallenge,
  getChallenges,
  deleteChallenge,
  displayChallenge,
} = require("../controllers/ChallengeController");
const { isAuthenticated, checkUser } = require("../middleware/auth");

// Route path
router.get("/challenges", isAuthenticated, checkUser, getChallenges);
router.post("/create_challenge", isAuthenticated, checkUser, createChallenge);
router.post("/delete_challenge", isAuthenticated, checkUser, deleteChallenge);
router.get("/challenge/:title", isAuthenticated, checkUser, displayChallenge);

// Export module
module.exports = router;
