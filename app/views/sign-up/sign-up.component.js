import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EnzymePassword from '../../components/common/password/enzyme-password';
import ContentHeader from '../../components/common/content-header';
import PasswordStrength from '../../components/common/password/password-strength';
import FooterButton from '../../components/common/footer-button';
import './styles.css';

const errorMessage = 'Must be 8 characters or more in length.';
const requiredErrorMessage = 'Password required';
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isError: false,
      label: 'Password',
      errorText: '',
    };
    this.passwordInput = React.createRef();
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    const { password } = this.state;
    let { isError } = this.state;

    this.props.setPasswordMeterScore(value);

    if (isError && password && password.length >= 8) {
      isError = false;
    }
    this.setState({
      [prop]: value,
      isError,
    });
  };

  handleOnBlur = () => {
    const { password } = this.state;
    let { errorText } = this.state;
    let isError = false;
    if (password !== '') {
      this.passwordInput.focus();
    }
    if (password && password.length < 8) {
      isError = true;
      errorText = errorMessage;
    }
    this.setState({ isError, errorText });
  };

  handleClick = () => {
    const { signUp } = this.props;
    const { password, type } = this.state;
    let { errorText } = this.state;
    let isError = false;
    if (password.length === 0) {
      isError = true;
      errorText = requiredErrorMessage;
    } else if (password.length < 8) {
      isError = true;
      errorText = errorMessage;
    } else {
      signUp(password, type);
    }
    this.setState({ isError, errorText });
  };

  render() {
    const { score } = this.props;
    const {
      isError, password, label, errorText
    } = this.state;
    return (
      <div className="sign-up-container">
        <ContentHeader
          className="sign-up-content-header"
          title="Create a password to secure your account"
          description="The password is used to protect your Enigma seed phrase(s) so that other Chrome extensions can't access them."
        />
        <EnzymePassword
          className="sign-up-password"
          onChange={this.handleOnChange}
          isError={isError}
          onBlur={this.handleOnBlur}
          inputRef={input => {
            this.passwordInput = input;
          }}
          password={password}
          errorMessage={isError ? errorText : null}
          label={label}
          handleClickShowPassword={this.handleClickShowPassword}
        />
        <PasswordStrength
          className="sign-up-password-meter"
          title="Password Strength"
          max="4"
          score={score}
          min="0"
        />
        <FooterButton onClick={this.handleClick} name="create" />
      </div>
    );
  }
}

SignUp.defaultProps = {
  signUp: undefined,
  setPasswordMeterScore: undefined,
  score: 0,
};

SignUp.propTypes = {
  signUp: PropTypes.func,
  setPasswordMeterScore: PropTypes.func,
  score: PropTypes.number,
};
