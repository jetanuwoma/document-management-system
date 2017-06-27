import React from 'react';
import PropTypes from 'prop-types';
import 'rc-pagination/assets/index.css';
import Header from './templates/Header.jsx';

/**
 * App - Wrapper Component
 */
class App extends React.Component {

  /**
   * renders passed in children
   */
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
