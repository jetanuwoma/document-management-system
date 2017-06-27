import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import { triggerSearch } from '../../actions/pageAction';
import { listAllDocuments, searchDocuments } from '../../actions/adminActions';
import { deleteDocument, undoDelete } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader.jsx';
import DocumentList from '../document/DocumentList.jsx';

/**
 * Admin Documents Management Component
 */
class ManageDocuments extends React.Component {

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
      documents: [],
      isSearching: false,
      searchQuery: '',
    };
    this.nextPage = this.nextPage.bind(this);
  }

  /**
   * List all users documents check if search is triggered
   */
  componentDidMount() {
    if (this.props.location.query.q !== undefined) {
      this.props.triggerSearch(this.props.location.query.q, 'documents');
      this.setState({ isFetching: false });
    } else {
      this.props.listAllDocuments()
        .then(() => {
          this.setState({ isFetching: false });
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
    });
    if (nextProps.isSearching) {
      this.setState({ totalDocuments: nextProps.searchCount });
    }
  }

  /**
   * Handles pagination
   * @param {Number} page - current page number 
   */
  nextPage(page) {
    if (!this.state.isSearching) {
      this.props.listAllDocuments(page - 1)
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
              documents={this.props.documents}
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
              total={this.state.totalDocuments}
              pageSize={6} />
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
  listAllDocuments: PropTypes.func.isRequired,
  archived: PropTypes.object.isRequired,
  undoDelete: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchCount: PropTypes.number.isRequired,
  totalDocuments: PropTypes.number.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  triggerSearch: PropTypes.func,
  location: PropTypes.object,
};

/**
 * mapStateToProps - copies states to component
 * @param {object} state - initalState
 * @return {object} any
 */
function mapStateToProps(state) {
  return {
    user: state.user.user,
    documents: state.adminManagement.allUsersDocuments,
    archived: state.manageDocument.archived,
    isSearching: state.pageControls.isSearching,
    searchQuery: state.pageControls.searchQuery,
    searchCount: state.pageControls.searchCount,
    totalDocuments: state.pageControls.totalDocument,
  };
}

export default connect(mapStateToProps, {
  listAllDocuments,
  deleteDocument,
  undoDelete,
  searchDocuments,
  triggerSearch,
})(ManageDocuments);
