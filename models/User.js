// Dependencies
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address"],
  },
  score: {
    type: Number,
    required: true,
  },
  solvedChallenges: {
    type: [String],
    default: [],
  },
});

//Password Hashing before we store in db
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect username");
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
