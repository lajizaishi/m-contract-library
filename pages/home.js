import React, { Component } from "react";
import { connect } from "react-redux";

import { AppWithAuthorization } from "../src/components/App";
import { db } from "../src/firebase";
import sessionReducer from "../src/reducers/session";

const fromObjectToList = object =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;
    document.documentElement.style.fontSize=document.documentElement.clientWidth/750*100+"px";
    // db.onceGetUsers().then(snapshot =>
    //   onSetUsers(fromObjectToList(snapshot.val()))
    // );
  }

  render() {
    const { users,authUser } = this.props;
    console.log('------',this.props)
    return (
      <AppWithAuthorization >
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        {authUser}
        {!!users.length && <UserList users={users} />}
      </AppWithAuthorization>
    );
  }
}

const UserList = ({ users }) => (
  <div>
    <h2>List of App User IDs (Saved on Sign Up in Firebase Database)</h2>
    {users.map((user,index) => (
      <div key={index}>{user.index}</div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  users: state.userState.users,
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
