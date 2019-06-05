import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EnzymePassword from '../../components/common/password/enzyme-password';
import ContentHeader from '../../components/common/content-header';
import FooterButton from '../../components/common/footer-button';
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

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      return { isError: true, errorText: props.error.message };
    }
    return state;
  }

  componentDidUpdate() {
    if (this.props.success) {
      this.props.onBoard();
    }
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
          <ContentHeader
            title="Enter Password"
            description="The password is used to protect your Enigma seed phrase(s) so that other Chrome extensions can't access them."
          />
          <EnzymePassword
            className="sign-in-password-container"
            onChange={this.handleOnChange}
            isError={isError}
            password={password}
            errorMessage={isError ? errorText : null}
            label={label}
          />
          <FooterButton onClick={this.handleClick} name="unlock" />
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
