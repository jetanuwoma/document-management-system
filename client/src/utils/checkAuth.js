/* global localStorage */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setLoggedInUser } from '../actions/userActions';

export default (store) => {
  if (localStorage.tokenize && localStorage.tokenize !== 'undefined') {
    axios.defaults.headers = {
      'x-access-token': localStorage.getItem('tokenize'),
    };
    store.dispatch(setLoggedInUser(jwtDecode(localStorage.tokenize)));
  } else {
    axios.defaults.headers = {};
  }
};
