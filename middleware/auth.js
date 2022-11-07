// Dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exist & is verified
    if (token) {
        jwt.verify(token, "jasp7@2011", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exist & is verified
    if (token) {
        jwt.verify(token, "jasp7@2011", async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

// Export module
module.exports = { isAuthenticated, checkUser };
