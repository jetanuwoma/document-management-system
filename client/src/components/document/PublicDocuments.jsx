import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import Pagination from 'rc-pagination';
import toastr from 'toastr';
import { triggerSearch, clearSearch } from '../../actions/pageAction';
import {
  loadPublicDocuments,
  deleteDocument,
  undoDelete,
  searchDocuments,
} from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader.jsx';
import DocumentList from './DocumentList.jsx';

/**
 * PublicDocument Component - Lists all public documents
 */
export class PublicDocuments extends React.Component {

  /**
   * set default states
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      totalPages: 1,
      activePagination: 1,
      totalDocument: 0,
      documents: [],
      searchCount: 0,
      isSearching: false,
      searchQuery: '',
      location: props.location,
    };

    this.nextPage = this.nextPage.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * Loads all public document
   */
  componentDidMount() {
    this.props.triggerSearch('publicDocuments');
    if (this.state.location.query.q !== undefined) {
      this.props.searchDocuments(this.props.location.query.q, 'public')
        .then(() => {
          this.setState({ loading: false });
        });
    } else {
      this.props.clearSearch();
      this.props.loadPublicDocuments()
        .then(() => {
          this.setState({ loading: false });
        }).catch(() => toastr.error('Error fetching document'));
    }
  }

  /**
   * update state with new props
   * @param {Object} nextProps - new props
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      totalDocument: nextProps.totalDocument,
      documents: nextProps.myDocuments,
      isSearching: nextProps.isSearching,
      searchQuery: nextProps.searchQuery,
      searchCount: nextProps.isSearching ? nextProps.myDocuments.length : 0,
    });
  }

  /**
   * delete documents user document
   * @param {Object} document the document to be deleted
   */
  deleteDocument(document) {
    const notificationOpts = {
      // uid: 'once-please', // you can specify your own uid if required
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
      }).catch(() => toastr.error('Could not delete document'));
  }

  /**
   * Perform pagination, changes active page
   * @param {Number} page - current page number
   */
  nextPage(page) {
    if (!this.state.isSearching) {
      this.props.loadPublicDocuments(page - 1)
        .then(() => {
          this.setState({ activePagination: page });
        })
        .catch(() => toastr.error('Could not load document'));
    } else {
      this.props.searchDocuments(this.state.searchQuery, 'public', page - 1)
        .then(() => {
          this.setState({ activePagination: page });
        })
        .catch(() => toastr.error('Could not load document'));
    }
  }

  /**
   * Renders views
   * @return {Object}
   */
  render() {
    return (
      <div className="main">
        {this.state.loading &&
          <PreLoader />
        }
        {!this.state.loading &&
          <div>
            <DocumentList
              documents={this.props.myDocuments}
              user={this.props.user}
              deleteDocument={this.deleteDocument}
              archived={this.props.archived}
              undoDelete={this.props.undoDelete}
              isSearching={this.state.isSearching}
              searchQuery={this.state.searchQuery}
              searchCount={this.state.totalDocument}
            />
            <Pagination
              onChange={this.nextPage}
              current={this.state.activePagination}
              total={this.state.totalDocument}
              pageSize={6}
            />
          </div>
        }
      </div>
    );
  }
}

PublicDocuments.propTypes = {
  myDocuments: PropTypes.array,
  loadPublicDocuments: PropTypes.func,
  user: PropTypes.object,
  deleteDocument: PropTypes.func,
  archived: PropTypes.object,
  undoDelete: PropTypes.func,
  documentLoaded: PropTypes.bool,
  isSearching: PropTypes.bool,
  searchQuery: PropTypes.string,
  searchCount: PropTypes.number,
  totalDocument: PropTypes.number,
  triggerSearch: PropTypes.func,
  location: PropTypes.object,
  clearSearch: PropTypes.func,
  searchDocuments: PropTypes.func,
};

PublicDocuments.contextTypes = {
  store: PropTypes.object,

};
/**
 * mapStateToProps - copies states to component
 * @param {object} state - initalState
 * @return {object} props object
 */
function mapStateToProps(state) {
  return {
    myDocuments: state.manageDocument.alldocuments,
    documentLoaded: state.manageDocument.loaded,
    user: state.auth.user,
    archived: state.manageDocument.archived,
    isSearching: state.pageControls.isSearching,
    searchQuery: state.pageControls.searchQuery,
    searchCount: state.pageControls.searchCount,
    totalDocument: state.pageControls.totalDocument,
  };
}


export default connect(mapStateToProps, {
  loadPublicDocuments,
  deleteDocument,
  undoDelete,
  triggerSearch,
  clearSearch,
  searchDocuments,
})(PublicDocuments);
