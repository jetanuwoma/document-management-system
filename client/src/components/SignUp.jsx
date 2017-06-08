import React from 'react';
import { Link } from 'react-router';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

   this.processSignUp = this.processSignUp.bind(this);
  }

  processSignUp(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-page-wrapper">
      <div id="login-page" className="row">
    <div className="col s12 z-depth-4 card-panel">
      <form className="signup-form" onSubmit={this.processSignUp}>
        <div className="row">
          <div className="input-field col s12 center">
           <h4><Link to="/" className="app-name"> We Doc</Link></h4>
            <p className="center login-form-text">Create An Account</p>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="username" type="text" required="" onChange={this.onChange} />
            <label className="center-align">Username</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="username" type="text" required="" />
            <label className="center-align">Fullnames</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="username" type="email" required="" />
            <label className="center-align">Username</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="password" type="password" required="" />
            <label>Password</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <input id="password" type="password" />
            <label>Re-Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <a href="index.html" className="btn
               waves-effect waves-light col s12">
              Register
            </a>
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
</div>
    );
  }
}

export default SignUp;
