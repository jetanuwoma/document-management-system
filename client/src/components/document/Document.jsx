import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import sampleDoc from '../../assets/images/document.png';

/**
 * A single Document Card
 */
const Document = (props) => {
  const { UserId, RoleId } = props.user;
  const { OwnerId, permission } = props.document;
  let action;

  if (RoleId === 1 || OwnerId === UserId) {
    action = (
      <ul className="card-action-buttons">
        <li>
          <Link
            to={`/doc/${props.document.id}`}
            className="btn-floating waves-effect waves-light light-blue"
          >
            <i className="fa fa-eye" />
          </Link>
        </li>
        <li>
          <Link
            to={`/doc/edit/${props.document.id}`}
            className="btn-floating waves-effect waves-light green"
          >
            <i className="fa fa-edit" />
          </Link>
        </li>
        <li>
          <a
            className="btn-floating waves-effect waves-light red"
            onClick={() => props.deleteDocument(props.document)}
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
            to={`/doc/${props.document.id}`}
            className="btn-floating waves-effect waves-light light-blue"
          >
            <i className="fa fa-eye" />
          </Link>
        </li>
      </ul>
    );
  }

  const isPublic = (
    <a className="btn-floating btn-large btn-permission waves-effect waves-light green">
      <i className="fa fa-unlock" />
    </a >
  );

  const isPrivate = (
    <a className="btn-floating btn-large btn-permission waves-effect waves-light pink red">
      <i className="fa fa-lock" />
    </a >
  );

  const isRole = (
    <a className="btn-floating btn-large btn-permission waves-effect waves-light pink red">
      <i className="fa fa-building" />
    </a >
  );

  return (
    <div className="col s12 m12 l4" >
      <div className="document-card">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            {permission === 'public' ? isPublic : permission === 'private' ? isPrivate : isRole}
            <img src={sampleDoc} alt="document-img" />
          </div>
          {action}
          <div className="card-content">
            <div className="row">
              <p className="card-title grey-text text-darken-4">
                <a className="grey-text text-darken-4">
                  {props.document.title}
                </a>
              </p>
            </div>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              <i className="fa fa-close right" />
              {props.document.title}
            </span>
            {props.document.content}
          </div>
        </div>
      </div>
    </div>
  );
};

Document.propTypes = {
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func,
};

export default Document;
