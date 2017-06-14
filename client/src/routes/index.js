import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import DocumentPage from '../components/document/DocumentPage';
import EditDocument from '../components/document/EditDocument';
import DocumentDetail from '../components/document/DocumentDetail';
import PublicDocuments from '../components/document/PublicDocuments';
import ManageUsers from '../components/admin/ManageUsers';
import ManageDocuments from '../components/admin/ManageDocuments';
import '../assets/styles/App.css';


export default (
  <Route>
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="doc" component={DocumentPage} />
    <Route path="doc/public" component={PublicDocuments} />
    <Route path="doc/edit/:id" component={EditDocument} />
    <Route path="doc/:id" component={DocumentDetail} />
    <Route path="users" component={ManageUsers} />
    <Route path="documents" component={ManageDocuments} />
  </Route>
  <Route path="login" component={Login}/>
  <Route path="signup" component={SignUp}/>
  </Route>
);
