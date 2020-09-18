import React, { Component } from "react";
import ValidationUtils from "utils/ValidationUtils";
import { UI_STRINGS } from "utils/stringConstants";
import PostCreation from "./index";
import { get, each, keys } from "lodash";
// services
import { createPostHandler } from "./ducks";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class PostCreationPage extends Component {
  state = {
    form: {
      title: {
        value: "",
        error: "",
        label: "Title",
        type: "input",
        fieldType: "input"
      },
      description: {
        value: "",
        error: "",
        label: "Description",
        type: "textarea",
        fieldType: "input"
      },
      post: {
        value: "",
        error: "",
        label: "Show off",
        type: "file",
        id: "upload-post",
        fieldType: "image"
      }
    }
  };

  /**
   *handle validation for form fields
   * @returns {String} appropriate error message
   */
  handleValidation = (value, fieldType, field) => {
    if (ValidationUtils.checkIfEmptyField(value)) {
      return UI_STRINGS.EMPTY_FIELD_ERROR_MESSAGE;
    } else if (
      ValidationUtils.checkIfWhiteSpace(value) &&
      fieldType !== "image"
    ) {
      return UI_STRINGS.WHITE_SPACE_ERROR_MESSAGE;
    } else if (
      get(field, `label`) === "Phone Number" &&
      !ValidationUtils.validateContactNumber(value) &&
      fieldType !== "image"
    ) {
      return UI_STRINGS.VALID_CONTACT_NUMBER;
    } else if (
      get(field, `label`) === "Age" &&
      !ValidationUtils.validateNumber(value) &&
      fieldType !== "image"
    ) {
      return UI_STRINGS.VALID_NUMBER;
    }

    return null;
  };

  handleInputChange = (e, fieldName, fieldType, eachField) => {
    let error;
    if (fieldType !== "image") {
      error = this.handleValidation(e.target.value, fieldType, eachField);
    }

    let { form } = this.state;
    form[fieldName].value = fieldType === "image" ? e : e.target.value;
    form[fieldName].error = error;

    this.setState({
      form,
      isProfileEdited: true
    });
  };

  /**
   * check if form fields are valid or not
   * @returns Boolean stating whether fields are valid or not
   */
  checkIfFieldsAreValid = () => {
    let form = this.state.form;
    let isFieldValid = true;

    each(keys(form), eachField => {
      let value = get(form[eachField], `value`);

      form[eachField].error = this.handleValidation(value);

      if (form[eachField].error) {
        isFieldValid = false;
      }
    });

    this.setState({
      form
    });

    return isFieldValid;
  };

  addNewPost = async () => {
    const { form } = this.state;
    const imageFile = form["post"].value;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "picbook");
    formData.append("cloud_name", "dme7wsobn");

    const postData = {
      title: form["title"].value,
      body: form["description"].value
    };

    await this.props.createPostHandler(formData, postData);

    // refresh the current page
    this.props.history.go(0);
  };

  render() {
    const stateMethodProp = {
      ...this,
      ...this.state,
      ...this.props
    };

    return <PostCreation {...stateMethodProp} />;
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  createPostHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostCreationPage));
