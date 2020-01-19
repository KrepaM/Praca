const express = require("express");
const path = require("path");
const fs = require("fs");
const hash = require("./hash");
const fileIO = require("./fileIO");
const car = require("./car");
const person = require("./person");
const getAPI = require("./getAPI");
const postAPI = require("./postAPI");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getFilesFromDirectory(path) {
  fs.readdir(path, function(err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    } else {
      return files;
    }
  });
}
