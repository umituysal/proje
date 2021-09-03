import React from "react";

const Repo = ({ repos }) => {
  return (
    <div>
      <ul className="project">
        {repos.map((repo) => (
          <li className="project__detail" key={repo.language}>
            <span className="one"></span>
            <span className="two">{repo.language}</span>
            <span className="three">%{repo.percent}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Repo;
