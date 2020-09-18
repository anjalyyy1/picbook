import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import Layout from "components/Layout";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { map, get, keys } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({});

const Home = props => {
  const { userPosts } = props;
  const classes = useStyles(props);

  return (
    <PageWrapper>
      <ProfileMetadata>
        <ProfileImageWrapper>
          <ProfileImage src="https://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg" />
        </ProfileImageWrapper>
        <ProfileDetails>
          <ProfileName>{get(userPosts, [0, "postedBy", "name"])}</ProfileName>
          <Counts>
            <PostsCount>{get(userPosts, `length`)} posts</PostsCount>
            <FollowerCount>2 followers</FollowerCount>
            <FollowingCount>3 following</FollowingCount>
          </Counts>
        </ProfileDetails>
      </ProfileMetadata>
      <Posts>
        {map(userPosts, eachPost => {
          return (
            <PostWrapper>
              <PostImage src={get(eachPost, `picture`)} />
            </PostWrapper>
          );
        })}
      </Posts>
    </PageWrapper>
  );
};

const PostWrapper = styled.div`
  border-radius: 10px;
  margin-right: 8px;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  display: inline-block;
  max-width: 300px;
  max-height: 300px;
`;

const Counts = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostsCount = styled.span``;

const FollowerCount = styled.span``;

const FollowingCount = styled.span``;

const ProfileDetails = styled.div`
  width: 27%;
`;

const ProfileName = styled.h2`
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 20px;
`;

const ProfileImageWrapper = styled.div`
  width: 20%;
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProfileMetadata = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid ${props => props.theme.COLOR.DIVIDER};
  padding-bottom: 30px;
`;

const Posts = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const HelperText = styled.span`
  ${props => props.theme.SNIPPETS.HELPER_TEXT};
  display: block;
  text-align: center;
  margin-top: 10px;
  a {
    border-bottom: 2px solid ${props => props.theme.COLOR.DARK_GREY};
  }
`;

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

export default Layout(Home);
