import React, { Component } from "react";
import ValidationUtils from "utils/ValidationUtils";
import { UI_STRINGS } from "utils/stringConstants";
import LoginForm from "./index";
import { loginHandler } from "./ducks";
import { get, each, keys } from "lodash";
import { connect } from "react-redux";

class LoginPage extends Component {
  state = {
    form: {
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

  handleInputChange = ({ key, value }) => {
    let { form } = this.state;
    form[key].value = value;

    form[key].error = this.handleValidation(value);

    this.setState({
      form
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

  loginToAccount = async () => {
    let areFieldsValid = this.checkIfFieldsAreValid();
    if (!areFieldsValid) return;

    const { form } = this.state;

    const postData = {
      password: form.password.value,
      email: form.email.value
    };
    const response = await this.props.loginHandler(postData);
    if (get(response, `data`)) {
      localStorage.setItem("token", get(response, `data.token`));
      localStorage.setItem(
        "userDetails",
        JSON.stringify(get(response, `data.userData`))
      );
      this.props.history.push("/home");
    }
  };

  render() {
    const stateMethodProp = {
      ...this,
      ...this.state,
      ...this.props
    };

    return <LoginForm {...stateMethodProp} />;
  }
}

const mapStateToProps = state => {
  console.log(state, "state");
  return state;
};

const mapDispatchToProps = {
  loginHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
