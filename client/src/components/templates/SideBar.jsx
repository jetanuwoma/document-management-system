import React from 'react';
import { Link } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/userActions';
import profile from '../../assets/images/user-profile.png';

const history = createHistory({
  forceRefresh: false,
});
/**
 * SideBar - Controls page navigations
 */
class SideBar extends React.Component {

  /**
   *
   * @param {Object} props - inherit props
   */
  constructor(props) {
    super(props);

    this.context = this.context ? this.context : history;
    this.logOut = this.logOut.bind(this);
  }


  /**
   * performs user logout function
   * @param {Object} event - event object
   */
  logOut(event) {
    event.preventDefault();
    this.props.logout();
    if (this.context.router === undefined) {
      this.context.router = history;
    }
    this.context.router.push('/');
  }

  /**
   * Displays the logout view
   * @return {Object}
   */
  render() {
    const { fullNames, RoleId } = this.props.user;

    return (
      <aside id="left-sidebar-nav">
        <ul
          id="slide-out"
          className="side-nav fixed leftside-navigation ps-container ps-active-y "
        >
          <li className="user-details cyan">
            <div className="row">
              <div className="col col s4 m4 l4">
                <img
                  src={profile}
                  alt=""
                  className="circle responsive-img valign profile-image"
                />
              </div>
              <div className="col col s8 m8 l8">
                <a className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn">
                  {fullNames}
                </a>

                <p className="user-roal">
                  {RoleId === 1 ? 'Administrator' : 'Regular'}
                </p>
              </div>
            </div>
          </li>
          <li className="bold">
            <Link to="/" className="waves-effect waves-cyan">
              <i className="fa fa-dashboard" /> Dashboard</Link>
          </li>

          <li className="">
            <Link to="/doc" className="waves-effect waves-cyan my-doc">
              <i className="fa fa-file-o" /> My Documents</Link>
          </li>
          <li className="">
            <Link to="/doc/public" className="waves-effect waves-cyan public-doc">
              <i className="fa fa-file-o" /> Public Documents</Link>
          </li>

          {RoleId === 1 &&
            <li className="">
              <Link to="/users" className="waves-effect waves-cyan">
                <i className="fa fa-users" /> Manage Users</Link>
            </li>
          }
          {
            RoleId === 1 &&
            <li className="">
              <Link to="/documents" className="waves-effect waves-cyan">
                <i className="fa fa-file-o" /> Manage Documents</Link>
            </li>
          }

          <li className="">
            <a
              className="waves-effect waves-cyan"
              onClick={this.logOut}
            >
              <i className="fa fa-power-off" /> Logout</a>
          </li>
        </ul >
        <a
          data-activates="slide-out"
          className="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only cyan"
        >
          <i className="large material-icons"> menu</i >
        </a >
      </aside >
    );
  }

}

SideBar.contextTypes = {
  router: PropTypes.object,
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

/**
* mapStateToProps - copies states to component
* @param {object} state - initalState
* @return {object} any
*/
function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}


export default connect(mapStateToProps, { logout })(SideBar);
