var mysql = require('mysql');
var express = require("express");
const bodyParser = require("body-parser");
const encoder=bodyParser.urlencoded();
const app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "desi_drapes"
});

// Handle MySQL connection errors
con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + con.threadId);
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/", encoder, function(req, res) {
    var username = req.body.Username;
    var password = req.body.Password;
    
    con.query("SELECT * from users where username=?", [username], function(error, results, fields) {
        if (error) {
            console.error('Error executing MySQL query: ' + error.stack);
            res.redirect("/");
            return;
        }
        if (results.length > 0) {
            // Compare hashed password
            bcrypt.compare(password, results[0].password, function(err, result) {
                if (result) {
                    res.redirect("/welcome");
                } else {
                    res.redirect("/");
                }
            });
        } else {
            res.redirect("/");
        }
    });
});

app.get("/welcome", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8087, function() {
    console.log('App listening on port 8087');
});
