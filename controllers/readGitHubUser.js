/*
Get all the information about a single GitLab user
0) returnGitHubUser = merge it all into one object
1) User details = readGitHubUser
2) Repositories = readGitHubUserRepos
3) Commits = readGitHubUserRepoCommits
*/

const request = require("request");

//set our header constant once, we will need this for all our API calls
const headerOptions = {
  headers: {
    "User-Agent": `${process.env.GITHUB_USER}`,
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
};

returnGitHubUser = function (username) {

  //get the user and their repos in parallel 
  return Promise.all([readGitHubUser(username), readGitHubUserRepos(username)])
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
          return readGitHubUserRepoCommits(username, repo.name);
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
const readGitHubUser = function (username) {
  return new Promise((resolve, reject) => {

    request(
      "https://api.github.com/users/" + username,
      headerOptions,
      (error, response, body) => {
        let cleanObj = {};

        //if response is good, populate a clean object
        //with the data we need, in the format we need
        if (response.statusCode === 200) {
          let results = JSON.parse(body);

          cleanObj = {
            id: results.login,
            avatar_url: results.avatar_url,
            name: results.name,
            followers: results.followers,
            following: results.following,
            login: results.login,
            html_url: results.html_url,
            email: results.email,
            location: results.location,
            public_repos: results.public_repos,
            public_gists: results.public_gists,
            repos_url: results.repos_url,
            gists_url: results.gists_url,
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
const readGitHubUserRepos = function (username) {
  return new Promise((resolve, reject) => {
    request(
      "https://api.github.com/users/" +
        username +
        "/repos?per_page=10&page=1&sort=created",
      headerOptions,
      (error, response, body) => {
        let cleanObjs = [];

        //if response is good, populate a clean array
        //with the data we need, in the format we need           
        if (response.statusCode === 200) {
          let results = JSON.parse(body);

          for (let item of results) {
            let cleanObj = {
              id: item.name,
              name: item.name,
              html_url: item.html_url,
              forks_count: item.forks_count,
              star_count: item.stargazers_count,
              updated_at: item.updated_at,
              description: item.description,
            };

            cleanObjs.push(cleanObj);
          }
        }

        /*resolve the promise with the clean 
        (or empty if there was an error) array
        */          
        resolve(cleanObjs);
      }
    ).on("error", reject);
  });
};


// Fetch the latest 5 commits for a specific gitLab project
const readGitHubUserRepoCommits = function (username, repoName) {
  return new Promise((resolve, reject) => {
    //github
    request(
      "https://api.github.com/repos/" +
        username +
        "/" +
        repoName +
        "/commits?per_page=5&page=1",
      headerOptions,
      (error, response, body) => {
        let cleanObjs = [];

        //if response is good, populate a clean array
        //with the data we need, in the format we need        
        if (response.statusCode === 200) {
          let results = JSON.parse(body);

          for (let item of results) {
            let cleanObj = {
              message: item.commit.message,
              committer: item.commit.author.name,
              date: item.commit.author.date,
            };
            cleanObjs.push(cleanObj);
          }
        }
        /*resolve the promise with the clean 
        (or empty, if there was an error) object array.
        prevents API from hanging if one call has an issue
        */          
        resolve(cleanObjs);
      }
    ).on("error", reject);
  });
};

module.exports = {
  returnGitHubUser,
};
