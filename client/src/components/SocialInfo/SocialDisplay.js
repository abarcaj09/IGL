import "./SocialDisplay.css";
import React from "react";
import ProfileRow from "../ProfileRow";
import FollowButton from "../../components/FollowButton";

const SocialDisplay = ({ title, profiles, onClose }) => {
  return (
    <div className="socialDisplay">
      <div className="socialDisplay-header">
        <h1>{title}</h1>
        <button onClick={onClose}>X</button>
      </div>

      <div className="socialDisplay-body">
        {profiles.map((profile) => (
          <ProfileRow key={profile.id} {...profile} close={onClose}>
            <FollowButton {...profile} />
          </ProfileRow>
        ))}
      </div>
    </div>
  );
};

export default SocialDisplay;
