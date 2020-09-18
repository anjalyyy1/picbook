import React, { Component } from "react";
import Home from "./index";
import { getAllPosts, postReactionHandler, postCommentHandler } from "./ducks";
import { connect } from "react-redux";
import { find } from "lodash";

const mapStateToProps = state => {
  const { RECEIVE_POST_LIST } = state;

  return {
    ...RECEIVE_POST_LIST
  };
};

const mapDispatchToProps = {
  getAllPosts,
  postReactionHandler,
  postCommentHandler
};

class HomePage extends Component {
  state = {};

  componentDidMount() {
    this.getAllPostsHandler();
  }

  getAllPostsHandler = async () => {
    await this.props.getAllPosts();
    this.setState({
      postsList: this.props.postsList
    });
  };

  commentHandler = async post => {
    const patchData = {
      comment: post.addedComment,
      postId: post._id
    };

    await this.props.postCommentHandler(patchData);
    this.getAllPostsHandler();
  };

  onChangeCommentHandler = (e, post) => {
    const { postsList } = this.state;
    const activePost = find(postsList, { _id: post._id });
    activePost["addedComment"] = e.target.value;

    this.setState({
      postsList
    });
  };

  reactionHandler = async (likes, id) => {
    const userId = JSON.parse(localStorage.getItem("userDetails"))._id;

    const reaction = likes.includes(userId) ? "dislike" : "like";
    await this.props.postReactionHandler(reaction, id);
    this.getAllPostsHandler();
  };

  handleExpandClick = _id => {
    const { postsList } = this.state;
    const activePost = find(postsList, { _id });
    activePost["expanded"] = !activePost.expanded;

    this.setState({
      postsList
    });
  };

  render() {
    const stateMethodProp = {
      ...this,
      ...this.state,
      ...this.props
    };

    return <Home {...stateMethodProp} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
