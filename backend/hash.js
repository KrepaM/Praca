const crypto = require("crypto");

function returnHash(data) {
  return crypto
    .createHash("md5")
    .update(data)
    .digest("hex");
}
