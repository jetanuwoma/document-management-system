import React from 'react';
import createHistory from 'history/createBrowserHistory';
import Notifications from 'react-notification-system-redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchUsers } from '../../actions/adminActions';
import { searchDocuments } from '../../actions/documentsAction';
import {
  changeSearchSource,
  triggerSearch,
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
    this.state = {
      searchSource: 'allDocuments',
      searchValue: '',
      searchDocuments: this.props.searchDocuments,
      searchUsers: this.props.searchUsers,
    };
    this.onSearch = this.onSearch.bind(this);
  }

  /**
   * Set default router
   */
  componentDidMount() {
    if (this.context.router === undefined) {
      this.context.router = history;
    }
  }

  /**
   *
   * @param {Object} nextProps changed state
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ searchSource: nextProps.searchSource });
  }

  /**
   * Handles search operation
   * @param {Object} event  - event object
   */
  onSearch(event) {
    this.setState({ searchValue: event.target.value });
    if (event.keyCode === 13) {
      this.context.router.push(`${this.props.location.pathname}?q=${event.target.value}`); // eslint-disable-line
      if (this.state.searchSource === 'publicDocuments') {
        this.state.searchDocuments(event.target.value, 'public');
      } else if (this.state.searchSource === 'users') {
        this.state.searchUsers(event.target.value);
      } else {
        this.state.searchDocuments(event.target.value);
      }
    }
  }

  /**
   * Display site header
   */
  render() {
    const { isAuthenticated, notifications } = this.props;
    const { searchValue } = this.state;

    const style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px',
        },
      },
    };

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
            value={searchValue}
            onKeyUp={this.onSearch}
            onChange={this.onSearch}
          />
        </div>
        <SideBar />
      </div>
    );
    return (
      <div className="navbar-fixed">
        <Notifications
          notifications={notifications}
          style={style}
        />
        <nav className="cyan lighten-1 navbar-fixed" role="navigation">
          {isAuthenticated ? isAuthLink : isGuestLink}
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  searchUsers: PropTypes.func,
  searchSource: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  changeSearchSource: PropTypes.func.isRequired,
  triggerSearch: PropTypes.func.isRequired,
  user: PropTypes.object,
  searchDocuments: PropTypes.func,
  notifications: PropTypes.array,
};

Header.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object,
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
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps, {
  changeSearchSource,
  triggerSearch,
  searchDocuments,
  searchUsers,
})(Header);
