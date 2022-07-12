const { searchGitHubUsers }  = require('./searchGitHubUsers.js');
const { searchGitLabUsers }  = require('./searchGitLabUsers.js');


/*
Request results from the GitHub Module and the Gitlab module 
Each API will return a limit of 50 results.
Once both promises have resolved, merge the two results sets 
then sort them by user name.
*/
searchResultsFiltered = function(searchString) {

    return Promise.all([searchGitHubUsers(searchString),searchGitLabUsers(searchString)]).then(datas => {

        mergedData = [];
        for(let i = 0; i < datas.length; i++){
          mergedData.push(...datas[i]);
        }

        function compare( a, b ) {
          if ( a.username < b.username ){
            return -1;
          }
          if ( a.username > b.username ){
            return 1;
          }
          return 0;
        }
        
        mergedData.sort( compare );        
        return mergedData;
    })
    .catch(error => {
        console.log(error);
        return {error: "Could not return results"}
    });
    
  }
  
  module.exports = {
    searchResultsFiltered
  };
  
  