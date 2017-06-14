import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeSearchSource, triggerSearch } from '../../actions/pageAction';
import SideBar from './SideBar';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSearch = this.onSearch.bind(this);
    console.log(this.props);
  }

  onFocus() {
    if (this.props.location.pathname === '/') {
      this.context.router.push('/doc');
      this.props.changeSearchSource('document');
    } else if (this.props.location.pathname === '/doc') {
      this.props.changeSearchSource('document');
    } else if (this.props.location.pathname === '/users') {
      this.props.changeSearchSource('users');
    }
  }

  onSearch(event) {
    console.log(event.target.value);
    this.props.triggerSearch(event.target.value);
    console.log(this.props);
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
      <div className="nav-wrapper">
        <Link id="logo-container" to="/" className="brand-logo">We Doc</Link>
          <div className="header-search-wrapper hide-on-med-and-down">
              <i className="fa fa-search"></i>
              <input type="text" name="Search"
                className="header-search-input z-depth-2"
                placeholder={`Search for ${this.props.searchSource}`}
                onFocus={this.onFocus}
                onKeyUp={this.onSearch}
                />
          </div>
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
  isAuthenticated: PropTypes.bool.isRequired,
  searchSource: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  changeSearchSource: PropTypes.func.isRequired,
  triggerSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

Header.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    searchSource: state.pageControls.searchSource,
    isSearching: state.pageControls.isSearching,
    searchQuery: state.pageControls.searchQuery,
  };
}

export default connect(mapStateToProps, { changeSearchSource, triggerSearch })(Header);
