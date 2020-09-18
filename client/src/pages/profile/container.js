import React, { Component } from "react";
import Profile from "./index";
import { getUserPosts } from "./ducks";
import { connect } from "react-redux";

const mapStateToProps = state => {
  const { RECEIVE_USER_POST_LIST, RECEIVE_USER_SUCCESS } = state;

  return {
    ...RECEIVE_USER_POST_LIST,
    ...RECEIVE_USER_SUCCESS
  };
};

const mapDispatchToProps = {
  getUserPosts
};

class ProfilePage extends Component {
  state = {};

  componentDidMount() {
    this.getUserPostsHandler();
  }

  getUserPostsHandler = async () => {
    await this.props.getUserPosts();
  };

  render() {
    const stateMethodProp = {
      ...this,
      ...this.state,
      ...this.props
    };

    return <Profile {...stateMethodProp} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
