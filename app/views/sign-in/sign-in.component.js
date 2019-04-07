import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FontRegular from '../../components/common/fonts/font-regular';
import FontLight from '../../components/common/fonts/font-light';
import Password from '../../components/common/password';
import './styles.css';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isError: false,
      label: 'Password',
      errorText: '',
    };
  }

  handleOnChange = prop => e => {
    const { value } = e.target;
    this.setState({
      [prop]: value,
    });
  };

  handleClick = () => {
    const { unlockEnzyme } = this.props;
    const { password } = this.state;
    unlockEnzyme(password);
  };

  render() {
    const {
      isError, password, label, errorText
    } = this.state;
    return (
      <div>
        <div className="sign-in-container">
          <div className="sign-in-header-container">
            <div className="sign-in-header-title">
              <FontRegular>Enter Password</FontRegular>
            </div>
            <div className="sign-in-header-description">
              <FontLight style={{ fontSize: '12px' }}>
                The password is used to protect your Enigma seed phrase(s) so that other Chrome
                extensions can&#39;t access them.
              </FontLight>
            </div>
          </div>
          <div className="sign-in-password-container">
            <Password
              onChange={this.handleOnChange}
              isError={isError}
              password={password}
              errorMessage={isError ? errorText : null}
              label={label}
            />
          </div>
          <div className="sign-in-button">
            <Button onClick={this.handleClick}>Unlock</Button>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.defaultProps = {
  unlockEnzyme: undefined,
};

SignIn.propTypes = {
  unlockEnzyme: PropTypes.func,
};

SignIn.getDerivedStateFromProps = (props, state) => {
  let { isError, errorText } = state;
  if (props.error) {
    isError = true;
    errorText = props.error.message;
  }
  return { isError, errorText };
};
