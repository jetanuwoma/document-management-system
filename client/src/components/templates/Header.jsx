import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SideBar from './SideBar';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated } = this.props;

    const isGuestLink = (
      <div className="nav-wrapper container">
        <Link id="logo-container" to="/" className="brand-logo">WeDoc</Link>
        <ul className="right hide-on-med-and-down">
          <li><Link to="login">Login</Link></li>
          <li><Link to="signup">Sign Up</Link></li>
        </ul>
        <ul id="nav-mobile" className="side-nav">
          <li><Link to="login">Login</Link></li>
          <li><Link to="signup">Sign Up</Link></li>
        </ul>
        <a href="#" data-activates="nav-mobile" className="button-collapse">
          <i className="material-icons">menu</i>
          </a>
      </div>
    );

    const isAuthLink = (
      <div className="nav-wrapper container">
        <Link id="logo-container" to="/" className="brand-logo">We Doc</Link>
        <ul className="right hide-on-med-and-down">
        </ul>
        <SideBar />
      </div>
    );
    return (
      <div className="navbar-fixed">
        <nav className="cyan lighten-1 navbar-fixed" role="navigation">
         { isAuthenticated ? isAuthLink : isGuestLink}
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps, null)(Header);
