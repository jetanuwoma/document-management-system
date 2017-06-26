import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { Link } from 'react-router';
import sampleDoc from '../../assets/images/document.png';

/**
 * A single Document Card
 */
class Document extends React.Component {

  /**
   * set default state
   * @param {Object} props - passed props
   */
  constructor(props) {
    super(props);

    this.state = { displayState: 'inline' };

    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * Deletes a document and hides it from DOM
   */
  deleteDocument() {
    this.setState({ displayState: 'none' });
    this.props.deleteDocument(this.props.document)
      .then(() => {
        toastr.success('<span>Item Deleted! Undo'); //eslint-disable-line
        toastr.options.onclick = () => {
          this.props.undoDelete();
          this.setState({ displayState: 'inline' });
        };
      });
  }

  /**
   * Display a single document
   */

  render() {
    const { UserId, RoleId } = this.props.user;
    const { OwnerId, permission } = this.props.document;
    const { displayState } = this.state;

    let action;

    if (RoleId === 1 || OwnerId === UserId) {
      action = (
        <ul className="card-action-buttons">
          <li>
            <Link
              to={`/doc/${this.props.document.id}`}
              className="btn-floating waves-effect waves-light light-blue">
              <i className="fa fa-eye" />
            </Link>
          </li>
          <li>
            <Link to={`/doc/edit/${this.props.document.id}`}
              className="btn-floating waves-effect waves-light green">
              <i className="fa fa-edit" />
            </Link>
          </li>
          <li>
            <a
              className="btn-floating waves-effect waves-light red"
              onClick={this.deleteDocument}
            >
              <i className="fa fa-trash" />
            </a>

          </li>
        </ul>
      );
    } else if (permission === 'public') {
      action = (
        <ul className="card-action-buttons">
          <li>
            <Link
              to={`/doc/${this.props.document.id}`}
              className="btn-floating waves-effect waves-light light-blue">
              <i className="fa fa-info" />
            </Link>
          </li>
        </ul>
      );
    }

    const isPublic = (
      <a className="btn-floating btn-large btn-permission waves-effect waves-light green">
        < i className="fa fa-unlock" />
      </a >
    );

    const isPrivate = (
      <a className="btn-floating btn-large btn-permission waves-effect waves-light pink red">
        < i className="fa fa-lock" />
      </a >
    );
    const style = {
      display: displayState
    };

    return (
      <div className="col s12 m12 l4" style={style} >
        <div className="document-card">
          <div className="card hoverable">
            <div className="card-image waves-effect waves-block waves-light">
              {permission === 'public' ? isPublic : isPrivate}
              <img src={sampleDoc} alt="document-img" />
            </div>
            {action}
            <div className="card-content">
              <div className="row">
                <p className="card-title grey-text text-darken-4">
                  <a href="#" className="grey-text text-darken-4">
                    {this.props.document.title}
                  </a>
                </p>
              </div>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                <i className="fa fa-close right" />
                {this.props.document.title}
              </span>
              {this.props.document.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

Document.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func,
  archived: PropTypes.object,
  undoDelete: PropTypes.func,
};

export default Document;
