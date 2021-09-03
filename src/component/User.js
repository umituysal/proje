import React from "react";
import Repo from "../component/Repo";
const User = ({ name,repos, image,public_repos }) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__header--left">
          <div className="left__text">
          <span>{name}</span>
          <span className="left__text--two">@{name}</span>
          </div>
          <img src={image} width="30" alt="" />
        </div>
        <div className="card__header--right">
          <span><b>{public_repos}</b> repo(s)</span>
         <span><b>{public_repos}</b> code</span>
        </div>
      </div>
      <div className="card__footer">
       <Repo repos={repos}/>
      </div>
    </div>
  );
};
export default User;
