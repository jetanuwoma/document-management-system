import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import toastr from 'toastr';
import Pagination from 'rc-pagination';
import { triggerSearch, clearSearch } from '../../actions/pageAction';
import { getAllDocuments } from '../../actions/adminActions';
import { deleteDocument, undoDelete, searchDocuments } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader';
import DocumentList from '../document/DocumentList';

/**
 * Admin Documents Management Component
 */
export class ManageDocuments extends React.Component {

  /**
   * set default state
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      totalPages: 1,
      activePagination: 1,
      totalDocuments: 0,
      documents: this.props.documents,
      isSearching: false,
      searchQuery: '',
      searchCount: 0,
    };
    this.nextPage = this.nextPage.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * List all users documents check if search is triggered
   */
  componentDidMount() {
    this.props.triggerSearch('allDocuments');
    if (this.props.location.query.q !== undefined) {
      this.props.searchDocuments(this.props.location.query.q)
        .then(() => {
          this.setState({ loading: false, isSearching: true });
        });
    } else {
      this.props.clearSearch();
      this.props.getAllDocuments()
        .then(() => {
          this.setState({ isFetching: false });
        })
        .catch(() => {
          toastr.error('Error fetching documents');
        });
    }
  }

  /**
   * set State to new Props
   * @param {Object} nextProps - new props
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      totalDocuments: nextProps.totalDocuments,
      documents: nextProps.documents,
      isSearching: nextProps.isSearching,
      searchQuery: nextProps.searchQuery,
      searchCount: nextProps.isSearching ? nextProps.documents.length : 0,
    });
  }

  /**
   * delete documents user document
   * @param {Object} document the document to be deleted
   */
  deleteDocument(document) {
    const notificationOpts = {
      title: `${document.title}`,
      message: 'has been deleted!',
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: 'Undo!',
        callback: () => this.props.undoDelete(document)
          .then(() => toastr.success('Delete undo'))
          .catch(() => toastr.error('Could not undo delete')),
      },
    };
    this.props.deleteDocument(document)
      .then(() => {
        this.context.store.dispatch(Notifications.success(notificationOpts));
      })
      .catch(() => toastr.error('unable to delete document'));
  }

  /**
   * Handles pagination
   * @param {Number} page - current page number
   */
  nextPage(page) {
    if (!this.state.isSearching) {
      this.props.getAllDocuments(page - 1)
        .then(() => {
          this.setState({ activePagination: page });
        })
        .catch(() => toastr.error('Error occurred!'));
    } else {
      this.props.searchDocuments(this.state.searchQuery, '', page - 1)
        .then(() => {
          this.setState({ activePagination: page });
        })
        .catch(() => toastr.error('Could not load document'));
    }
  }

  /**
   * Display all documents
   */
  render() {
    return (
      <div className="main">
        {this.state.isFetching &&
          <PreLoader />
        }
        {!this.state.isFetching &&
          <div>
            <DocumentList
              documents={this.state.documents}
              user={this.props.user}
              deleteDocument={this.deleteDocument}
              isSearching={this.state.isSearching}
              searchQuery={this.state.searchQuery}
              searchCount={this.state.totalDocuments}
            />
            
              <Pagination
                onChange={this.nextPage}
                current={this.state.activePagination}
                total={this.state.totalDocuments}
                pageSize={6}
              />
          </div>
        }
      </div>
    );
  }
}

ManageDocuments.propTypes = {
  documents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  getAllDocuments: PropTypes.func.isRequired,
  archived: PropTypes.object.isRequired,
  undoDelete: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchCount: PropTypes.number.isRequired,
  totalDocuments: PropTypes.number.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  triggerSearch: PropTypes.func,
  location: PropTypes.object,
  clearSearch: PropTypes.func,
};

ManageDocuments.contextTypes = {
  store: PropTypes.object,
};
/**
 * mapStateToProps - copies states to component
 * @param {Object} state - initalState
 * @return {Object} props object
 */
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    documents: state.adminManagement.allUsersDocuments,
    archived: state.manageDocument.archived,
    isSearching: state.pageControls.isSearching,
    searchQuery: state.pageControls.searchQuery,
    searchCount: state.pageControls.searchCount,
    totalDocuments: state.pageControls.totalDocument,
  };
}

export default connect(mapStateToProps, {
  getAllDocuments,
  deleteDocument,
  undoDelete,
  clearSearch,
  searchDocuments,
  triggerSearch,
})(ManageDocuments);
