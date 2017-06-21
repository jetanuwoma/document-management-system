/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { listAllUsers,
        deleteUsers,
        selectUser,
        removeSelectedUser,
         } from '../../actions/adminActions';

class ManageUsers extends React.Component {

  constructor(props) {
    super(props);

    this.state = { users: [] };

    this.selectUser = this.selectUser.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
    $('.dropdown-button').dropdown();
    this.props.listAllUsers()
      .then(() => {
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  selectUser(event) {
    const id = event.target.id;
    const selectedUsers = this.props.selectedUsers;
    const index = selectedUsers.findIndex(element => element === id);

    // Add to selected users
    if (index !== -1) {
      this.props.removeSelectedUser(id, index);
    } else {
      this.props.selectUser(id);
    }
  }

  async deleteUsers(event) {
    event.preventDefault();
    if (this.props.selectedUsers.length === 0) {
      toastr.error('No user selected');
    } else {
      // create a copy
      const allUsers = this.props.selectedUsers.slice();
      await this.props.deleteUsers(allUsers).then(() => {
        this.props.listAllUsers().then(() => {
          toastr.success('User(s) deleted!');
          this.setState({ users: this.props.users });
        });
      });
    }
  }

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
                  <a href="#task-modal"
                    className="task-add modal-trigger red
                            btn-floating waves-effect waves-light">
                    <i className="fa fa-plus" />
                    </a>
                {this.state.users.map((user, index) => {
                  return (
                    <li className="collection-item dismissable"
                       key={`user${index}${user.id}`}>
                        <input type="checkbox"
                          onChange={this.selectUser}
                         id={user.id}/>
                       <label htmlFor={user.id}>{user.fullNames}</label>
                        <label className="email-add">{user.email}</label>
                        <span className="task-cat teal white-label">
                          {user.RoleId === 1 ? 'Admin' : 'Regular'}
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
  selectUser: PropTypes.func,
  removeSelectedUser: PropTypes.func
};

function mapStateToProps(state) {
  return {
    users: state.adminManagement.users,
    selectedUsers: state.adminManagement.selectedUsers,
  };
}

export default connect(mapStateToProps, { listAllUsers,
  deleteUsers,
  selectUser,
  removeSelectedUser })(ManageUsers);
