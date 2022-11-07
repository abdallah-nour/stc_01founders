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
    //isDone
    isDone: {
        type: Boolean,
        default: false,
    },
    // Initial code
    initialCode: {
        js: {
            type: String,
            require: true,
        },
        go: {
            type: String,
            require: true,
        },
        py: {
            type: String,
            require: true,
        },
        c: {
            type: String,
            require: true,
        },
    },
});

ChallengeSchema.statics.deleteById = function (id) {
    return this.deleteOne({ _id: id });
};

const Challenge = mongoose.model("Challenge", ChallengeSchema);

// Export module
module.exports = Challenge;
