import React from "react";
import classes from "./Logo.css";
import logo from '../../assets/logo.png'

const Logo = (props) => {
    return (
        <div>
            <img alt="logo" className={classes.Logo} src={logo}/>
        </div>);
};

export default Logo;
