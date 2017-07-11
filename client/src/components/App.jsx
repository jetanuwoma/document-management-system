import React from 'react';
import PropTypes from 'prop-types';
import 'rc-pagination/assets/index.css';
import Header from './templates/Header';

/**
 * App - Wrapper Component
 */
const App = (props) => (
  <div className="container-fluid">
    <Header {...props} />
    {props.children}
  </div>
  );

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
