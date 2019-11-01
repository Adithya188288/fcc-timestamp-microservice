// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var joi = require("@hapi/joi");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// api route for the project
app.get("/api/timestamp/:date_string?", function(req, res) {
  const invalidDate = { error:"Invalid Date" };
  if (req.params.date_string === undefined) {
    const tempDate = new Date(Date.now());
    const resultToSend = {unix:Number(tempDate.getTime()),utc:tempDate.toUTCString()}
    return res.send(resultToSend)
  }

  console.log(req.params.date_string);
  if (req.params.date_string.includes("-")) {
    const newDate = new Date(req.params.date_string);

    if (newDate.toString() === "Invalid Date") {
      return res.send(invalidDate);
    }

    const resultToSend = {
      unix: Number(newDate.getTime()),
      utc: newDate.toUTCString()
    };
    return res.send(resultToSend);
  } else {
    const unixNumber = Number(req.params.date_string);
    if (isNaN(unixNumber)) return res.send(invalidDate);


    const newDate = new Date(unixNumber);
  
    const resultToSend = {
      unix: unixNumber,
      utc: newDate.toUTCString()
    };
    return res.send(resultToSend);
  }
});

var PORT = process.env.PORT || 3000;

// listen for requests :)
var listener = app.listen(PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
