/* global $ */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { registerUser, isUserExisting } from '../actions/userActions';


/**
 * SignUp Component
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      error: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * onChange - handles input field change event
   * @param  {Object} event DOM element
   */
  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const user = this.state.user;
    user[name] = value;
    event.preventDefault();
    this.setState({ user });
    $('.signup-form').validate({
      rules: {
        fullNames: {
          required: true,
          minlength: 6,
        },
        email: {
          email: true,
          required: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
        username: {
          required: true,
          minlength: 4,
        },
        passwordAgain: {
          required: true,
          equalTo: '#password',
        },
      },
      errorElement: 'div',
      errorPlacement: (error, element) => {
        const placement = $(element).data('error');
        if (placement) {
          $(placement).append(error);
        } else {
          error.insertAfter(element);
        }
      },
      submitHandler: () => {
        this.props.registerUser(this.state.user)
          .then(() => {
            toastr.success('Account Created Successfully');
            this.context.router.push('/');
          })
          .catch((error) => {
            this.setState({ error: error.response.data.message });
          })
          .catch(() => {
            toastr.error('Account Exists');
          });
      },
    });
  }


  /**
   * render - Renders Signup Page
   * @return {any}
   */
  render() {
    return (
      <div className="login-page-wrapper">
        <div id="login-page" className="row">
          <div className="col s12 z-depth-4 card-panel">
            <form
              className="signup-form left-alert"
              onSubmit={this.processSignUp}
            >
              <div className="row">
                <div className="input-field col s12 center">
                  <h4><Link to="/" className="app-name"> We Doc</Link></h4>
                  <p className="center login-form-text">Create An Account</p>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input
                    name="fullNames"
                    id="fullNames"
                    type="text"
                    onChange={this.onChange}
                  />
                  <label
                    data-error="Your full name is required"
                    className="center-align"
                  >
                    Fullnames
                  </label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input
                    name="username"
                    type="text"
                    id="username"
                    onChange={this.onChange}
                  />
                  <label className="center-align">
                    Username
                  </label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    onChange={this.onChange}
                  />
                  <label className="center-align">Email</label>
                </div>
                <label className="email-error"> {this.state.error} </label>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    onChange={this.onChange}
                  />
                  <label>Password</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <input
                    id="passwordAgain"
                    name="passwordAgain"
                    type="password"
                    onChange={this.onChange}
                  />
                  <label>Confirm Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    type="submit"
                    className="btn waves-effect waves-light col s12">
                    Register
                 </button>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 m6 l6">
                  <p className="margin medium-small">
                    <Link to="login">Login</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isUserExisting: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

/**
 * mapStateToProps - copies states to component
 * @param {object} state - initalState
 * @return {object} any
 */
function mapStateToProps(state) {
  return {
    auth: state.auth.user,
  };
}

SignUp.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps,
  { registerUser, isUserExisting })(SignUp);
