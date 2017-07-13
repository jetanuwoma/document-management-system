/* global $ */
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import DocumentForm from '../templates/DocumentForm';
import { loadDocument, updateDocument } from '../../actions/documentsAction';

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
   * @param {Object} event - Object
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
   * @param {Object} event - Object
   */
  handleEditorChange(newValue) {
    const document = this.state.document;
    document.content = newValue;
    this.setState({ document });
  }

  /**
   * Send updated document to the action
   * @param {Object} event - Object
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
   * @return Object
   */
  render() {
    const { title } = this.state.document;

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
            <DocumentForm
              onChange={this.onChange}
              handleEditorChange={this.handleEditorChange}
              title={this.state.document.title}
              content={this.state.document.content}
              onSubmit={this.handleSubmit}
            />
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
  updateDocument,
})(EditDocument);
