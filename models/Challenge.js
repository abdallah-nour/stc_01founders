// Dependencies
const mongoose = require("mongoose");

const ChallengeSchema = mongoose.Schema({
    //title
    title: {
        type: String,
        require: [true, "You need to put a title"],
    },
    //xp
    xp: {
        type: Number,
        require: [true, "You need to put xp value"],
    },
    //task
    task: {
        type: String,
        require: [true, "You need to put a task"],
    },
});

ChallengeSchema.statics.deleteById = function (id) {
    return this.deleteOne({ _id: id });
};

const Challenge = mongoose.model("Challenge", ChallengeSchema);

// Export module
module.exports = Challenge;
