import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import Layout from "components/Layout";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import { map, get, keys, includes } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import { FcShare } from "react-icons/fc";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FcExpand } from "react-icons/fc";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { BiSend } from "react-icons/bi";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 30,
    maxWidth: 500
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "red"
  },
  commentField: {
    width: "100%"
  },
  sendButton: {
    position: "absolute",
    top: 15,
    right: 10,
    width: 25,
    height: 26,
    color: "#01ffb9",
    cursor: "pointer"
  }
}));

const Profile = props => {
  const classes = useStyles(props);
  const {
    postsList,
    reactionHandler,
    handleExpandClick,
    commentHandler,
    onChangeCommentHandler
  } = props;
  const userId = JSON.parse(localStorage.getItem("userDetails"))._id;

  return (
    <PageWrapper>
      <StyledHeading>Your Posts</StyledHeading>
      <FeedDetails>
        <MyFeed>
          {map(postsList, eachPost => {
            return (
              <Card className={classes.root}>
                <CardHeader title={eachPost.title} />
                <CardMedia
                  className={classes.media}
                  image={eachPost.picture}
                  title={eachPost.title}
                />
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FcShare />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      reactionHandler(eachPost.likes, get(eachPost, `_id`))
                    }
                  >
                    {includes(get(eachPost, `likes`), userId) ? (
                      <FcLike />
                    ) : (
                      <FcLikePlaceholder />
                    )}
                  </IconButton>
                  <IconButton
                    className={`${classes.expand} ${
                      eachPost.expanded && classes.expandOpen
                    }`}
                    onClick={() => handleExpandClick(eachPost._id)}
                    aria-expanded={eachPost.expanded}
                    aria-label="show more"
                  >
                    <FcExpand />
                  </IconButton>
                </CardActions>
                <Collapse in={eachPost.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <CommentField>
                      <TextField
                        id="standard-basic"
                        label="Comment"
                        className={classes.commentField}
                        onChange={e => onChangeCommentHandler(e, eachPost)}
                      />
                      <BiSend
                        className={classes.sendButton}
                        onClick={() => commentHandler(eachPost)}
                      />
                    </CommentField>
                    <AllComments>
                      {map(get(eachPost, `comments`), eachComment => {
                        return (
                          <Comment>
                            <CommentBy>
                              {get(eachComment, `postedBy.name`)}
                            </CommentBy>
                            <CommentText>
                              {get(eachComment, `text`)}
                            </CommentText>
                          </Comment>
                        );
                      })}
                    </AllComments>
                  </CardContent>
                </Collapse>
              </Card>
            );
          })}
        </MyFeed>
        <ProfileDetails>
          <ProfileName>Anjali Gupta</ProfileName>
        </ProfileDetails>
      </FeedDetails>
    </PageWrapper>
  );
};

const CommentText = styled.span``;

const CommentBy = styled.span`
  font-weight: bold;
  margin-right: 20px;
`;

const Comment = styled.div`
  margin-top: 10px;
`;

const AllComments = styled.div``;

const CommentField = styled.div`
  position: relative;
`;

const ProfileName = styled.h3``;

const ProfileDetails = styled.div`
  width: 30%;
  height: 50vh;
  position: fixed;
  right: 0;
`;

const FeedDetails = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MyFeed = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const PostImage = styled.img``;

const Feeds = styled.div``;

const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
`;

const StyledHeading = styled.h2`
  ${props => props.theme.SNIPPETS.HEADING};
  margin-top: 20px;
  font-size: 30px;
  padding-bottom: 10px;
`;

export default Layout(Profile);
