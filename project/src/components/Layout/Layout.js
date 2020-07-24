import React, {Component} from 'react';
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from './Layout.css';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  };
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  };

  render() {
    return (<Aux>
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
      <div>Toolbar, Layout, etc</div>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Aux>)
  }
};

export default Layout;
