/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import TinyMCEInput from 'react-tinymce-input';
import profilePic from '../assets/images/user-profile.png';
import backgroundImage from '../assets/images/user-profile-bg.jpg';
import { updateProfile } from '../actions/userActions';
import { saveDocument } from '../actions/documentsAction';


const TINYMCE_CONFIG = {
  language: 'en',
  theme: 'modern',
  toolbar: 'bold italic underline strikethrough hr | bullist numlist | link unlink | undo redo | spellchecker code',
  menubar: false,
  statusbar: true,
  resize: true,
  plugins: 'link,spellchecker,paste',
  theme_modern_toolbar_location: 'top',
  theme_modern_toolbar_align: 'left'
};
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
      updateProfile: this.props.updateProfile,
      saveDocument: this.props.saveDocument,
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
    // https://github.com/Dogfalo/materialize/issues/1160
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
   * @param {Object} event - DOM element
   */
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const document = this.state.document;
    document[name] = value;
    this.setState({ document });
  }

  /**
   * Handles profile input field updates
   * @param {Object} event - DOM element
   */
  onProfileChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const user = this.state.user;
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
        user.UserId = this.props.user.UserId;
        this.state.updateProfile(user)
          .then(() => {
            toastr.success('Profile Updated Successfully');
          });
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
   * @param {Object} event - DOM element
   */
  handleSubmit(event) {
    event.preventDefault();
    this.state.saveDocument(this.state.document)
      .then(() => {
        toastr.success('document Created');
        this.clearForm();
      });
  }

  /**
   * Processes profile form update
   * @param {Object} event - DOM element
   */
  handleProfileSubmit(event) {
    event.preventDefault();
    const user = this.state.user;
    user.UserId = this.props.user.UserId;
    this.state.updateProfile(user)
      .then(() => {
        toastr.success('Profile Updated Successfully');
      });
  }

  /**
  * Handles changes on TinyMCE
  * @param {Object} event - DOM element
  */
  handleEditorChange(newValue) {
    const content = newValue;
    const document = this.state.document;
    document.content = content;
    this.setState({ document });
  }

  /**
   *Displays the login page
   * @return {any}
  */
  render() {
    const { fullNames, RoleId, email } = this.state.user;
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
                      {fullNames}
                    </h4>
                    <p className="medium-small grey-text">
                      {RoleId === 1 ? 'Administrator' : 'Regular'}
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
                  <form className="left-alert"onSubmit={this.handleSubmit} >
                    <div className="row">
                      <div className="row margin">
                        <div className="input-field col s12">
                          <input
                            id="title"
                            name="title"
                            className="validate"
                            type="text"
                            value={this.state.document.title}
                            required="required"
                            onChange={this.onChange}
                          />
                          <label className="center-align">Document Title</label>
                        </div>
                      </div>

                      <div className="row margin">
                        <div className="input-field col s12">
                          <select
                            name="permission"
                            required="required"
                            id="selectRole"
                            onChange={this.onChange}
                          >
                            <option value="public">Public Access</option>
                            <option value="private">Private Access</option>
                            <option value="role">My Department</option>
                          </select>
                          <label
                            htmlFor="permission"
                            className="center-align"
                          >
                            Permission
                          </label>
                        </div>
                      </div>

                      <TinyMCEInput
                        value={this.state.document.content}
                        tinymceConfig={TINYMCE_CONFIG}
                        onChange={this.handleEditorChange}
                      />
                      <button
                        className="waves-effect waves-light btn cyan"
                        type="submit"
                      >
                        Create Document
                      </button>
                    </div>
                  </form>
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
                            id="fullNames"
                            name="fullNames"
                            className="validate"
                            type="text"
                            required="required"
                            onChange={this.onProfileChange}
                            value={fullNames}
                          />
                          <label className="center-align active">fullNames</label>
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
                            id="password"
                            name="password"
                            className="validate"
                            type="password"
                            onChange={this.onProfileChange}
                          />
                          <label className="center-align">Update Password</label>
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
  alldocuments: PropTypes.object.isRequired,
  saveDocument: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

/**
 * mapStateToProps - copies states to component
 * @param {object} state - initalState
 * @return {object} any
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    alldocuments: state.manageDocument,
  };
}


export default connect(mapStateToProps, { saveDocument, updateProfile })(DashBoard);
