/*
Get all the information about a single GitLab user
0) returnGitLabUser = merge it all into one object
1) User details = readGitLabUser
2) Repositories = readGitLabUserRepos
3) Commits = readGitLabUserRepoCommits
*/
const request = require("request");


//set our header constant once, we will need this for all our API calls
const headerOptions = {
  headers: {
    Authorization: `Bearer ${process.env.GITLAB_TOKEN}`,
    "Content-Type": "application/json",
  },
};



returnGitLabUser = function (username) {

  //get the user and their repos in parallel 
  return Promise.all([readGitLabUser(username), readGitLabUserRepos(username)])
    .then((datas) => {
      const userData = datas[0];
      const RepoData = datas[1];

      //pop the repositories as a node onto the user data
      userData.repositories = RepoData;
      return userData;
    })
    .then((userRepoData) => {

      //for each repository fetch the latest commits in parallel
      return Promise.all(
        userRepoData.repositories.map((repo) => {
          return readGitLabUserRepoCommits(username, repo.id);
        })
        )
        .then((commitDatas) => {
          //when the promises resolve we can pop the commits onto their respective repository nodes
          for (let i = 0; i < userRepoData.repositories.length; i++) {
            userRepoData.repositories[i].commits = commitDatas[i];
          }
          return userRepoData;
        })
        .catch((error) => {
          console.log(error);
          return {error: "Could not get commits"}
        });
    })
    .catch((error) => {
      console.log(error);
      return {error: "Could not get user data"}
    });
};

// fetch a specific user by id
const readGitLabUser = function (userid) {
  return new Promise((resolve, reject) => {

    request(
      "https://gitlab.com/api/v4/users/" + userid,
      headerOptions,
      (error, response, body) => {

        let cleanObj = {};

        //if response is good, populate a clean object
        //with the data we need, in the format we need
        if (response.statusCode === 200) {
          let results = JSON.parse(body);
          cleanObj = {
            id: results.id,
            avatar_url: results.avatar_url,
            name: results.name,
            followers: results.followers,
            following: results.following,
            login: results.username,
            html_url: results.web_url,
            email: results.public_email,
            location: results.location,
            public_repos: null,
            public_gists: null,
            repos_url:
              "https://gitlab.com/users/" + results.username + "/projects",
            gists_url: null,
            created_at: results.created_at,
            bio: results.bio,
          };
        }
        /*resolve the promise with the clean 
        (or empty if there was an error) object
        */
        resolve(cleanObj);
      }
    ).on("error", reject);
  });
};

// Fetch the latest 10 repositories for a specific gitLab user
const readGitLabUserRepos = function (userid) {
  return new Promise((resolve, reject) => {
    
    request(
      "https://gitlab.com/api/v4/users/" + userid + "/projects?per_page=10",
      headerOptions,
      (error, response, body) => {
        let cleanObjs = [];
        //populate a clean object array with the data we need, in the format we need
        if (response.statusCode === 200) {
          let results = JSON.parse(body);
          for (let item of results) {
            let cleanObj = {
              id: item.id,
              name: item.name,
              html_url: item.web_url,
              forks_count: item.forks_count,
              star_count: item.star_count,
              updated_at: item.last_activity_at,
              description: item.description,
            };
            cleanObjs.push(cleanObj);
          }
        }
        /*resolve the promise with the clean 
        (or empty, if there was an error) object array
        */        
        resolve(cleanObjs);
      }
    ).on("error", reject);
  });
};

// Fetch the latest 5 commits for a specific gitLab project
const readGitLabUserRepoCommits = function (username, repoId) {
  return new Promise((resolve, reject) => {
    //gitLab
    request(
      "https://gitlab.com/api/v4/projects/" +
        repoId +
        "/repository/commits?per_page=5&page=1",
      headerOptions,
      (error, response, body) => {
        let cleanObjs = [];
        //populate a clean object array with the data we need, in the format we need
        if (response.statusCode === 200) {
          let results = JSON.parse(body);

          for (let item of results) {
            let cleanObj = {
              message: item.title,
              committer: item.author_name,
              date: item.created_at,
            };
            cleanObjs.push(cleanObj);
          }
        }
        /*resolve the promise with the clean 
        (or empty, if there was an error) object array
        prevents API from hanging if one call has an issue
        */          
        resolve(cleanObjs);
      }
    ).on("error", reject);
  });
};

module.exports = {
  returnGitLabUser,
};
