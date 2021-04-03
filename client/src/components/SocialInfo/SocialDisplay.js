import "./SocialDisplay.css";
import React from "react";
import { useSelector } from "react-redux";
import ProfileRow from "../ProfileRow";
import FollowButton from "../../components/FollowButton";

const SocialDisplay = ({ title, profiles, onClose }) => {
  const following = useSelector(({ user }) => {
    return user.following;
  });
  return (
    <div className="socialDisplay">
      <div className="socialDisplay-header">
        <h1>{title}</h1>
        <button onClick={onClose}>X</button>
      </div>

      <div className={"socialDisplay-body"}>
        {profiles.map((profile) => (
          <ProfileRow key={profile.id} {...profile} close={onClose}>
            <div
              className={`socialDisplay-button ${
                following.includes(profile.id)
                  ? "socialDisplay-followed"
                  : "socialDisplay-notFollowed"
              }`}
            >
              <FollowButton {...profile} />
            </div>
          </ProfileRow>
        ))}
      </div>
    </div>
  );
};

export default SocialDisplay;
