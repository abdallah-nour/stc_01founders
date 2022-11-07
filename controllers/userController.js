// Dependencies
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

//Post Request that handles Register
const registerPost = async (req, res) => {
    const { username, email, password, score = 0 } = req.body;
    if (!username || !email || !password) {
        console.log("Fill inputs");
    } else {
        //Validation
        User.findOne({
            $or: [{ email: email }, { username: username }],
        }).then(async (user) => {
            if (user) {
                let errors = {};
                if (user.email === email) {
                    errors.email = "Email already exists";
                } else if (user.username === username) {
                    errors.username = "Username already exists";
                }
                res.status(400).json({ errors });
            } else {
                try {
                    //Validation
                    const newUser = await User.create({
                        username,
                        email,
                        password,
                        score,
                    });

                    const token = createToken(newUser._id);
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 800,
                    });
                    res.status(201).json({ user: newUser._id });
                } catch (err) {
                    const errors = handleErrors(err);
                    res.status(400).json({ errors });
                }
            }
        });
    }
};

//Logging in Function
const loginPost = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 800,
        });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
};

//Logout user
const logoutUser = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/login");
};

// For register view
const registerGet = (req, res) => {
    res.render("register");
};

// For login view
const loginGet = (req, res) => {
    res.render("login");
};

// Get all users
const usersList = (req, res) => {
    User.find({}, (err, users) => {
        res.render("users", { users: users });
    });
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "jasp7@2011", {
        expiresIn: maxAge,
    });
};
module.exports = {
    loginPost,
    registerPost,
    registerGet,
    loginGet,
    logoutUser,
    usersList,
};
