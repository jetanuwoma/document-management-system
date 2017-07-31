/* global describe, it, expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import $ from '../../helper/validator';
import TestWrapper from '../TestWrapper';
import { ManageUsers } from '../../../components/admin/ManageUsers';
const jquery = require('jquery');

TestWrapper.componentName = 'ManageUsers';

const mockFunc = jest.fn();
mockFunc.mockReturnValue(() => Promise.resolve(true));

const mockSearch = jest.fn();
mockFunc.mockReturnValue(() => Promise.resolve(true));

const users = [{
  userId: 1,
  fullName: 'Etanuwoma Jude',
  email: 'email@email.com',
  roleId: 1,
},
{
  userId: 2,
  fullName: 'Etanuwoma Peter',
  email: 'email1@email.com',
  roleId: 2,
},
];
const userDetail = {
  userId: 1,
  fullName: 'Jude Admin',
  roleId: 1,
};

const listAllUsers = mockFunc();

describe('ManageUsers Component', () => {
  describe('When admin is logged in', () => {
    const wrapper = TestWrapper.mounts(ManageUsers, {
      users,
      user: userDetail,
      location: { query: {} },
      listAllUsers,
      triggerSearch: jest.fn(),
      clearSearch: jest.fn(),
      selectedUsers: [],
      selectUser: jest.fn(),
      removeSelectedUser: jest.fn(),
      searchUsers: () => Promise.resolve(true),
      deleteUsers: jest.fn(() => { return Promise.resolve(true); }),
    });

    it('Should list all 2 users with their names', () => {
      expect(wrapper.render().html().includes('Etanuwoma Peter')).toBe(true);
      expect(wrapper.render().html().includes('Etanuwoma Jude')).toBe(true);
    });

    it('Should update state when component receive props', () => {
      users.push({
        userId: 3,
        fullName: 'Etanuwoma Me',
        email: 'email1@email.com',
        roleId: 2,
      });
      TestWrapper.call().componentWillReceiveProps({ users, selectedUsers: [] });
      expect(TestWrapper.call().state.users.length).toBe(3);
    });

    it('Should list all users with thier email', () => {
      expect(wrapper.render().html().includes('email@email.com')).toBe(true);
      expect(wrapper.render().html().includes('email1@email.com')).toBe(true);
    });

    it('Should indicate each users role', () => {
      expect(wrapper.render().html().includes('Admin')).toBe(true);
      expect(wrapper.render().html().includes('Regular')).toBe(true);
      expect(wrapper.render().html().includes('MainMan')).toBe(false);
    });

    it('Should call the search user props when query is defined in the url', () => {
      TestWrapper.call().props.location.query.q = 'book';
      TestWrapper.call().componentDidMount();
      expect(TestWrapper.call().props.searchUsers);
    });

    describe('When admin select users to be deleted', () => {
      it('Should get the total users selected', () => {
        expect(TestWrapper.call().state.selectedUsers.length).toBe(0);
      });

      it('Should add to selected users when admin clicked on checkbox', () => {
        const event = { target: { id: 1 } };
        TestWrapper.call().selectUser(event);
        expect(TestWrapper.call().state.selectedUsers.length).toBe(1);
        expect(TestWrapper.call().state.selectedUsers[0]).toBe(1);
        event.target.id = 2;
        TestWrapper.call().selectUser(event);
        expect(TestWrapper.call().state.selectedUsers.length).toBe(2);
        expect(TestWrapper.call().state.selectedUsers[1]).toBe(2);
      });

      it('Should remove from selected users if admin uncheck the checkbox', () => {
        expect(TestWrapper.call().state.selectedUsers.length).toBe(2);
        const event = { target: { id: 1 } };
        TestWrapper.call().selectUser(event);
        expect(TestWrapper.call().state.selectedUsers.length).toBe(1);
        event.target.id = 2;
        TestWrapper.call().selectUser(event);
        expect(TestWrapper.call().state.selectedUsers.length).toBe(0);
      });

      it('should not delete user when selected users is 0', () => {
        const event = { preventDefault: jest.fn() };
        TestWrapper.call().deleteUsers(event);
        expect(TestWrapper.call().props.deleteUsers).not.toHaveBeenCalled();
        const events = { target: { id: 1 } };
        TestWrapper.call().selectUser(events);
        events.target.id = 2;
        TestWrapper.call().selectUser(events);
        TestWrapper.call().deleteUsers(event);
        expect(TestWrapper.call().props.deleteUsers).toHaveBeenCalled();
      });
    });
  });
});
