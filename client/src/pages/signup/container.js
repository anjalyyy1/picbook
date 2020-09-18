import React, { Component } from "react";
import ValidationUtils from "utils/ValidationUtils";
import { UI_STRINGS } from "utils/stringConstants";
import SignupForm from "./index";
import { get, each, keys } from "lodash";

//services
import { createAccount } from "./services";

class SignupPage extends Component {
  state = {
    form: {
      name: {
        value: "",
        error: "",
        label: "Name",
        type: "input"
      },
      email: { value: "", error: "", label: "Email", type: "input" },
      password: { value: "", error: "", label: "Password", type: "password" }
    }
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/home");
    }
  }

  handleValidation = value => {
    if (ValidationUtils.checkIfEmptyField(value)) {
      return UI_STRINGS.EMPTY_FIELD_ERROR_MESSAGE;
    } else if (ValidationUtils.checkIfWhiteSpace(value)) {
      return UI_STRINGS.WHITE_SPACE_ERROR_MESSAGE;
    } else if (ValidationUtils.checkIfspecialChar(value)) {
      return UI_STRINGS.WHITE_SPACE_ERROR_MESSAGE;
    }

    return null;
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
      console.log(value, "value");

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

  handleInputChange = ({ key, value }) => {
    let { form } = this.state;
    form[key].value = value;

    form[key].error = this.handleValidation(value);

    this.setState({
      form
    });
  };

  createAccountHandler = async () => {
    let areFieldsValid = this.checkIfFieldsAreValid();
    if (!areFieldsValid) return;

    const { form } = this.state;

    const postData = {
      name: form.name.value,
      password: form.password.value,
      email: form.email.value
    };
    createAccount(postData);
  };

  render() {
    const stateMethodProp = {
      ...this,
      ...this.state,
      ...this.props
    };

    return <SignupForm {...stateMethodProp} />;
  }
}

export default SignupPage;
