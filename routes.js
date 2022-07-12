const express = require('express');
const router = express.Router();

const { returnGitHubUser } = require('./controllers/readGitHubUser.js');
const { returnGitLabUser } = require('./controllers/readGitLabUser.js');
const { searchResultsFiltered }  = require('./controllers/searchResultsFiltered.js');

//Just to test that API is connected
router.route('/')
    .get((req, res) => {
        
        res.status(200).send({ message: "GitSeeker API is running." }); 
    });


//Search API - return search results from gitHub and GitLab (max 100)
router.route('/search')
.get((req, res) => {
    searchResultsFiltered(req.query.s).then(function(data) {
        res.status(200).send({ data: data }); 
    }).catch(function(err) {
        // epic fail, handle error here
        console.log(err);
        res.status(500).send({ error: "unable to search" }); 
    });
    }        
);

//User API - return result for a specific user on gitHub or GitLab
//Switch function depending on which platform the user is on
router.route('/user/:platform/:username')
.get((req, res) => {
    let func;
    switch (req.params.platform){
    case 'github' :
        func = returnGitHubUser;
    break;
    case 'gitlab':         
        func = returnGitLabUser;
    break;    
    }
    func(req.params.username).then(function(data) {
        res.status(200).send({ data: data }); 
    }).catch(function(err) {
        // epic fail, handle error here
        console.log(err);
        res.status(500).send({ error: "unable to find user" }); 
    });
    }        
);

module.exports = router
