import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Avatar } from "@material-ui/core";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import searchService from "../../services/search";
import SearchResult from "./SearchResult";
import useDebounce from "./useDebounce";

const Header = () => {
  const location = useLocation();
  const user = useSelector(({ user }) => {
    return user;
  });

  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    const getResults = async () => {
      if (debouncedSearchInput) {
        const results = await searchService.searchUsers(debouncedSearchInput);
        setResults(results);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    };
    getResults();
  }, [debouncedSearchInput]);

  useEffect(() => {
    setSearchInput("");
    setShowResults(false);
    setResults([]);
  }, [location.pathname]);

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

          {showResults && (
            <OutsideClickHandler onOutsideClick={() => setShowResults(false)}>
              <div className="header-searchResults">
                {results.length > 0 ? (
                  results.map((result) => {
                    return (
                      <SearchResult
                        key={result.id}
                        username={result.username}
                        profilePic={result.profilePic}
                        name={result.name}
                      />
                    );
                  })
                ) : (
                  <div className="header-noResults">
                    <p>No results found.</p>
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          )}
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
