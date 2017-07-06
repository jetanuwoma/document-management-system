/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import Notifications from 'react-notification-system-redux';
import { triggerSearch, clearSearch } from '../../actions/pageAction';
import {
  loadUserDocuments,
  deleteDocument,
  undoDelete,
} from '../../actions/documentsAction';
import { searchDocuments } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader.jsx';
import DocumentList from './DocumentList.jsx';

/**
 * DocumentPage Component - List, and handles pagination of document
 */
export class DocumentPage extends React.Component {

  /**
   * set default state values
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      totalPages: 1,
      activePagination: 1,
      totalDocument: 0,
      documents: this.props.myDocuments,
      isSearching: this.props.isSearching,
      searchQuery: '',
      searchCount: 0,
      location: this.props.location,
    };

    this.nextPage = this.nextPage.bind(this);
    this.loadListDocument = this.loadListDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * check if search query has been passed to the route
   */
  componentDidMount() {
    $('.sidebar-collapse').sideNav();
    this.props.triggerSearch('userDocuments');
    if (this.state.location.query.q !== undefined) {
      this.props.searchDocuments(this.props.location.query.q)
        .then(() => {
          this.setState({ loading: false });
        });
    } else {
      this.props.clearSearch();
      this.loadListDocument();
    }
  }

  /**
   * update state with new props
   * @param {Object} nextProps - new props changes
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      totalDocument: nextProps.totalDocument,
      documents: nextProps.myDocuments,
      loading: nextProps.loading,
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
        callback: () => this.props.undoDelete(document),
      },
    };
    this.props.deleteDocument(document)
      .then(() => {
        this.context.store.dispatch(Notifications.success(notificationOpts));
      });
  }

  /**
   * Handles pagination pages changes
   * @param {Number} page - current pagination number
   */
  nextPage(page) {
    this.props.loadUserDocuments(page - 1)
      .then(() => {
        this.setState({ activePagination: page });
      });
  }

  /**
   * Retrieves all users document from the action
   */
  loadListDocument() {
    this.props.loadUserDocuments()
      .then(() => {
        this.setState({ loading: false });
      });
  }

  /**
   * Renders users document
   * @return {any}
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
              documents={this.state.documents}
              user={this.props.user}
              deleteDocument={this.deleteDocument}
              isSearching={this.state.isSearching}
              searchQuery={this.state.searchQuery}
              searchCount={this.state.searchCount}
            />
            {!this.state.isSearching &&
              <Pagination
                onChange={this.nextPage}
                current={this.state.activePagination}
                total={this.state.totalDocument}
                pageSize={6}
              />
            }
          </div>
        }
      </div>
    );
  }
}

DocumentPage.propTypes = {
  myDocuments: PropTypes.array,
  loadUserDocuments: PropTypes.func,
  user: PropTypes.object,
  deleteDocument: PropTypes.func,
  undoDelete: PropTypes.func,
  searchDocuments: PropTypes.func,
  isSearching: PropTypes.bool,
  searchQuery: PropTypes.string,
  searchCount: PropTypes.number,
  totalDocument: PropTypes.number,
  triggerSearch: PropTypes.func,
  location: PropTypes.object,
  clearSearch: PropTypes.func,
};

DocumentPage.contextTypes = {
  store: PropTypes.object
};

/**
* mapStateToProps - copies states to component
* @param {object} state - initalState
* @return {object} any
*/
function mapStateToProps(state) {
  return {
    myDocuments: state.manageDocument.alldocuments,
    user: state.auth.user,
    isSearching: state.pageControls.isSearching,
    searchQuery: state.pageControls.searchQuery,
    searchCount: state.pageControls.searchCount,
    totalDocument: state.pageControls.totalDocument,
  };
}


export default
  connect(mapStateToProps, {
    loadUserDocuments,
    deleteDocument,
    undoDelete,
    searchDocuments,
    triggerSearch,
    clearSearch,
  })(DocumentPage);
