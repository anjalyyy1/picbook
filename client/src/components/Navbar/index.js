import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import { MdAdd } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import PostCreation from "components/PostCreation/container";

const useStyles = makeStyles({
  addPost: {
    position: "fixed",
    bottom: 30,
    right: 100,
    background: "#01ffb9"
  },
  addIcon: {
    fontSize: 40
  }
});

const navbarData = [
  {
    label: "Login",
    path: "/login",
    isShow: !!!localStorage.getItem("token")
  },
  {
    label: "Signup",
    path: "/signup",
    isShow: !!!localStorage.getItem("token")
  },
  {
    label: "Profile",
    path: "/profile",
    isShow: !!localStorage.getItem("token")
  },
  {
    label: "Home",
    path: "/home",
    isShow: !!localStorage.getItem("token")
  },
  {
    label: "Logout",
    path: "/login",
    isShow: !!localStorage.getItem("token")
  }
];

const Navbar = props => {
  const [showPostCreationModal, setPostCreationModal] = useState(false);
  const classes = useStyles(props);

  return (
    <StyledHeader className="navbar">
      <LogoWrapper>
        <StyledLogoLink to="/login">Picbook</StyledLogoLink>
      </LogoWrapper>
      <LinkWrapper>
        {map(navbarData, (eachLink, index) => {
          return eachLink.isShow ? (
            <StyledNavLink
              to={eachLink.path}
              key={index}
              onClick={
                eachLink.label === "Logout"
                  ? () => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("userDetails");
                    }
                  : () => {}
              }
            >
              {eachLink.label}
            </StyledNavLink>
          ) : null;
        })}
      </LinkWrapper>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addPost}
        onClick={() => setPostCreationModal(!showPostCreationModal)}
      >
        <MdAdd className={classes.addIcon} />
      </Fab>
      {showPostCreationModal && (
        <PostCreation
          open={showPostCreationModal}
          handleClose={() => setPostCreationModal(!showPostCreationModal)}
        />
      )}
    </StyledHeader>
  );
};

const StyledLogoLink = styled(NavLink)`
  cursor: pointer;
  font-size: 40px;
  font-family: "Gochi Hand", cursive;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  margin-right: 4%;
  font-weight: bold;
  ${props => props.theme.SNIPPETS.PARAGRAPH_TEXT};
`;

const LinkWrapper = styled.div`
  float: right;
  width: 40%;
  text-align: right;
  margin-top: 12px;
`;

const LogoImage = styled.img`
  width: 50%;
  height: auto;
  display: block;
`;

const LogoWrapper = styled.div`
  display: inline-block;
`;

const StyledHeader = styled.header`
  padding: 15px 27px;
  background-color: ${props => props.theme.COLOR.PRIMARY_COLOR};
  position: sticky;
  width: 100%;
  top: 0;
`;

export default Navbar;
