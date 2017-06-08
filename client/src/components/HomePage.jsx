import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = { Page: null };
  }

  async componentDidMount() {
    if (this.props.user.isAuthenticated) {
      const { default: Page } = await import('./DashBoard');
      this.setState({ Page: <Page /> });
    } else {
      const { default: Page } = await import('./LandingPage');
      this.setState({ Page: <Page /> });
    }
  }
  render() {
    return (
      <div>
      {this.state.Page}
    </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired
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
