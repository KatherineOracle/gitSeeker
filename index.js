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
app.use(helmet());
app.use(express.json());


app.use(cors());
app.use("/api", routes);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*',(req,res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' https://avatars.githubusercontent.com https://secure.gravatar.com;");
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
  });
  }    
  

/* start up the API server on port 5000!*/
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
