/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { triggerSearch } from '../../actions/pageAction';
import {
  loadUserDocuments,
  deleteDocument,
  undoDelete,
} from '../../actions/documentsAction';
import { searchDocuments } from '../../actions/adminActions';
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
      documents: [],
      isSearching: false,
      searchQuery: '',
    };

    this.nextPage = this.nextPage.bind(this);
    this.loadListDocument = this.loadListDocument.bind(this);
  }

  /**
   * check if search query has been passed to the route
   */
  componentDidMount() {
    $('.sidebar-collapse').sideNav();
    if (this.props.location.query.q !== undefined) {
      this.props.triggerSearch(this.props.location.query.q, 'documents');
      this.setState({ loading: false });
    } else {
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
      isSearching: nextProps.isSearching,
      searchQuery: nextProps.searchQuery,
    });
  }

  /**
   * Handles pagination pages changes
   * @param {Number} page - current pagination number
   */
  nextPage(page) {
    if (!this.state.isSearching) {
      this.props.loadUserDocuments(page - 1)
        .then(() => {
          this.setState({ activePagination: page });
        });
    } else {
      this.props.searchDocuments(this.state.searchQuery, '', page - 1)
        .then(() => {
          this.setState({ activePagination: page });
        });
    }
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
              documents={this.props.myDocuments}
              user={this.props.user}
              deleteDocument={this.props.deleteDocument}
              archived={this.props.archived}
              undoDelete={this.props.undoDelete}
              isSearching={this.props.isSearching}
              searchQuery={this.props.searchQuery}
              searchCount={this.props.searchCount}
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

DocumentPage.propTypes = {
  myDocuments: PropTypes.array,
  loadUserDocuments: PropTypes.func,
  user: PropTypes.object,
  deleteDocument: PropTypes.func,
  archived: PropTypes.object,
  undoDelete: PropTypes.func,
  searchDocuments: PropTypes.func,
  documentLoaded: PropTypes.bool,
  isSearching: PropTypes.bool,
  searchQuery: PropTypes.string,
  searchCount: PropTypes.number,
  totalDocument: PropTypes.number,
  triggerSearch: PropTypes.func,
  location: PropTypes.object,
};

 /**
 * mapStateToProps - copies states to component
 * @param {object} state - initalState
 * @return {object} any
 */
function mapStateToProps(state) {
  const currentState = state.manageDocument;
  const myDocuments = currentState.alldocuments;
  return {
    myDocuments,
    documentLoaded: currentState.loaded,
    user: state.user.user,
    archived: currentState.archived,
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
  })(DocumentPage);
