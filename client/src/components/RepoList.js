/*
Displays list of users latest repositories (max 10).
Has a child component Commits 
*/
import { ListGroup } from "react-bootstrap";
import Commits from "./Commits";

const RepoList = ({ user, platform, dateSettings }) => {

  if (typeof user.data.repositories === "undefined") {
    return <p>No repositories found.</p>;
  }
  if (user.data.repositories.length === 0) {
    return <p>No repositories found.</p>;
  }

  return (
    <>
      <h2>
        {user.data.login}'s repositories{" "}
        <small>
          <a rel="external" href={user.data.repos_url}>
            {" "}
          </a>
        </small>
      </h2>
      <ListGroup variant="flush">
        {user.data.repositories.map((repo, idx) => {
          return (
            <ListGroup.Item key={"repo-" + idx}>
              <h5>
                <a rel="external" href={repo.html_url}>
                  {repo.name}
                </a>{" "}
                <br />
                <small>
                  <span>
                    {repo.forks_count} Forks, {repo.star_count} stars
                  </span>
                  . Last updated on{" "}
                  {new Date(repo.updated_at).toLocaleDateString("en-US", dateSettings)}
                </small>
              </h5>
              <p>{repo.description}</p>
              <h6>Latest commits</h6>
              <Commits commits={repo.commits} dateSettings={dateSettings} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default RepoList;
