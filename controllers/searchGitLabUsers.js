const request = require("request");

//get 50 user results from github
searchGitLabUsers = function (searchString) {
  return new Promise((resolve, reject) => {
    request(
      "https://gitlab.com/api/v4/users?&per_page=50&search=" + searchString,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITLAB_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
      (error, response, body) => {
        let cleanResults = [];
        if (response.statusCode === 200) {
          let results = JSON.parse(body);

          //populate empty array with only the data we need for our App
          results.forEach(function (item) {
            let obj = {
              id: item.id,
              username: item.username,
              avatar: item.avatar_url,
              platform: "gitlab",
            };

            cleanResults.push(obj);
          });
        }
        //may resolve with an empty array if remote API has an issue
        resolve(cleanResults);
      }
    ).on("error", reject);
  });
};

module.exports = {
  searchGitLabUsers,
};
