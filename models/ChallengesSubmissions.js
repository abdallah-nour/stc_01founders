// Dependencies
const mongoose = require("mongoose");

const ChallengesSubmissionsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, "You need to put a user id"],
  },
  lang: {
    type: String,
    require: [true, "You need to put code language"],
  },
  code: {
    type: String,
    require: [true, "You need to put code"],
  },
  challengeTitle: {
    type: String,
    require: [true, "You need to put challenge title"],
  },
  status: {
    type: String,
    require: [true, "You need to put status"],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  result: {
    type: Object,
    require: [true, "You need to put api result"]
  },
  requestId: {
    type: String,
    require: [true, "You need to put api request id"]
  },
  logs: {
    type: String,
    default: undefined,
  },
  executionReturnValue: {
    type: String,
    default: null,
  },
  stderr: {
    type: String,
    default: null,
  },
  outputUrl: {
    type: String,
    default: null,
  },
});

ChallengesSubmissionsSchema.statics.deleteById = function (id) {
  return this.deleteOne({ _id: id });
};

const Challenge = mongoose.model("ChallengesSubmissions", ChallengesSubmissionsSchema);

module.exports = Challenge;
