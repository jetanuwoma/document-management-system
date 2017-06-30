import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Document from './Document.jsx';

/**
 * DocumentList Component - Lists documents
 */
const DocumentList = (props) =>
  (
    <div className="main-section">
      {!props.isSearching &&
        <div id="breadcrumbs-wrapper">
          <div className="">
            <div className="row">
              <div className="col s12 m12 l12">
                <h5 className="breadcrumbs-title">Documents</h5>
                <ol className="breadcrumbs">
                  <li><Link to="/">Dashboard</Link>
                  </li>
                  <li className="active">Documents</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      }
      {props.isSearching &&
        <div>
          <h4>{props.searchCount} Search Result</h4>
        </div>
      }
      <div className="row">
        {props.documents.map((document, index) => {
          return (<Document
            key={`${index}_document`}
            document={document}
            user={props.user}
            deleteDocument={props.deleteDocument}
            archived={props.archived}
            undoDelete={props.undoDelete}
          />);
        })}
      </div>
    </div>
  );

DocumentList.propTypes = {
  documents: PropTypes.array,
  user: PropTypes.object,
  deleteDocument: PropTypes.func,
  archived: PropTypes.object,
  undoDelete: PropTypes.func,
  isSearching: PropTypes.bool,
  searchCount: PropTypes.number,
};

export default DocumentList;
