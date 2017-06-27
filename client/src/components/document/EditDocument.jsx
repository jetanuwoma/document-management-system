/* global $ */
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TinyMCEInput from 'react-tinymce-input';
import toastr from 'toastr';
import { loadDocument, updateDocument } from '../../actions/documentsAction';

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
 * Edit Component - Hanled Documents modifications
 */
export class EditDocument extends React.Component {

  /**
   * set default state
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = { document: { title: this.props.document.title, content: '', permission: '' } };

    this.onChange = this.onChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Loads the document to edit
   */
  componentDidMount() {
    $('#selectRole')
      .on('change', this.onChange);
    this.props.loadDocument(this.props.params.id)
      .then(() => {
        const { id, title, content, permission } = this.props.document;
        this.setState({ document: { id, title, content, permission } });
      });
  }

  /**
   * Handles input field changes
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
   * handles TinyMCE content changes
   * @param {Object} event - DOM element
   */
  handleEditorChange(newValue) {
    const document = this.state.document;
    document.content = newValue;
    this.setState({ document });
  }

  /**
   * Send updated document to the action
   * @param {Object} event - DOM element
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateDocument(this.state.document)
      .then(() => {
        toastr.success('Document Updated');
      });
  }

  /**
   * Displays the document form
   * @return {any}
   */
  render() {
    const { content, title, permission } = this.state.document;

    return (
      <div className="main">
        <div className="main-section">
          <div id="breadcrumbs-wrapper">
            <div className="">
              <div className="row">
                <div className="col s12 m12 l12">
                  <h5 className="breadcrumbs-title">My Documents</h5>
                  <ol className="breadcrumbs">
                    <li><Link to="/">Dashboard</Link>
                    </li>
                    <li className="active">{title}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <form className="left-alert" onSubmit={this.handleSubmit} >
              <div className="row">
                <div className="row margin">
                  <div className="input-field col s12">
                    <input id="title" name="title"
                      type="text" value={title} onChange={this.onChange} />
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

                <TinyMCEInput
                  value={content}
                  tinymceConfig={TINYMCE_CONFIG}
                  onChange={this.handleEditorChange}
                />
                <button className="waves-effect waves-light btn cyan" type="submit">Edit Document</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditDocument.propTypes = {
  document: PropTypes.object.isRequired,
  loadDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
};

EditDocument.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
* mapStateToProps - copies states to component
* @param {object} state - initalState
* @return {object} any
*/
function mapStateToProps(state) {
  return {
    document: state.manageDocument.selectedDocument,
  };
}

export default connect(mapStateToProps, {
  loadDocument,
  updateDocument
})(EditDocument);
