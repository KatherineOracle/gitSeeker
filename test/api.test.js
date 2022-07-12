const request = require("request");
const expect = require("chai").expect;
const assert = require("chai").assert;

describe("API is running", function () {
  describe("Without request body", function () {
    it("status", function (done) {
      request("http://localhost:8080/api/",         {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET"
      }, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it("default response", function (done) {
      request("http://localhost:8080/api/",         {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET"
      }, function (error, response, body) {
        
        assert.equal(
          JSON.parse(body).message,
          "GitSeeker API is running."
        );

        done();
      });
    });
  });
});


describe("Search end point is running", function () {
  describe("Returns 100 results", function () {
    it("status", function (done) {
      request(
        "http://localhost:8080/api/search?s=who",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET"
        },
        function (error, response, body) {
          expect(JSON.parse(body).data.length).to.equal(100);
          done();
        }
      );
    });

  });
});

describe("Github User end point is running", function () {
  describe("Returns KatherineOracle", function () {
    it("status", function (done) {
      request(
        "http://localhost:8080/api/user/github/KatherineOracle",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET"
        },
        function (error, response, body) {
          expect(JSON.parse(body).data.html_url).to.equal("https://github.com/KatherineOracle");
          done();
        }
      );
    });

  });
});


describe("GitLab User end point is running", function () {
  describe("Returns KatherineOracle", function () {
    it("status", function (done) {
      request(
        "http://localhost:8080/api/user/gitlab/11977117",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET"
        },
        function (error, response, body) {
          expect(JSON.parse(body).data.html_url).to.equal("https://gitlab.com/KatherineOracle");
          done();
        }
      );
    });

  });
});
