const request = require("request");

//get 50 user results from github
searchGitHubUsers = function (searchString) {
  return new Promise((resolve, reject) => {

    let gitHubQuery = encodeURIComponent(
      `${searchString} in:name OR ${searchString} in:email OR ${searchString} in:login`
    );

    request(
      "https://api.github.com/search/users?page=1&per_page=50&q=" + gitHubQuery,
      {
        headers: {
          "User-Agent": `${process.env.GITHUB_USER}`,
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
      (error, response, body) => {

        let cleanResults = [];
        if (response.statusCode === 200) {
          let results = JSON.parse(body);

          //populate empty array with only the data we need for our App
          results.items.forEach(function (item) {
            let obj = {
              id: item.login,
              username: item.login,
              avatar: item.avatar_url,
              platform: "github",
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
  searchGitHubUsers,
};
