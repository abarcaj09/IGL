import "./PostHeader.css";
import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const PostHeader = ({ home, profilePic, username, children }) => {
  return (
    <div className={`postHeader ${home && "postHeader-home"}`}>
      <div className="postHeader-left">
        <Link to={`/${username}`}>
          <Avatar src={profilePic} alt={username} />
        </Link>

        <Link to={`/${username}`}>{username}</Link>
      </div>

      <div className="postHeader-right">{children}</div>
    </div>
  );
};

export default PostHeader;
