import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './templates/Header';

class App extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <Header {...this.props} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
