/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import profilePic from '../assets/images/user-profile.png';
import backgroundImage from '../assets/images/user-profile-bg.jpg';
import DocumentForm from './templates/DocumentForm';
import { updateProfile, confirmOldPassword } from '../actions/userActions';
import { saveDocument } from '../actions/documentsAction';


/**
 * Dashboard - Dashboard component
 */
class DashBoard extends React.Component {

  /**
   * set default state
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      document: {
        content: 'type your content here',
        permission: 'public',
        title: '',
      },
      user: { ...this.props.user },
    };

    this.onChange = this.onChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onProfileChange = this.onProfileChange.bind(this);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
  }

  /**
   * reloads jquery plugins
   */
  componentDidMount() {
    $('ul.tabs').tabs();
    $('.sidebar-collapse').sideNav();
    $('select').material_select();
    $('#selectRole')
      .on('change', this.onChange);
  }

  /**
   * Update props when it changes
   * @param {Object} nextProps
   **/
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateProfile !== undefined) {
      this.setState({ updateProfile: nextProps.updateProfile });
    }
  }

  /**
   * Handles changes on input fields
   * @param {Object} event - Object
   */
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const document = {...this.state.document};
    document[name] = value;
    this.setState({ document });
  }

  /**
   * Handles profile input field updates
   * @param {Object} event - Object
   */
  onProfileChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const user = {...this.state.user};
    user[name] = value;
    this.setState({ user });
    $('.update-form').validate({
      rules: {
        password: {
          required: false,
          minlength: 6,
        },
        passwordAgain: {
          required: false,
          equalTo: '#password',
        },
      },
      errorElement: 'div',
      errorPlacement: (error, element) => {
        const placement = $(element).data('error');
        if (placement) {
          $(placement).append(error);
        } else {
          error.insertAfter(element);
        }
      },
      submitHandler: () => {
        user.userId = this.props.user.userId;
       this.handleProfileSubmit(event);
      },
    });
  }

  /**
 * Clears form after creating a document
 */
  clearForm() {
    this.setState({ document: { content: '', title: '', permission: 'public' } });
  }

  /**
   * handleSubmit - creates a new document
   * @param {Object} event - Object
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.saveDocument(this.state.document);
    this.clearForm();
  }

  /**
   * Processes profile form update
   * @param {Object} event - Object
   */
  handleProfileSubmit(event) {
    event.preventDefault();
    const user = {...this.state.user};
    user.userId = this.props.user.userId;
     if (this.state.user.password !== null && this.state.user.passwordAgain !== null) {
          this.props.confirmOldPassword(this.props.user.email, this.state.user.oldPassword)
            .then(() => {
              this.props.updateProfile(user)
                .then(() => {
                  toastr.success('Profile Updated Successfully');
                });
            })
            .catch(() => {
              this.setState({ error: 'Invalid password submitted', user: { password: '', passwordAgain: '' } });
            });
        } else {
          this.props.updateProfile(user)
            .then(() => {
              toastr.success('Profile Updated Successfully');
            })
            .catch(() => toastr.error('Sorry unable to update profile'));
        }
  }

  /**
  * Handles changes on TinyMCE
  * @param {Object} event - Object
  */
  handleEditorChange(newValue) {
    const content = newValue;
    const document = this.state.document;
    document.content = content;
    this.setState({ document });
  }

  /**
   *Displays the login page
  */
  render() {
    const { fullName, roleId, email } = this.state.user;
    return (
      <div className="main">
        <div className="main-section">
          <div className="section">
            <div id="profile-page-header" className="card hide-on-small-only">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={backgroundImage} alt="backgound" />
              </div>
              <figure className="card-profile-image">
                <img src={profilePic} className="circle z-depth-2 responsive-img activator" alt="profile" />
              </figure>
              <div className="card-content">
                <div className="row">
                  <div className="col s3 offset-s2">
                    <h4 className="card-title grey-text text-darken-4">
                      {fullName}
                    </h4>
                    <p className="medium-small grey-text">
                      {roleId === 1 ? 'Administrator' : 'Regular'}
                    </p>
                  </div>
                  <div className="col s2 center-align">
                    <h4
                      className="card-title grey-text text-darken-4">Active</h4>
                    <p className="medium-small grey-text">Status</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="profile-page-wall-share" className="row">
              <div className="col s12">
                <ul className="tabs tab-profile z-depth-1 cyan" >
                  <li className="tab col s3">
                    <a
                      className="white-text waves-effect waves-light active"
                      href="#CreateDocument"
                    >
                      <i className="fa fa-plus" />
                      Create A Document
                         </a>
                  </li>
                  <li className="tab col s3">
                    <a
                      className="white-text waves-effect waves-light"
                      href="#UpdateProfile"
                    >
                      <i className="fa fa-user-o" />
                      Update Profile
                         </a>
                  </li>
                  <div className="indicator" />
                </ul>
                <div
                  id="CreateDocument"
                  className="tab-content col s12  grey lighten-4"
                >
                  <DocumentForm
                    title={this.state.document.title}
                    content={this.state.document.content}
                    onChange={this.onChange}
                    handleEditorChange={this.handleEditorChange}
                    onSubmit={this.handleSubmit}
                  />
                </div>
                <div
                  id="UpdateProfile"
                  className="tab-content col s12  grey lighten-4"
                >
                  <form
                    className="left-alert update-form"
                    onSubmit={this.onProfileChange}
                  >
                    <div className="row">
                      <div className="row margin">
                        <div className="input-field col s12">
                          <input
                            id="fullName"
                            name="fullName"
                            className="validate"
                            type="text"
                            required="required"
                            onChange={this.onProfileChange}
                            value={fullName}
                          />
                          <label className="center-align active">fullName</label>
                        </div>
                      </div>
                      <div className="row margin">
                        <div className="input-field col s12">
                          <input
                            id="email"
                            name="email"
                            className="validate"
                            type="text"
                            required="required"
                            onChange={this.onProfileChange}
                            value={email}
                          />
                          <label className="center-align active">email</label>
                        </div>
                      </div>
                      <hr />
                      <div className="row margin">
                        <div className="input-field col s12">
                          <input
                            id="oldPassword"
                            name="oldPassword"
                            className="validate"
                            type="password"
                            onChange={this.onProfileChange}
                          />
                          <label className="center-align">Old Password</label>
                        </div>
                        <label className="email-error"> {this.state.error} </label>
                      </div>
                      <div className="row margin">
                        <div className="input-field col s12">
                          <input
                            id="password"
                            name="password"
                            className="validate"
                            type="password"
                            onChange={this.onProfileChange}
                          />
                          <label className="center-align">New Password</label>
                        </div>
                      </div>
                      <div className="row margin">
                        <div className="input-field col s12">
                          <input
                            id="passwordAgain"
                            name="passwordAgain"
                            className="validate"
                            type="password"
                            onChange={this.onProfileChange}
                          />
                          <label className="center-align">Confirm Password</label>
                        </div>
                      </div>
                      <button
                        className="waves-effect waves-light btn cyan"
                        type="submit"
                      >
                        Update Profile
                        </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
    );
  }
}

DashBoard.propTypes = {
  user: PropTypes.object.isRequired,
  allDocuments: PropTypes.object.isRequired,
  saveDocument: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  confirmOldPassword: PropTypes.func,
};

/**
 * mapStateToProps - copies states to component
 * @param {object} state - initalState
 * @return {object} props object
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    allDocuments: state.manageDocument,
  };
}


export default connect(mapStateToProps, {
  saveDocument, updateProfile, confirmOldPassword,
})(DashBoard);
