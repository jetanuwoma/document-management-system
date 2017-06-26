import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import {
  loadPublicDocuments,
  deleteDocument,
  undoDelete
} from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader.jsx';
import DocumentList from './DocumentList.jsx';

/**
 * PublicDocument Component - Lists all public documents
 */
class PublicDocuments extends React.Component {

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
      documents: []
    };

    this.nextPage = this.nextPage.bind(this);
  }

  /**
   * Loads all public document
   */
  componentDidMount() {
    this.props.loadPublicDocuments()
      .then(() => {
        this.setState({ loading: false });
      });
  }

  /**
   * update state with new props
   * @param {Object} nextProps - new props
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      totalDocument: nextProps.totalDocument,
      documents: nextProps.myDocuments,
    });
  }

  /**
   * Perform pagination, changes active page
   * @param {Number} page - current page number
   */
  nextPage(page) {
    this.props.loadPublicDocuments(page)
      .then(() => {
        this.setState({ activePagination: page });
      });
  }

  /**
   * Renders views
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
              pageSize={6} />
          </div>
        }
      </div>
    );
  }
}

PublicDocuments.propTypes = {
  myDocuments: PropTypes.array.isRequired,
  loadPublicDocuments: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  archived: PropTypes.object.isRequired,
  undoDelete: PropTypes.func.isRequired,
  documentLoaded: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchCount: PropTypes.number.isRequired,
  totalDocument: PropTypes.number,
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


export default connect(mapStateToProps, {
  loadPublicDocuments,
  deleteDocument,
  undoDelete,
})(PublicDocuments);
