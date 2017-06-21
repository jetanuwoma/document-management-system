import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactScrollPagination from 'react-scroll-pagination';
import { loadUserDocuments,
         deleteDocument,
         undoDelete } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader.jsx';
import DocumentList from './DocumentList.jsx';

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      requestPagin: false,
      totalPages: 1,
      activePagination: 0,
      totalDocument: 0,
      documents: []
    };

    this.nextPage = this.nextPage.bind(this);
    this.loadListDocument = this.loadListDocument.bind(this);
  }

  componentDidMount() {
    this.loadListDocument();
  }

  componentWillReceiveProps(nextProps) {
    const totalPage = nextProps.totalDocument / 6;
    this.setState({ totalDocument: nextProps.totalDocument,
      documents: nextProps.myDocuments,
      totalPages: Math.ceil(totalPage) });
  }

  nextPage() {
    if (!this.state.requestPagin &&
        this.state.documents.length <= this.state.totalDocument
      ) {
      this.setState({ requestPagin: true });
      this.setState({ activePagination: this.state.activePagination + 1 });
      this.props.loadUserDocuments(this.state.activePagination)
        .then(() => {
          this.setState({ requestPagin: false });
        });
    }
  }

  loadListDocument() {
    this.props.loadUserDocuments()
      .then(() => {
        this.setState({ loading: false });
      });
  }


  render() {
    return (
        <div>
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
             <ReactScrollPagination
               fetchFunc={this.nextPage}
               totalPages={this.state.totalPages}
               paginationShowTime={3000}
               excludeElement='#nav-bar'
               excludeHeight={50}
               triggerAt={300}
             />
           </div>
       }
    </div>
    );
  }
}

DocumentPage.propTypes = {
  myDocuments: PropTypes.array.isRequired,
  loadUserDocuments: PropTypes.func.isRequired,
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


export default connect(mapStateToProps, { loadUserDocuments, deleteDocument, undoDelete, })(DocumentPage);
