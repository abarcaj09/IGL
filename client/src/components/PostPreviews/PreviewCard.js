import "./PreviewCard.css";
import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ForumIcon from "@material-ui/icons/Forum";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

const PreviewCard = ({ id, images, likes, comments }) => {
  return (
    <div className="previewCard">
      <Link to={`/p/${id}`}>
        <img src={images[0]} alt="post preview" className="previewCard-image" />
      </Link>

      <div className="previewCard-statsContainer">
        <div className="previewCard-stats">
          <FavoriteIcon />
          <h3>{likes.length}</h3>
        </div>

        <div className="previewCard-stats">
          <ForumIcon />
          <h3>{comments.length}</h3>
        </div>
      </div>

      {images.length > 1 && (
        <PhotoLibraryIcon className="previewCard-photoIcon" />
      )}
    </div>
  );
};

export default PreviewCard;
