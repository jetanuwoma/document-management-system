/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import TinyMCE from 'react-tinymce';
import profilePic from '../assets/images/user-profile.png';
import backgroundImage from '../assets/images/user-profile-bg.jpg';
import { saveDocument } from '../actions/documentsAction';

class DashBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      document: {},
      initialContent: '<p>some initial content here</p>'
    };

    this.onChange = this.onChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    console.log(this.props);
  }

  componentDidMount() {
    $('ul.tabs').tabs();
    $('.sidebar-collapse').sideNav();
    $('select').material_select();
    // https://github.com/Dogfalo/materialize/issues/1160
    $('#selectRole')
      .on('change', this.onChange);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveDocument(this.state.document)
      .then(() => {
        toastr.success('document Created');
        this.clearForm();
        console.log(this.props);
      });
  }

  clearForm() {
    this.setState({ document: {} });
    $('#title').val('');
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const document = this.state.document;
    document[name] = value;
    this.setState({ document });
  }

  handleEditorChange(event) {
    const content = event.target.getContent();
    const document = this.state.document;
    document['content'] = content;
    this.setState({ document });
  }


  render() {
    const { fullNames, RoleId } = this.props.user;
    const { initialContent } = this.state;
    return (
      <div className="main">
        <div className="main-section">
          <div className="section">
            <div id="profile-page-header" className="card hide-on-small-only">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={backgroundImage}/>
             </div>
             <figure className="card-profile-image">
               <img src={profilePic} className="circle z-depth-2 responsive-img
                       activator" />
              </figure>
              <div className="card-content">
                <div className="row">
                  <div className="col s3 offset-s2">
                    <h4 className="card-title grey-text text-darken-4">
                            { fullNames }
                    </h4>
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
                        cyan right"
                        title="Update Profile">
                          <i className="fa fa-edit"></i>
                      </a>
                    </div>
                  </div>
                </div>
            </div>

            <div id="profile-page-wall-share" className="row">
                  <div className="col s12">
                    <ul className="tabs tab-profile z-depth-1 cyan" >
                      <li className="tab col s3">
                        <a className="white-text waves-effect waves-light active"
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
                    <div id="CreateDocument" className="tab-content col s12  grey lighten-4">
                        <form className="left-alert" onSubmit={this.handleSubmit} >
                      <div className="row">
                        <div className="row margin">
                          <div className="input-field col s12">
                            <input id="title" name="title" className="validate"
                               type="text" required="required" onChange={this.onChange} />
                            <label className="center-align">Document Title</label>
                          </div>
                        </div>

                        <div className="row margin">
                          <div className="input-field col s12">
                            <select name="permission"
                              required="required"
                              id="selectRole"
                              onChange={this.onChange}>
                              <option value="public">Public Access</option>
                              <option value="private">Private Access</option>
                              <option value="role">My Department</option>
                            </select>
                            <label htmlFor="permission" className="center-align">Permission</label>
                          </div>
                        </div>

                      <TinyMCE
                         content={initialContent}
                         config={{
                           plugins: 'link image code',
                           toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                         }}
                         onChange={this.handleEditorChange}
                      />
                    <button className="waves-effect waves-light btn cyan" type="submit">Create Document</button>
                    </div>
                    </form>
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
  user: PropTypes.object.isRequired,
  alldocuments: PropTypes.object.isRequired,
  saveDocument: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    alldocuments: state.manageDocument
  };
}


export default connect(mapStateToProps, { saveDocument })(DashBoard);
