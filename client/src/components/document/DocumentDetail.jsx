/* global $ */
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { loadDocument } from '../../actions/documentsAction';

/**
 * DocumentDetail- Displays the content of a document
 */
export class DocumentDetail extends React.Component {

  /**
   * set default state values
   * @param {Object} props - passed in props
   */
  constructor(props) {
    super(props);

    this.state = {
      document: { title: '', content: '', permission: '' }
    };
  }

  /**
   * get a single document from the api
   */
  componentDidMount() {
    $('.sidebar-collapse').sideNav();
    this.props.loadDocument(this.props.params.id)
      .then(() => {
        const { id, title, content, permission } = this.props.document;
        this.setState({ document: { id, title, content, permission } });
      })
      .catch(() => toastr.error('Sorry could not load that document'));
  }

  /**
   *
   * display the content of a document
   * @return {Object}
   */
  render() {
    const { content, title } = this.props.document;

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
};

/**
* mapStateToProps - copies states to component
* @param {object} state - initalState
* @return {object} any
*/
function mapStateToProps(state) {
  return {
    document: state.manageDocument.selectedDocument,
  };
}

export default connect(mapStateToProps, {
  loadDocument,
})(DocumentDetail);
