/* ./src/index.js
Get users from Github and Gitlabs
*/


// importing the dependencies
const config = require('dotenv').config()
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT || 8080;

// defining the Express app
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use("/api", routes);


/* start up the API server on port 8080!*/
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
