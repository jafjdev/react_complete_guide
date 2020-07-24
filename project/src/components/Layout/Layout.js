import React from 'react';
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => {

  return (
    <Aux>
      <Toolbar/>
      <div>Toolbar, Layout, etc</div>
      <main >
        {props.children}
      </main>
    </Aux>
  );
};

export default Layout;
