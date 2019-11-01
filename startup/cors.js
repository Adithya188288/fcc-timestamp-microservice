// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");


//there should be only one instance of app running
module.exports = function(app){
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204
}