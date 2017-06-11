import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUserDocuments } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader';

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);

    // set Dynamic import for code splitting and optimisation
    this.state = {
      ActivePage: <PreLoader />,
    };
    console.log(this.props);
  }

  componentDidMount() {
    this.props.loadUserDocuments()
      .then(() => {
        import('./DocumentList')
          .then((DocumentList) => {
             this.setState({
               ActivePage:
                 <DocumentList.default
                  documents={this.props.myDocuments}
                  user={this.props.user}
                  />
             });
          });
      });
  }

  render() {
    return (
      <div> {this.state.ActivePage} </div>
    );
  }

}

DocumentPage.propTypes = {
  myDocuments: PropTypes.array.isRequired,
  loadUserDocuments: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const currentState = state.manageDocument;
  const myDocuments = currentState.alldocuments;
  return {
    myDocuments,
    user: state.user.user
  };
}


export default connect(mapStateToProps, { loadUserDocuments })(DocumentPage);
