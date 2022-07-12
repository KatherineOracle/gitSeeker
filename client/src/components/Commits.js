/* Display top 5 commits per repository 

Displays "No Commits." if there are no commits in the object.
*/

const Commits = ({ commits, dateSettings }) => {


  if (commits.length === 0) {
    return <p>No Commits.</p>;
  }

  return (
      <ul>
        {commits.map((commit, idxx) => {
          return (
            <li key={"commit-" + idxx}>
              <strong>{commit.message}</strong> <br />
              <small>
                {new Date(commit.date).toLocaleDateString(
                  "en-US",
                  dateSettings
                )}
              </small>
            </li>
          );
        })}
      </ul>
  );
};

export default Commits;
