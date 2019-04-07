import React, { Component } from 'react';
import zxcvbn from 'zxcvbn';
import Button from '@material-ui/core/Button';
import FontRegular from '../../components/common/fonts/font-regular';
import FontLight from '../../components/common/fonts/font-light';
import Password from '../../components/common/password';
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
      score: 0,
      errorText: '',
    };
    this.passwordInput = React.createRef();
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    const { password } = this.state;
    let { score, isError } = this.state;
    const result = zxcvbn(value);
    ({ score } = result);
    if (isError && password && password.length >= 8) {
      isError = false;
    }
    this.setState({
      [prop]: value,
      score,
      isError,
    });
  };

  handleOnBlur = () => {
    const { password } = this.state;
    let { errorText } = this.state;
    let isError = false;
    this.passwordInput.focus();
    if (password && password.length < 8) {
      isError = true;
      errorText = errorMessage;
    } else {
      this.passwordInput.blur();
    }
    this.setState({ isError, errorText });
  };

  handleClick = () => {
    const { signUp } = this.props;
    const { password } = this.state;
    let { errorText } = this.state;
    let isError = false;
    if (password.length === 0) {
      isError = true;
      errorText = requiredErrorMessage;
    } else if (password.length < 8) {
      isError = true;
      errorText = errorMessage;
    } else {
      signUp(password);
    }
    this.setState({ isError, errorText });
  };

  render() {
    const {
      isError, score, password, label, errorText
    } = this.state;
    return (
      <div>
        <div className="sign-up-container">
          <div className="sign-up-header-container">
            <div className="sign-up-header-title">
              <FontRegular>Create a password to secure your account</FontRegular>
            </div>
            <div className="sign-up-header-description">
              <FontLight style={{ fontSize: '12px' }}>
                The password is used to protect your Enigma seed phrase(s) so that other Chrome
                extensions can&#39;t access them.
              </FontLight>
            </div>
          </div>
          <div className="sign-up-create-password-container">
            <Password
              onChange={this.handleOnChange}
              isError={isError}
              onBlur={this.handleOnBlur}
              inputRef={input => {
                this.passwordInput = input;
              }}
              password={password}
              errorMessage={isError ? errorText : null}
              label={label}
            >
              <div className="sign-up-password-meter">
                <FontRegular>
                  Password strength
                  <meter max="4" value={score} min="0" />
                </FontRegular>
              </div>
            </Password>
          </div>
          <div className="sign-up-create-button">
            <Button onClick={this.handleClick}>Create</Button>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.defaultProps = {};

SignUp.propTypes = {};
