/* global $ */
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { loginUser } from '../actions/userActions';

/**
 * Login Component - handles authentications
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * handleSubmit - Performs validating of text fields and submitting details
   * @param {Object} event - DOM element
   */
  handleSubmit(event) {
    event.preventDefault();
    $('.login-form').validate({
      rules: {
        username: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      submitHandler: () => {
        this.props.loginUser(this.state.user)
          .then(() => {
            if (!this.props.auth.error) {
              toastr.success('Login Successfull');
              this.context.router.push('/');
            } else {
              toastr.error(this.props.auth.error.message);
            }
          });
      },
      errorElement: 'div',
      errorPlacement: (error, element) => {
        const placement = $(element).data('error');
        if (placement) {
          $(placement).append(error);
        } else {
          error.insertAfter(element);
        }
      }
    });
  }

  /**
   * onChange - listens to changes of input fields
   * @param {Object} event -  DOM element
   */
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const user = this.state.user;
    user[name] = value;
    this.setState({ user });
  }

  /**
   * renders the login page
   * @return {any}
   */
  render() {
    return (
      <div className="login-page-wrapper">
        <div id="login-page" className="row">
          <div className="col s12 z-depth-4 card-panel">
            <form className="login-form left-alert"
              onSubmit={this.handleSubmit} >
              <div className="row">
                <div className="input-field col s12 center">
                  <h5><Link to="/" className="app-name"> We Doc</Link></h5>
                  <p className="center login-form-text">Login</p>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input id="username" name="username" className="validate"
                    type="email" onChange={this.onChange} />
                  <label className="center-align"
                    data-error="email is required" >email</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input name="password" type="password"
                    onChange={this.onChange} />
                  <label data-error="enter your password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="submit"
                    className="btn waves-effect waves-light col s12"
                    value="Login" />
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
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * mapStateToProps copies states to component
 * @param {object} state - initalState
 * @return {object} any
 */
function mapStateToProps(state) {
  return {
    auth: state.user.auth,
  };
}

export default connect(mapStateToProps, { loginUser })(Login);
