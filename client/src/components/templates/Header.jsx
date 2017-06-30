import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  changeSearchSource,
  triggerSearch,
  clearSearch
} from '../../actions/pageAction';
import SideBar from './SideBar.jsx';

const history = createHistory({
  forceRefresh: false,
});
/**
 * Header Component Handles searching functionalities
 */
class Header extends React.Component {

  /**
   * set default states
   * @param {Object} props - inherited props
   */
  constructor(props) {
    super(props);

    this.context = this.context ? this.context : history;
    this.state = { searchSource: 'allDocuments', searchValue: '' };
    this.onFocus = this.onFocus.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    if (this.context.router === undefined) {
      this.context.router = history;
    }
  }
  /**
   * Set search location when search field is active
   */
  onFocus() {
    if (this.props.location.pathname === '/') {
      if (this.props.user.RoleId !== 1) {
        this.setState({ searchSource: 'userDocument' });
        this.context.router.push('/doc');
      } else {
        this.setState({ searchSource: 'allDocuments' });
        this.context.router.push('/documents');
      }
    } else if (this.props.location.pathname === '/doc') {
      this.setState({ searchSource: 'userDocument' });
    } else if (this.props.location.pathname === '/users') {
      this.setState({ searchSource: 'users' });
    }
  }

  /**
   * Handles search operation
   * @param {Object} event  - DOM element
   */
  onSearch(event) {
    if (event.keyCode === 13) {
      this.context.router.push(`${this.props.location.pathname}?q=${event.target.value}`); // eslint-disable-line
      this.props.triggerSearch(event.target.value, this.state.searchSource);
    } else {
      this.setState({ searchValue: event.target.value });
    }
    //
  }

  /**
   * Display site header
   */
  render() {
    const { isAuthenticated } = this.props;
    const { searchValue } = this.state;
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
        <a data-activates="nav-mobile" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
      </div>
    );

    const isAuthLink = (
      <div className="nav-wrapper">
        <Link id="logo-container" to="/" className="brand-logo">We Doc</Link>
        <div className="header-search-wrapper hide-on-med-and-down">
          <i className="fa fa-search" />
          <input
            type="text"
            name="Search"
            className="header-search-input z-depth-2"
            placeholder={`Search for ${this.state.searchSource}`}
            onFocus={this.onFocus}
            onKeyUp={this.onSearch}
            value={searchValue}
            onChange={this.onSearch}
          />
        </div>
        <SideBar />
      </div>
    );
    return (
      <div className="navbar-fixed">
        <nav className="cyan lighten-1 navbar-fixed" role="navigation">
          {isAuthenticated ? isAuthLink : isGuestLink}
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
  searchQuery: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired,
  clearSearch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

Header.contextTypes = {
  router: PropTypes.object,
};

/**
* mapStateToProps - copies states to component
* @param {object} state - initalState
* @return {object} any
*/
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    searchSource: state.pageControls.searchSource,
    isSearching: state.pageControls.isSearching,
    searchQuery: state.pageControls.searchQuery,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, {
  changeSearchSource,
  triggerSearch,
  clearSearch,
})(Header);
