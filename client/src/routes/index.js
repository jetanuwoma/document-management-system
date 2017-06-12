import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import DocumentPage from '../components/document/DocumentPage';
import EditDocument from '../components/document/EditDocument';
import '../assets/styles/App.css';


export default (
  <Route>
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="doc" component={DocumentPage} />
    <Route path="doc/edit/:id" component={EditDocument} />
  </Route>
  <Route path="login" component={Login}/>
  <Route path="signup" component={SignUp}/>
  </Route>
);
