// Dependencies
const Challenge = require("../models/Challenge");
const ChallengesSubmissions = require("../models/ChallengesSubmissions");

// Handle errors
const handleErrors = (err) => {
    let errors = { email: "", username: "", password: "" };

    // validation errors
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // Incorrect username
    if (err.message.includes("Incorrect username")) {
        errors.username = "Incorrect username";
    }
    if (err.message.includes("Incorrect password")) {
        errors.password = "Incorrect password";
    }
    return errors;
};

// Create a new challenge
const createChallenge = async (req, res) => {
    // Get value from req body
    const { title, xp, task } = req.body;

    try {
        Challenge.findOne({ title: title }).then(async (challenge) => {
            if (challenge) {
                let errors = {};
                if (user.title === title) {
                    errors.title = "Title already picked";
                }
                res.status(400).json({ errors });
            } else {
                try {
                    const newChallenge = await Challenge.create({
                        title,
                        xp,
                        task,
                    });
                    res.status(201).json({ challenge: newChallenge._id });
                } catch (err) {
                    const errors = handleErrors(err);
                    res.status(400).json({ errors });
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
};

// Get all challenges
const getChallenges = (req, res) => {
    Challenge.find({}, (err, challenges) => {
        res.render("challenges", { challenges: challenges });
    });
};

// Delete a challenge
const deleteChallenge = async (req, res) => {
    // Get the value from req body
    const { id } = req.body;

    // Find if id exist
    Challenge.findOne({
        _id: id,
    }).then(async (challenge) => {
        try {
            await Challenge.deleteById(id);
            console.log("Challenge deleted successfully");
        } catch (err) {
            console.log(err);
        }
    });
};

// Display challenge
const displayChallenge = (req, res) => {
    const title = req.params.title;

    try {
        Challenge.findOne({ title: title }).then(async (challenge) => {
            if (challenge) {
                res.render("challenge", { challenge: challenge });
            } else {
                res.status(404).json({ error: "Not Found !" });
            }
        });
    } catch (err) {
        console.log(err);
    }
};

// Export module
module.exports = {
    createChallenge,
    getChallenges,
    deleteChallenge,
    displayChallenge,
};
