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

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#01ffb9"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#01ffb9"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#01ffb9"
      },
      "&:hover fieldset": {
        borderColor: "#01ffb9"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#01ffb9"
      }
    },
    maxWidth: 500,
    margin: "0 auto",
    marginTop: "50px",
    padding: "25px"
  },
  formControl: {
    display: "block",
    width: "100%",
    marginBottom: "31px"
  },
  inputLabel: {
    width: "100%"
  },
  inputBox: {
    width: "100%",
    resize: "none"
  },
  selectField: {
    width: "30%"
  },
  loginButton: {
    backgroundColor: "#01ffb9",
    color: "#fff",
    fontWeight: "bold",
    display: "block",
    margin: "0 auto",
    "&:hover": {
      opacity: 0.9
    }
  }
});

const Login = props => {
  const classes = useStyles(props);
  const { form, handleInputChange, createAccountHandler } = props;

  return (
    <PageWrapper>
      <Card className={classes.root}>
        <StyledHeading>Picbook</StyledHeading>
        {map(keys(form), eachField => {
          let { type } = form[eachField];

          const formField = (
            <>
              {(type === "input" || type === "password") && (
                <FormControl
                  className={classes.formControl}
                  error={!!get(form[eachField], `error`)}
                >
                  <InputLabel
                    htmlFor={form[eachField]}
                    className={classes.inputLabel}
                  >
                    {get(form[eachField], `label`)}
                  </InputLabel>
                  <Input
                    type={get(form[eachField], `type`)}
                    id={get(form[eachField], `label`)}
                    className={classes.inputBox}
                    value={get(form[eachField], `value`)}
                    onChange={e =>
                      handleInputChange({
                        key: eachField,
                        value: e.target.value
                      })
                    }
                    aria-describedby="component-error-text"
                  />
                  <FormHelperText id="component-error-text">
                    {get(form[eachField], `error`)}
                  </FormHelperText>
                </FormControl>
              )}
            </>
          );
          return formField;
        })}

        <Button
          variant="contained"
          className={classes.loginButton}
          onClick={createAccountHandler}
        >
          Sign in
        </Button>
        <HelperText>
          <Link to="/login">Already have an account?</Link>
        </HelperText>
      </Card>
    </PageWrapper>
  );
};

const HelperText = styled.span`
  ${props => props.theme.SNIPPETS.HELPER_TEXT};
  display: block;
  text-align: center;
  margin-top: 10px;
  a {
    border-bottom: 2px solid ${props => props.theme.COLOR.DARK_GREY};
  }
`;

const PageWrapper = styled.div``;

const StyledHeading = styled.h2`
  ${props => props.theme.SNIPPETS.HEADING};
  margin-top: 20px;
  font-size: 30px;
  padding-bottom: 10px;
`;

export default Layout(Login);
