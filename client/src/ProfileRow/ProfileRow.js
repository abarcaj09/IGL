import "./ProfileRow.css";
import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const ProfileRow = ({
  username,
  profilePic,
  username,
  name,
  largePic,
  children,
  close,
}) => {
  const profilePage = `/${username}`;
  return (
    <div className="profileRow">
      <div
        className={`profileRow-left ${largePic && "profileRow-left--large"}`}
      >
        <Link to={profilePage} onClick={close}>
          <Avatar src={profilePic} alt={`${username}`} />
        </Link>
        <div className="profileRow-names">
          <h3>
            <Link to={profilePage} onClick={close}>
              {username}
            </Link>
          </h3>

          <p>{name}</p>
        </div>
      </div>

      {children}
    </div>
  );
};

export default ProfileRow;
