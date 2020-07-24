import React from 'react';
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from './Layout.css';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = props => {

  return (
    <Aux>
      <Toolbar/>
      <SideDrawer/>
      <div>Toolbar, Layout, etc</div>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

export default Layout;
