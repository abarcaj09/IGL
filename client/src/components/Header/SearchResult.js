import "./SearchResult.css";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const SearchResult = ({ username, profilePic, name }) => {
  return (
    <Link to={`/${username}`}>
      <div className="searchResult">
        <Avatar src={profilePic} alt={name} />
        <div className="searchResult-text">
          <h4>{username}</h4>
          <p>{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
