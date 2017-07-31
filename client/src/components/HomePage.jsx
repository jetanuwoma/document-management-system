/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './LandingPage.jsx';
import DashBoard from './DashBoard.jsx';

/**
 * HomePage - Serve either Landing page or users dashboard
 */
class HomePage extends React.Component {
  /**
   * initates the sidebar
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * renders either the Landing page or user's dashboard
   */
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated ? <DashBoard /> : <LandingPage />}
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

/**
 * @param {Object} state
 * @returns {boolean}
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, null)(HomePage);
