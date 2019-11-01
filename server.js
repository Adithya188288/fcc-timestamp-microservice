// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// All module in startup folder will run as an IIFE
require("./startup/cors.js")(app);
require("./startup/routes.js")(app);

var PORT = process.env.PORT || 3000;

// listen for requests :)
var listener = app.listen(PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
