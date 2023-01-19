/*
Student Name: Alfej Savaya
Student Email: aasavaya@myseneca.ca
Student ID: 118823210
Class: WEB322 NOO
Date: November 21, 2022
*/

const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");

const HTTP_PORT = process.env.PORT || 8080;

// Register handlerbars as the rendering engine for views
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static("static"));

// Setup client-sessions
app.use(clientSessions({
    cookieName: "session", // this is the object name that will be added to 'req'
    secret: "week10example_web322", // this should be a long un-guessable string.
    duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
    activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// This is a helper middleware function that checks if a user is logged in
// we can use it in any route that we want to protect against unauthenticated access.
// A more advanced version of this would include checks for authorization as well after
// checking if the user is authenticated
function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}


// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// A simple user object, hardcoded for this example
const user = {
    username: "alfej",
    password: "alfej786",
    email: "alfej786@gmail.com"
};

// Setup a route on the 'root' of the url to redirect to /login
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Display the login html page
app.get("/login", function (req, res) {
    res.render("login", { layout: false });
});

// The login route that adds the user to the session
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "") {
        // Render 'missing credentials'
        return res.render("login", { errorMsg: "Missing credentials.", layout: false });
    }

    // use sample "user" (declared above)
    if (username === user.username && password === user.password) {

        // Add the user on the session and redirect them to the dashboard page.
        req.session.user = {
            username: user.username,
            email: user.email
        };

        res.redirect("/dashboard");
    } else {
        // render 'invalid username or password'
        res.render("login", { errorMsg: "invalid username or password!", layout: false });
    }
});

// Log a user out by destroying their session
// and redirecting them to /login
app.get("/logout", function (req, res) {
    req.session.reset();
    res.redirect("/login");
});

app.listen(HTTP_PORT, onHttpStart);

// An authenticated route that requires the user to be logged in.
// Notice the middleware 'ensureLogin' that comes before the function
// that renders the dashboard page
app.get("/dashboard", ensureLogin, (req, res) => {
    res.render("dashboard", { user: req.session.user, layout: false });
});