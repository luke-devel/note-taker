// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/notes.html"));
});
// Displays all notes

app.get("/api/notes", function (req, res) {
  var obj;
  fs.readFile(__dirname, "../db/db.json", function (err, data) {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<html><head><title>error.</title></head><body><h1>Oops, there was an error</h1></html>");
    }
    else {
      res.writeHead(200, { "Content-Type": "text/html" });
      return data;
    }
  });
});

// // Displays a single character, or returns false
// app.get("/api/characters/:character", function (req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
