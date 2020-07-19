import React from "react";
import classes from "./NavBarElement.css";
const NavbarElement = (props) => {
    return (
        <div className={classes.NavbarElement}>
            {props.name}
        </div>
    );
};

export default NavbarElement;
