import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LandingPage from './LandingPage';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { Page: <LandingPage /> };
  }

  async componentDidMount() {
    if (this.props.user.isAuthenticated) {
      const { default: Page } = await import('./DashBoard');
      this.setState({ Page: <Page /> });
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
      { isAuthenticated ? this.state.Page : <LandingPage /> }
    </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(HomePage);
