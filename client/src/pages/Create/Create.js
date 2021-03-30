import "./Create.css";
import React, { useState, useRef, useEffect } from "react";
import Slides from "../../components/Slides";
import PhotoIcon from "@material-ui/icons/Photo";
import { useDispatch, useSelector } from "react-redux";
import { createPost, clearPostError } from "../../reducers/postsReducer";
import { Redirect } from "react-router-dom";

const Create = () => {
  const dispatch = useDispatch();
  const { error, creationSuccess } = useSelector(({ posts }) => {
    return posts;
  });
  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  const [photos, setPhotos] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const inputFiles = useRef(null);

  useEffect(() => {
    setPhotos([]);
    setLoading(false);
  }, [error]);

  const readFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const readSelected = async (e) => {
    const selectedFiles = [...e.target.files];
    const results = await Promise.all(
      selectedFiles.map(async (file) => {
        const fileContents = await readFile(file);
        return fileContents;
      })
    );
    setPhotos(results);
  };

  const selectPhotos = () => {
    dispatch(clearPostError());
    inputFiles.current.click();
  };

  const submitPost = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createPost(photos, caption, config));
  };

  if (creationSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <div className="create">
      <p onClick={selectPhotos}>Select Photos</p>

      <input
        type="file"
        ref={inputFiles}
        accept="image/png, image/jpeg"
        onChange={readSelected}
        multiple
      />

      {photos.length ? (
        <div className="create-preview">
          <Slides photos={photos} />
        </div>
      ) : (
        <div className="create-photoContainer">
          <PhotoIcon />
        </div>
      )}

      <textarea
        className="create-caption"
        name="caption"
        value={caption}
        placeholder="Add a caption"
        onChange={(e) => setCaption(e.target.value)}
      />

      <button
        className="create-submit"
        onClick={submitPost}
        disabled={photos.length === 0}
      >
        Submit
      </button>

      {loading && (
        <div className="create-loading">
          <h3>Creating Post</h3>
        </div>
      )}

      {error && (
        <div className="create-error">
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
};

export default Create;
