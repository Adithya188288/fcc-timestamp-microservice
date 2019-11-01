const express = require("express")
const router = express.Router()


// api route for the date_string
router.get("/:date_string?", function(req, res) {

  const invalidDate = { error:"Invalid Date" };  // invalid Date Object to be sent
  
  // if no date is sent by the client, then sent current unix and utc string
  
if (req.params.date_string === undefined) {
    const tempDate = new Date(Date.now());
    const resultToSend = {unix:Number(tempDate.getTime()),utc:tempDate.toUTCString()}
    return res.send(resultToSend)
  }

//  if the date string include an hypen `-`, then its might be a date format.   

  if (req.params.date_string.includes("-")) {
    const newDate = new Date(req.params.date_string);

    if (newDate.toString() === "Invalid Date") { // if not able to create a date, send the invalid date object
      return res.send(invalidDate);
    }

    const resultToSend = {
      unix: Number(newDate.getTime()),
      utc: newDate.toUTCString()
    };
    return res.send(resultToSend);

  } else {

    // if the client send a unix timestamp

    const unixNumber = Number(req.params.date_string);
    if (isNaN(unixNumber)) return res.send(invalidDate); // check if the client send valid unix timestamp by converting the value to a number


    const newDate = new Date(unixNumber);
  
    const resultToSend = {
      unix: unixNumber,
      utc: newDate.toUTCString()
    };
    return res.send(resultToSend);
  }
});


module.exports = router;