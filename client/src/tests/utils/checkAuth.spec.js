/* global describe expect it jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import actionTypes from '../../constants';
import checkAuth from '../../utils/checkAuth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.localStorage = { tokenize: 'somerandomtokenstoredhere' };
global.localStorage.getItem = jest.fn(() => global.localStorage.tokenize);

jest.mock('jwt-decode');

describe('CheckAuth function', () => {
  it('Should set user access token if its in localstorage', () => {
    const store = mockStore();
    checkAuth(store);
    expect(axios.defaults.headers['x-access-token']).toBe('somerandomtokenstoredhere');
  });

  it('Should login the user', () => {
    const store = mockStore();
    checkAuth(store);
    const action = store.getActions();
    expect(action.length).toBe(1);
    expect(action[0].type).toBe(actionTypes.LOGIN_USER);
  });

  it('Should clear default header when no token is supplied', () => {
    global.localStorage.tokenize = undefined;
    const store = mockStore();
    checkAuth(store);
    expect(axios.defaults.headers).toEqual({});
  });
});
