/* global $ */
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { login } from '../actions/userActions';

const history = createHistory({
  forceRefresh: false,
});
/**
 * Login Component - handles authentications
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      error: {},
    };

    this.onChange = this.onChange.bind(this);
  }
  /**
   * Set default router
   */
  componentDidMount() {
    if (this.context.router === undefined) {
      this.context.router = history;
    }
  }
  /**
   * onChange - listens to changes of input fields
   * @param {Object} event -  event object
   */
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const user = this.state.user;
    user[name] = value;
    this.setState({ user });
    event.preventDefault();
    this.setState({ error: {} });
    $('.login-form').validate({
      rules: {
        username: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 5,
        },
      },
      submitHandler: () => {
        this.props.login(this.state.user)
          .then(() => {
            toastr.success('Login Successfull');
            if (this.context.router === undefined) {
              history.push('/');
            } else {
              this.context.router.push('/');
            }
          })
          .catch(() => {
            toastr.error('Invalid credentials supplied');
          });
      },
      errorElement: 'div',
      errorPlacement: (error, element) => {
        const placement = $(element).data('error');
        if (placement) {
          $(placement).append(error);
          this.setState({ error });
        } else {
          error.insertAfter(element);
        }
      },
    });
  }

  /**
   * renders the login page
   */
  render() {
    return (
      <div className="login-page-wrapper">
        <div id="login-page" className="row">
          <div className="col s12 z-depth-4 card-panel">
            <form
              className="login-form left-alert"
              onSubmit={this.handleSubmit}
            >
              <div className="row">
                <div className="input-field col s12 center">
                  <h5><Link to="/" className="app-name"> We Doc</Link></h5>
                  <p className="center login-form-text">Login</p>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input
                    id="email"
                    name="email"
                    className="validate"
                    type="email"
                    onChange={this.onChange}
                  />
                  <label
                    className="center-align"
                    data-error="email is required"
                  >
                    email
                  </label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input
                    name="password"
                    type="password"
                    onChange={this.onChange}
                  />
                  <label data-error="enter your password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="submit"
                    className="btn waves-effect waves-light col s12"
                    value="Login"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 m6 l6">
                  <p className="margin medium-small">
                    <Link to="signup">Register Now!</Link>
                  </p>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

/**
 * mapStateToProps copies states to component
 * @param {object} state - initalState
 * @return {object} props object
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { login })(Login);
