import "./Header.css";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Avatar } from "@material-ui/core";

const Header = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");

  //   temp will be replaced by user in redux store
  const user = { username: "sample", name: "sam", profilePic: "" };

  return (
    <div className="Header">
      <div className="Header-container">
        <div className="Header-logoContainer">
          <Link to="/">
            <img className="Header-logo" src="/igl-logo.png" alt="logo" />
          </Link>
        </div>

        <div className="Header-searchContainer">
          <div className="Header-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="Header-iconsContainer">
          <div className="Header-icons">
            <Link to="/" className="Header-icon">
              <HomeIcon
                className={` ${location.pathname === "/" && "active"}`}
              />
            </Link>

            <Link to="/explore" className="Header-icon">
              <ExploreIcon
                className={` ${location.pathname === "/explore" && "active"}`}
              />
            </Link>

            <Link to="/create" className="Header-icon">
              <AddAPhotoIcon
                className={` ${location.pathname === "/create" && "active"}`}
              />
            </Link>

            <Avatar
              className={` ${
                location.pathname.split("/")[1] === user.username &&
                "activeAvatar"
              }`}
              src={user.profilePic}
              alt={user.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
