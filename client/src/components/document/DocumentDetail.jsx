/* global $ */
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadDocument, updateDocument } from '../../actions/documentsAction';


class DocumentDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { document: { title: '', content: '', permission: '' } };
  }

  componentDidMount() {
    this.props.loadDocument(this.props.params.id)
     .then(() => {
       const { id, title, content, permission } = this.props.document;
       this.setState({ document: { id, title, content, permission } });
     });
  }

  render() {
    const { content, title } = this.state.document;

    return (
    <div className="main">
      <div className="main-section">
      <div id="breadcrumbs-wrapper">
          <div className="">
            <div className="row">
              <div className="col s12 m12 l12">
                <h5 className="breadcrumbs-title">My Documents</h5>
                <ol className="breadcrumbs">
                  <li><Link to="/">Dashboard</Link>
                  </li>
                  <li className="active">{title}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h1>{title}</h1>

          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
    );
  }
}

DocumentDetail.propTypes = {
  document: PropTypes.object.isRequired,
  loadDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
};

DocumentDetail.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    document: state.manageDocument.selectedDocument,
  };
}

export default connect(mapStateToProps, { loadDocument, updateDocument })(DocumentDetail);
