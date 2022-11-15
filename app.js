// Dependencies
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());

// Static folder
app.use("/assets", express.static(path.join(__dirname, "public")));
app.use("/challenge/assets", express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Route path
app.use("/", router);

// ERROR Middleware
app.use((error, req, res, next) => {
    console.log("middleware handled error", error);
    const status = error.statusCode || 500;
    const { message, data } = error;
    res.status(status).json({ message, data });
});

// Mongodb connection
const database = process.env.MONGOLAB_URL;

mongoose
    .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Successfully connected !"))
    .catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Start listening on port ${PORT}`);
});
