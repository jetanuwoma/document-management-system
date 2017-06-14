import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { listAllUsers, deleteUser } from '../../actions/adminActions';
import profilePic from '../../assets/images/user-profile.png';

class ManageUsers extends React.Component {

  constructor(props) {
    super(props);

    console.log(this.props);
  }

  componentDidMount() {
    this.props.listAllUsers()
      .then(() => {
        toastr.success('loaded');
      });
  }

  nextPage() {
    console.log('scrolling');
  }

  render() {
    const { users } = this.props;
    return (
      <div className="main">
        <div className="main-section">
        <div id="breadcrumbs-wrapper">
            <div className="">
              <div className="row">
                <div className="col s12 m12 l12">
                  <h5 className="breadcrumbs-title">All Users</h5>
                  <ol className="breadcrumbs">
                    <li><Link to="/">Dashboard</Link>
                    </li>
                    <li className="active">Users</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
      <div className="col s12 m12">
        <ul id="profile-page-about-feed" className="collection z-depth-1">
                {users.map((user, index) => {
                  return (
                    <li className="collection-item avatar" key={index}>
                      <img src={profilePic} className="circle" />
                      <span className="title">{user.fullNames}</span>
                      <p>{user.email}
                        <br /> <span className="ultra-small">Regular</span>
                      </p>
                      <a href="#!" className="secondary-content">
                        <i className="fa fa-trash" /></a>
                    </li>
                  );
                })}
                </ul>
      </div>
    </div>
  </div>
    );
  }
}

ManageUsers.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func,
  listAllUsers: PropTypes.func
};

function mapStateToProps(state) {
  return {
    users: state.manageUsers.users
  };
}

export default connect(mapStateToProps, { listAllUsers, deleteUser })(ManageUsers);
