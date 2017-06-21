import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactScrollPagination from 'react-scroll-pagination';
import { listAllDocuments } from '../../actions/adminActions';
import { deleteDocument, undoDelete } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader.jsx';
import DocumentList from '../document/DocumentList.jsx';

class ManageDocuments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      requestPagin: false,
      totalPages: 1,
      activePagination: 0,
      totalDocument: 0,
      documents: []
    };
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.listAllDocuments()
      .then(() => {
        this.setState({ isFetching: false });
      });
  }

  componentWillReceiveProps(nextProps) {
    // calculate total pages
    // totalDocument divides by a page limit
    const totalPage = nextProps.totalDocument / 6;
    this.setState({ totalDocument: nextProps.totalDocument,
      documents: nextProps.documents,
      totalPages: Math.ceil(totalPage) });
  }


  nextPage() {
    if (!this.state.requestPagin &&
        this.state.documents.length <= this.state.totalDocument
      ) {
      this.setState({ requestPagin: true });
      this.setState({ activePagination: this.state.activePagination + 1 });
      this.props.listAllDocuments(this.state.activePagination)
        .then(() => {
          this.setState({ requestPagin: false });
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.isFetching &&
          <PreLoader />
        }
        {!this.state.isFetching &&
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
        }
        {this.state.requestPagin &&
        <div className="progress">
          <div className="indeterminate" />
      </div>
       }
        <ReactScrollPagination
          fetchFunc={this.nextPage}
          totalPages={this.state.totalPages}
          paginationShowTime={3000}
          excludeElement='#nav-bar'
          excludeHeight={50}
          triggerAt={500}
        />
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
  totalDocument: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    documents: state.adminManagement.allUsersDocuments,
    archived: state.manageDocument.archived,
    isSearching: state.pageControls.isSearching,
    searchQuery: state.pageControls.searchQuery,
    searchCount: state.pageControls.searchCount,
    totalDocument: state.pageControls.totalDocument,
  };
}

export default connect(mapStateToProps, { listAllDocuments, deleteDocument, undoDelete })(ManageDocuments);
