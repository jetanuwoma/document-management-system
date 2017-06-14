import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Link } from 'react-router';
import ReactScrollPagination from 'react-scroll-pagination';
import { listAllDocuments } from '../../actions/adminActions';
import { deleteDocument, undoDelete } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader';

class ManageDocuments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ActivePage: <PreLoader />,
      isFetching: false,
      totalPages: 1,
      activePagination: 0 };

    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.listAllDocuments()
      .then(() => {
        import('../document/DocumentList')
          .then((DocumentList) => {
            this.setState({ ActivePage:
              <DocumentList.default
                documents={this.props.documents}
                user={this.props.user}
                deleteDocument={this.props.deleteDocument}
                archived={this.props.archived}
                undoDelete={this.props.undoDelete}
                 /> });
          });
      });
  }

  nextPage() {
    if (!this.state.isFetching) {
      this.setState({ isFetching: true });
      this.setState({ activePagination: this.state.activePagination + 1 });
      this.props.listAllDocuments(this.state.activePagination)
        .then(() => {
          import('../document/DocumentList')
            .then((DocumentList) => {
              this.setState({ isFetching: false,
                ActivePage:
                <DocumentList.default
                  documents={this.props.documents}
                  user={this.props.user}
                  deleteDocument={this.props.deleteDocument}
                  archived={this.props.archived}
                  undoDelete={this.props.undoDelete}
                  /> });
            });
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.ActivePage}
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
};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    documents: state.adminManagement.allUsersDocuments,
    archived: state.manageDocument.archived,
  };
}

export default connect(mapStateToProps, { listAllDocuments, deleteDocument, undoDelete })(ManageDocuments);
