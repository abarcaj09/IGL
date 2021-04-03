import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Avatar } from "@material-ui/core";
import OutsideClickHandler from "react-outside-click-handler";

import { useDispatch, useSelector } from "react-redux";
import searchService from "../../services/search";
import SearchResult from "./SearchResult";
import useDebounce from "./useDebounce";
import { logout } from "../../reducers/authReducer";
import { clearSuccess, clearError } from "../../reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const user = useSelector(({ user }) => {
    return user;
  });
  const auth = useSelector(({ auth }) => {
    return auth;
  });

  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // for drop down menu

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
    dispatch(clearSuccess());
    dispatch(clearError());
  }, [location.pathname, dispatch]);

  const open = () => {
    if (auth && auth.user) {
      setIsOpen(true);
    }
  };

  // redirect to login page. Necessary when url = /p/:id else the
  // page will stay the same
  const logoutAndRedirect = () => {
    dispatch(logout());
    history.push("/accounts/login");
  };

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
              onClick={open}
            />

            {isOpen && (
              <OutsideClickHandler
                onOutsideClick={() => setIsOpen(false)}
                display="contents"
              >
                <div
                  className="header-dropDownMenu"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Link to={`/${user.username}`}>
                    <div className="header-dropDownItem">
                      <AccountCircleOutlinedIcon />
                      <h4>Profile</h4>
                    </div>
                  </Link>

                  <Link to={`/${user.username}/saved`}>
                    <div className="header-dropDownItem">
                      <BookmarkBorderOutlinedIcon />
                      <h4>Saved</h4>
                    </div>
                  </Link>

                  <Link to="/accounts/edit">
                    <div className="header-dropDownItem">
                      <EditOutlinedIcon />
                      <h4>Edit</h4>
                    </div>
                  </Link>

                  <hr />

                  <h4 onClick={logoutAndRedirect}>Log Out</h4>
                </div>
              </OutsideClickHandler>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
