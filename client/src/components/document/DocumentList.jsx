import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Document from './Document';

class DocumentList extends React.Component {

  render() {
    return (
    <div className="main">
      <div className="main-section">
        {!this.props.isSearching &&
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
        {this.props.isSearching &&
          <div>
          <h4>{this.props.searchCount} Search Result</h4>
          </div>
        }
        <div className="row">
          {this.props.documents.map((document, index) => {
            return (<Document
                key={index}
                document={document}
                user={this.props.user}
                deleteDocument={this.props.deleteDocument}
                archived={this.props.archived}
                undoDelete={this.props.undoDelete}
                />);
          })}
        </div>
      </div>
    </div>
    );
  }
}
DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  archived: PropTypes.object.isRequired,
  undoDelete: PropTypes.func.isRequired
};

export default DocumentList;
