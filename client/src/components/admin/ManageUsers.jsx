import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { triggerSearch, clearSearch } from '../../actions/pageAction';
import {
  listAllUsers,
  deleteUsers,
  selectUser,
  removeSelectedUser,
  searchUsers,
} from '../../actions/adminActions';

/**
 * ManageUsers - Displays the list of users and also controls user deletion
 */
export class ManageUsers extends React.Component {
  /**
   * set default state values
   * @param {Object} props 
   */
  constructor(props) {
    super(props);

    this.state = { users: this.props.users, selectedUsers: this.props.selectedUsers };

    this.selectUser = this.selectUser.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
  }
  
  /**
   * list users from the api, or search users if search query is defined
   */
  componentDidMount() {
    this.props.triggerSearch('users');

    if (this.props.location.query.q !== undefined) {
      this.props.searchUsers(this.props.location.query.q);
    } else {
      this.props.listAllUsers()
       .catch(() => toastr.error('Sorry error occurred could not load users'));
    }
  }
  
  /**
   * 
   * @param {Object} nextProps - New props received
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users, selectedUsers: nextProps.selectedUsers });
  }
  

  /**
   * Add Selected users to list of users to delete, or remove them
   * @param {Object} event  checkbox event object
   */
  selectUser(event) {
    const id = event.target.id;
    const selectedUsers = this.state.selectedUsers;
    const index = selectedUsers.findIndex(element => element === id);

    if (index !== -1) {
      this.props.removeSelectedUser(id, index);
      const selected = this.state.selectedUsers;
      selected.splice(index, 1);
      this.setState({ selectedUsers: selected });
    } else {
      this.props.selectUser(id);
      this.setState({ selectedUsers: [...this.state.selectedUsers, id] });
    }
  }
  /**
   * deleteUsers - deletes all selected users
   *  @param {Object} event - Button event object
   */
  async deleteUsers(event) {
    event.preventDefault();
    if (this.state.selectedUsers.length === 0) {
      toastr.error('No user selected');
    } else {
      const allUsers = this.state.selectedUsers.slice();
      await this.props.deleteUsers(allUsers).then(() => {
        this.props.listAllUsers().then(() => {
          toastr.success('User(s) deleted!');
          this.setState({ users: this.props.users });
        });
      })
      .catch(() => toastr.error('Some user\'s could not be deleted'));
    }
  }

  /**
   * Displays the list of all registered user
   */
  render() {
    return (
      <div className="main">
        <div className="main-section">
          <div className="col s12 m12">
            <div className="col s12">
              <nav className="grey">
                <div className="nav-wrapper">
                  <div className="left col s12 m5 l5">
                    <ul>
                      <li>
                        <a href="#!" className="email-menu">
                          <i className="large material-icons">menus</i>
                        </a>
                      </li>
                      <li>
                        <a href="#!" className="email-type">Manage Users</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col s12 m7 l7 hide-on-med-and-down">
                    <ul className="right">
                      <li>
                        <a href=""
                          onClick={this.deleteUsers}
                        >
                          <i className="large material-icons">delete</i>
                        </a>
                        <a href=""
                          onClick={this.makeAdmin}
                        >
                          <i className="large material-icons">key</i>
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>
              </nav>
              <ul id="task-card" className="collection with-header">
                {this.state.users.map((user, index) => {
                  return (
                    <li className="collection-item dismissable"
                      key={`user${index}${user.id}`}>
                      <input type="checkbox"
                        onChange={this.selectUser}
                        id={user.id} />
                      <label htmlFor={user.id}>{user.fullName}</label>
                      <label className="email-add">{user.email}</label>
                      <span className="task-cat teal white-label">
                        {user.roleId === 1 ? 'Admin' : 'Regular'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red"
            onClick={this.deleteUsers}
          >
            <i className="large material-icons">delete</i>
          </a>
        </div>
      </div>
    );
  }
}

ManageUsers.propTypes = {
  users: PropTypes.array,
  deleteUsers: PropTypes.func,
  listAllUsers: PropTypes.func,
  selectedUsers: PropTypes.array,
  triggerSearch: PropTypes.func,
  clearSearch: PropTypes.func,
  selectUser: PropTypes.func,
  searchUsers: PropTypes.func,
  removeSelectedUser: PropTypes.func
};

/**
 * mapStateToProps - copies states to component
 * @param {Object} state - initalState
 * @return {Object} props objects
 */
function mapStateToProps(state) {
  return {
    users: state.adminManagement.users,
    selectedUsers: state.adminManagement.selectedUsers,
  };
}

export default connect(mapStateToProps, {
  listAllUsers,
  deleteUsers,
  selectUser,
  triggerSearch,
  clearSearch,
  searchUsers,
  removeSelectedUser
})(ManageUsers);
