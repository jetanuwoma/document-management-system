import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App.jsx';
import HomePage from '../components/HomePage.jsx';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
import DocumentPage from '../components/document/DocumentPage.jsx';
import EditDocument from '../components/document/EditDocument.jsx';
import DocumentDetail from '../components/document/DocumentDetail.jsx';
import PublicDocuments from '../components/document/PublicDocuments.jsx';
import ManageUsers from '../components/admin/ManageUsers.jsx';
import ManageDocuments from '../components/admin/ManageDocuments.jsx';
import '../assets/styles/App.css';


export default (
  <Route>
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="doc" component={DocumentPage} />
    <Route path="doc/public" component={PublicDocuments} />
    <Route path="doc/role" component={PublicDocuments} />
    <Route path="doc/edit/:id" component={EditDocument} />
    <Route path="doc/:id" component={DocumentDetail} />
    <Route path="users" component={ManageUsers} />
    <Route path="documents" component={ManageDocuments} />
  </Route>
  <Route path="login" component={Login}/>
  <Route path="signup" component={SignUp}/>
  </Route>
);
