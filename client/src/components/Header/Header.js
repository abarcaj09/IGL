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
    <div className="header">
      <div className="header-container">
        <div className="header-logoContainer">
          <Link to="/">
            <img className="header-logo" src="/igl-logo.png" alt="logo" />
          </Link>
        </div>

        <div className="header-searchContainer">
          <div className="header-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="header-iconsContainer">
          <div className="header-icons">
            <Link
              to="/"
              className={`header-icon ${location.pathname === "/" && "active"}`}
            >
              <HomeIcon />
            </Link>

            <Link
              to="/explore"
              className={`header-icon ${
                location.pathname === "/explore" && "active"
              }`}
            >
              <ExploreIcon />
            </Link>

            <Link
              to="/create"
              className={`header-icon ${
                location.pathname === "/create" && "active"
              }`}
            >
              <AddAPhotoIcon />
            </Link>

            <Avatar
              className={` ${
                location.pathname.split("/")[1] === user.username &&
                user.username.length > 0 &&
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
