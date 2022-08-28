/* ./src/index.js
Get users from Github and Gitlabs
*/


// importing the dependencies
const config = require('dotenv').config()
const path = require('path')
const express = require("express");
const helmet = require("helmet");


const allowlist = ['https://avatars.githubusercontent.com', 'https://secure.gravatar.com/'];

  const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;

    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate));


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
  app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
  'client', 'build','index.html'));
  });
  }    
  

/* start up the API server on port 5000!*/
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
