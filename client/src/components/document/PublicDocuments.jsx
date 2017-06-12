import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadPublicDocuments, deleteDocument, undoDelete } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader';

class PublicDocuments extends React.Component {
  constructor(props) {
    super(props);

    // set Dynamic import for code splitting and optimisation
    this.state = {
      ActivePage: <PreLoader />,
      pathName: this.props.location.pathname
    };
    this.loadDocumentList = this.loadDocumentList.bind(this);

    console.log(this.props);
  }

  componentDidMount() {
    this.loadDocumentList();
  }

  loadDocumentList() {
    this.props.loadPublicDocuments()
      .then(() => {
        import('./DocumentList')
          .then((DocumentList) => {
            this.setState({
              ActivePage: <DocumentList.default
              documents={this.props.documents}
              user={this.props.user}
              deleteDocument={this.props.deleteDocument}
              archived={this.props.archived}
              undoDelete={this.props.undoDelete}
               />
            });
          });
      });
  }


  render() {
    return (
      <div> {this.state.ActivePage} </div>
    );
  }
}

PublicDocuments.propTypes = {
  documents: PropTypes.array.isRequired,
  loadPublicDocuments: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  archived: PropTypes.object.isRequired,
  undoDelete: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const currentState = state.manageDocument;
  const documents = currentState.alldocuments;
  return {
    documents,
    user: state.user.user,
    archived: currentState.archived
  };
}

export default connect(mapStateToProps, { loadPublicDocuments, deleteDocument, undoDelete })(PublicDocuments);
