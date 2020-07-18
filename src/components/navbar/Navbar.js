import React from "react";
import classes from './navbar.css';
import Logo from "./Logo/Logo";
import NavbarElement from "./Element/NavbarElement";

const Navbar = () => {
    const state = {
        elements: [
            {
                key: 1,
                name: 'Inicio'
            },
            {
                key: 2,
                name: 'About Us'
            }
        ]
    };

    return (

        <div className={classes.Navbar}>
            <div className={classes.leftSide}>
                <Logo/>
            </div>

            <div className={classes.rightSide}>
                {
                    state.elements.map(
                        element =>
                            <NavbarElement key={element.key} name={element.name}/>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
