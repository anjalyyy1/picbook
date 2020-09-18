import React from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";

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
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ImageUpload from "components/ImageUpload";

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
    marginTop: "55px",
    padding: "25px"
  },
  formControl: {
    display: "block",
    width: "100%",
    marginBottom: "50px"
  },
  inputLabel: {
    width: "100%",
    marginBottom: "30px"
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
  },
  browseButton: {
    backgroundColor: "#01ffb9",
    color: "#fff",
    fontWeight: "bold",
    display: "block",
    "&:hover": {
      opacity: 0.9
    }
  },
  fileInput: {
    display: "none"
  }
});

const PostCreation = props => {
  const classes = useStyles(props);
  const { open, handleClose, form, handleInputChange, addNewPost } = props;
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <ModalWrapper>
          {map(keys(form), (eachField, index) => {
            let { type } = form[eachField];

            const formField = (
              <>
                {type === "input" && (
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
                      className={
                        type === "input" ? classes.inputBox : classes.fileInput
                      }
                      value={get(form[eachField], `value`)}
                      id={get(form[eachField], `id`)}
                      onChange={e =>
                        handleInputChange(
                          e,
                          eachField,
                          get(form[eachField], `type`),
                          eachField
                        )
                      }
                      accept=".xls, .xlsx, .xlsm"
                      aria-describedby="component-error-text"
                    />
                    <FormHelperText id="component-error-text">
                      {get(form[eachField], `error`)}
                    </FormHelperText>
                  </FormControl>
                )}
                {type === "file" && (
                  <ImageUpload
                    {...props}
                    handleInputChange={handleInputChange}
                    fieldIndex={eachField}
                    imageDetail={get(form[eachField], `value`)}
                  />
                )}
                {type === "textarea" && (
                  <FormControl
                    className={classes.formControl}
                    error={!!get(form[eachField], `error`)}
                  >
                    <TextareaAutosize
                      placeholder="Your description here..."
                      onChange={e =>
                        handleInputChange(
                          e,
                          eachField,
                          get(form[eachField], `type`),
                          eachField
                        )
                      }
                      rowsMin={4}
                      className={classes.inputBox}
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
            onClick={addNewPost}
          >
            Create Post
          </Button>
        </ModalWrapper>
      </Modal>
    </>
  );
};

const ModalWrapper = styled.div`
  background: ${props => props.theme.COLOR.WHITE};
  min-width: 600px;
  position: fixed;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default PostCreation;
