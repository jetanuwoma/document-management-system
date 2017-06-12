import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/userActions';
import profile from '../../assets/images/user-profile.png';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }


  logOut(event) {
    event.preventDefault();
    this.props.logout();
    this.context.router.push('/');
  }


  render() {
    const { fullNames, RoleId } = this.props.user;

    return (
      <aside id="left-sidebar-nav">
                <ul id="slide-out" className="side-nav
                  fixed
                  leftside-navigation
                  ps-container ps-active-y
                  " >
                <li className="user-details cyan">
                <div className="row">
                  <div className="col col s4 m4 l4">
                        <img src={profile} alt=""
                          className="circle
                           responsive-img
                           valign
                           profile-image"
                           />
                    </div>
                    <div className="col col s8 m8 l8">
                        <a className="btn-flat dropdown-button
                          waves-effect waves-light white-text
                          profile-btn" href="#">
                          { fullNames }
                          </a>

                        <p className="user-roal">
                          { RoleId === 1 ? 'Administrator' : 'Regular' }
                        </p>
                    </div>
                </div>
                </li>
                <li className="bold active">
                  <Link to="/" className="waves-effect waves-cyan">
                  <i className="fa fa-dashboard"></i> Dashboard</Link>
                </li>
                <li className="">
                  <Link to="/doc" className="waves-effect waves-cyan">
                    <i className="fa fa-file"></i> My Documents</Link>
                </li>

                <li className="">
                  <Link to="/doc/public" className="waves-effect waves-cyan">
                    <i className="fa fa-file-o"></i> Public Documents</Link>
                </li>

                {RoleId === 1 &&
                  <li className="">
                    <Link to="/doc/public" className="waves-effect waves-cyan">
                      <i className="fa fa-users"></i> ManageUser</Link>
                  </li>
                }

                <li className="">
                  <a href=""
                    className="waves-effect waves-cyan"
                    onClick={this.logOut}
                    >
                    <i className="fa fa-power-off"></i> Logout</a>
                </li>
          </ul>
          <a href="#"
            data-activates="slide-out"
            className="sidebar-collapse
                       btn-floating
                       btn-medium waves-effect
                       waves-light
                       hide-on-large-only cyan">
          <i className="large material-icons">menu</i>
            </a>
        </aside>
    );
  }

}

SideBar.contextTypes = {
  router: PropTypes.object.isRequired
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

 function mapStateToProps(state) {
   return {
     user: state.user.user
   };
 }


export default connect(mapStateToProps, { logout })(SideBar);
