/* ./src/index.js
Get users from Github and Gitlabs
*/


// importing the dependencies
const config = require('dotenv').config()
const path = require('path')
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");

const PORT = process.env.PORT || 5000;

// defining the Express app
const app = express();

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cors());
app.use("/api", routes);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*',(req,res)=> {
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
  });
  }    
  

/* start up the API server on port 5000!*/
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
