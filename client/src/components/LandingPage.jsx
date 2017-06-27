/* global $ */
import React from 'react';
import { Link } from 'react-router';

/**
 * Landing Page Component
 */
const LandingPage = () =>
  (
    <div>
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <br /><br />
          <h1 className="header center orange-text">We Doc</h1>
          <div className="row center">
            <h5 className="header col s12 light">
              A modern document management system that does the work perfectly
            </h5>
          </div>
          <div className="row center">
            <Link to="/login"
              className="btn-large waves-effect waves-light orange">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">newspaper</i>
                </h2>
                <h5 className="center">Easy Management</h5>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">group</i>
                </h2>
                <h5 className="center">User Experience</h5>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text">
                  <i className="material-icons">lock</i>
                </h2>
                <h5 className="center">Confidentiality</h5>
              </div>
            </div>
          </div>

        </div>
        <br /><br />

        <div className="section" />
      </div>
    </div >
  );

export default LandingPage;
