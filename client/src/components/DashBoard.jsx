/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import profilePic from '../assets/images/user-profile.png';
import backgroundImage from '../assets/images/user-profile-bg.jpg';
import sampleDoc from '../assets/images/document.png';

class DashBoard extends React.Component {

  constructor(props) {
    super(props);

    console.log(props);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
  }


render() {
  const { fullNames, RoleId } = this.props.user;
  return (
    <div className="main">
    <div className="main-section">
      <div className="section">
        <div id="profile-page-header" className="card">
                <div className="card-image
                   waves-effect
                   waves-block
                   waves-light">
                    <img
                      className="activator"
                      src={backgroundImage}
                      alt="user background" />
                </div>
                <figure className="card-profile-image">
                <img src={profilePic} alt="profile image" className="circle
                      z-depth-2
                      responsive-img
                      activator" />
                </figure>
                <div className="card-content">
                  <div className="row">
                    <div className="col s3 offset-s2">
                        <h4 className="
                          card-title grey-text
                          text-darken-4">{ fullNames }</h4>
                        <p className="medium-small grey-text">
                          { RoleId === 1 ? 'Administrator' : 'Regular' }
                        </p>
                    </div>
                    <div className="col s2 center-align">
                        <h4 className="card-title
                          grey-text text-darken-4">3</h4>
                        <p
                          className="medium-small
                                     grey-text">
                            Documents
                        </p>
                    </div>
                    <div className="col s2 center-align">
                        <h4
                          className="card-title
                          grey-text text-darken-4">Active</h4>
                        <p className="medium-small grey-text">Status</p>
                    </div>
                    <div className="col s1 right-align">
                      <a className="btn-floating
                        activator
                        waves-effect
                        waves-light
                        darken-2 right"
                        title="Update Profile">
                          <i className="fa fa-edit"></i>
                      </a>
                    </div>
                  </div>
                </div>
            </div>

            <div id="profile-page-wall-share" className="row">
                  <div className="col s12">
                    <ul className="tabs tab-profile z-depth-1 light-blue" >
                      <li className="tab col s3">
                        <a className="white-text waves-effect waves-light"
                           href="#MyDocuments">
                           <i className="fa fa-briefcase"></i>
                             My Documents
                          </a>
                      </li>
                      <li className="tab col s3">
                        <a className="white-text waves-effect waves-light"
                           href="#CreateDocument">
                          <i className="fa fa-plus"></i>
                            Create A Document
                         </a>
                      </li>
                      <li className="tab col s3">
                        <a className="white-text
                                      waves-effect
                                      waves-light"
                          href="#UpdateProfile">
                          <i className="fa fa-user-o"></i>
                           Update Profile
                         </a>
                      </li>
                    <div className="indicator"></div></ul>
                    <div id="MyDocuments" className="tab-content col s12  grey lighten-4">
                     <div className="col s12 m12 l4">
                      <div className="document-card">
                                   <div className="card">
                                       <div className="card-image waves-effect waves-block waves-light">
                                          <a
                                            className="btn-floating
                                            btn-large btn-permission
                                            waves-effect waves-light
                                            pink red"><i className="fa fa-eye" /></a>
                                          <img src={sampleDoc} alt="document-img" />
                                       </div>
                                       <ul className="card-action-buttons">
                                          <li><a className="btn-floating waves-effect waves-light light-blue">
                                            <i className="fa fa-info activator"></i></a>
                                           </li>
                                       </ul>
                                       <div className="card-content">
                                           <div className="row">
                                                   <p className="card-title grey-text text-darken-4">
                                                     <a href="#" className="grey-text text-darken-4">Featured Product of The Month</a>
                                                   </p>
                                           </div>
                                       </div>
                                       <div className="card-reveal">
                                           <span className="card-title grey-text text-darken-4"><i className="fa fa-close right"></i> Why i chose you </span>
                                           <p>Here is some description about the documents</p>
                                       </div>
                                   </div>
                               </div>
                        </div>
                    </div>

                    <div id="CreateDocument" className="tab-content col s12  grey lighten-4">

                    </div>

                    <div id="CreateAlbum" className="tab-content col s12  grey lighten-4" >
                    </div>
                  </div>
                </div>
      </div>
    </div>
    <div className="fixed-action-btn">
    <a className="btn-floating btn-large red">
      <i className="large material-icons">mode_edit</i>
    </a>
  </div>
  </div>
  );
}
}

DashBoard.propTypes = {
  user: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}


export default connect(mapStateToProps)(DashBoard);
