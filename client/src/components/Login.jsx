import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { loginUser } from '../actions/userActions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state.user)
      .then(() => {
        toastr.success('Login Successfull');
        this.context.router.push('/');
      });
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const user = this.state.user;
    user[name] = value;
    this.setState({ user });
  }

  render() {
    return (
      <div className="login-page-wrapper">
      <div id="login-page" className="row">
    <div className="col s12 z-depth-4 card-panel">
      <form className="login-form" onSubmit={this.handleSubmit} >
        <div className="row">
          <div className="input-field col s12 center">
           <h5><Link to="/" className="app-name"> We Doc</Link></h5>
            <p className="center login-form-text">Login</p>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input name="username" type="text" required="required" onChange={this.onChange} />
            <label className="center-align">Username</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input name="password" type="password" required="required" onChange={this.onChange} />
            <label>Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input type="submit" className="btn
               waves-effect waves-light col s12" value="Login" />
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
  loginUser: React.PropTypes.func.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { loginUser })(Login);
