import "./NoMatch.css";
import React from "react";
import { Link } from "react-router-dom";

// When user navigates to an invalid route
const NoMatch = () => {
  return (
    <div className="noMatch">
      <h2>Sorry, this page isn't available</h2>
      <p>
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link to="/">
          <span>Return to IGL</span>
        </Link>
      </p>
    </div>
  );
};

export default NoMatch;
