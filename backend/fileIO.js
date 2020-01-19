const fs = require("fs");

function readFromFile(name) {
  try {
    return fs.readFileSync(name, "utf8");
  } catch (err) {
    console.error(err);
  }
}

function writeToFile(name, data) {
  try {
    fs.writeFileSync(name, data);
  } catch (err) {
    console.error(err);
  }
}
