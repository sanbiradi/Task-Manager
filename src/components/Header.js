import React from "react";
import { useLocation } from "react-router";
import { PropTypes } from "prop-types";
import Button from "./Button";
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>

      {location.pathname === "/" && (
        <Button
          onClick={onAdd}
          color={!showAdd ? "green" : "red"}
          text={!showAdd ? "Add" : "Close"}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
}; //default props

Header.prototype = {
  title: PropTypes.string.isRequired,
}; //rules for proptypes

// //css in js
// const headingStyles = {
//     color:'red', backgroundColor:'black'
// }
/* <h1 style={{color:'red', backgroundColor:'black'}}>{title}</h1>- inline styling */ /* <h1 style={headingStyles}>{title}</h1> */
export default Header;
