// const express = require("express");

// const app = express();


// // creating db
// app.get("/createdb", (req, res) => {
//     let sql = "CREATE DATABASE chatBots";
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("database created...");
//     });
// });

// // creating db table
// app.get("/createposttable", (req, res) => {
//     let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("new table created");
//     });
// });

// app.get("/addpost1", (req, res) => {
//     let post = { title: "Post One", body: "This is post number one" }
//     let sql = "INSERT INTO posts SET ?";
//     let query = db.query(sql, post, (err, result) => {
//         console.log(result);
//         res.send("Post 1 added");
//     })
// });

// app.get("/addpost2", (req, res) => {
//     let post = { title: "Post two", body: "This database is savage af" }
//     let sql = "INSERT INTO posts SET ?";
//     let query = db.query(sql, post, (err, result) => {
//         console.log(result);
//         res.send("Post 1 added");
//     })
// });

// app.get("/getposts", (req, res) => {
//     let sql = "SELECT * FROM posts";
//     let query = db.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         res.send("Posts fetched...");
//     });
// });

// app.get("/getpost/:id", (req, res) => {
//     let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("Post fetched...");
//     });
// });

// app.get("/updatepost/:id", (req, res) => {
//     let newTitle = "New title Boss"
//     let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         res.send("Updated...");
//     });
// });

// app.listen("3000", () => {
//     console.log("Server started on port 3000");
// });
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var RiveScript = require("rivescript");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Import routes and give the server access to them.
var routes = require("./controllers/chatbots_controllers.js");

app.use(routes);

app.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});