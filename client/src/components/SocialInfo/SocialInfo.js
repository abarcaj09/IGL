import "./SocialInfo.css";
import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import SocialDisplay from "./SocialDisplay";

const SocialInfo = ({ count, relation, profiles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [relationText, setRelationText] = useState(relation);

  //   change relation from plural if count is 1
  if (count === 1 && (relation === "likes" || relation === "followers")) {
    setRelationText(relation.slice(0, relation.length - 1));
  }

  useEffect(() => {
    if (profiles.length === 0) {
      setIsOpen(false);
    }
  }, [profiles]);

  return (
    <div>
      {count > 0 ? (
        <div className="socialInfo">
          <p onClick={() => setIsOpen(true)}>
            <span>{count}</span> {relationText}
          </p>
          <Modal isOpen={isOpen}>
            <SocialDisplay
              title={relation}
              profiles={profiles}
              onClose={() => setIsOpen(false)}
            />
          </Modal>
        </div>
      ) : (
        <div className="socialInfo inactive">
          <p>
            <span>{count}</span> {relationText}
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialInfo;
