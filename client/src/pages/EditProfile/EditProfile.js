import "./EditProfile.css";
import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { editUser, clearSuccess, clearError } from "../../reducers/userReducer";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => {
    return user;
  });
  const config = useSelector(({ auth }) => {
    return auth.config;
  });

  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const inputFile = useRef(null);

  useEffect(() => {
    setProfilePic(user.profilePic);
    setName(user.name);
    setBiography(user.biography);
  }, [user.profilePic, user.name, user.biography]);

  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [biography]);

  const submitChanges = (e) => {
    e.preventDefault();
    dispatch(clearSuccess());
    dispatch(clearError());

    if (profilePic === user.profilePic) {
      dispatch(editUser("", name, biography, user.username, config));
    } else {
      dispatch(editUser(profilePic, name, biography, user.username, config));
    }
  };

  const onChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setProfilePic(reader.result);
      };
    }
  };

  const choosePhoto = () => {
    inputFile.current.click();
  };

  return (
    <div className="editProfile">
      <div className="editProfile-photo">
        <Avatar src={profilePic} alt={name} />
        <div className="editProfile-photoRight">
          <h1>{user.username}</h1>
          <button onClick={choosePhoto}>Change Profile Photo</button>
          <input
            type="file"
            ref={inputFile}
            accept="image/png, image/jpeg"
            onChange={onChange}
          />
        </div>
      </div>

      <form className="editProfile-form" onSubmit={submitChanges}>
        <div className="editProfile-formRow">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="editProfile-formRow">
          <label>Bio</label>
          <textarea
            ref={textareaRef}
            name="biography"
            value={biography}
            placeholder="Edit your bio here"
            onChange={(e) => setBiography(e.target.value)}
          />
        </div>

        <div className="editProfile-bottom">
          <button type="submit">Save</button>
        </div>
      </form>

      <div className="editProfile-success">
        {user.success && <h3>Changes Saved</h3>}
      </div>

      <div className="editProfile-error">
        {user.error && <h3>{user.error}</h3>}
      </div>
    </div>
  );
};

export default EditProfile;
