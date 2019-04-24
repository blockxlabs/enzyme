import React, { Component } from 'react';
import PasswordAdornment from '../password-adornment';
import EnzymeInput from '../../enzyme-input';

const showColor = {
  color: 'rgba(215, 95, 160, 1)',
};

const hideColor = {
  color: 'rgba(0, 0, 0, 0.5)',
};

export default class EnzymePassword extends Component {
  state = {
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const {
      classes,
      children,
      onChange,
      isError,
      password,
      errorMessage,
      label,
      className,
      handleClickShowPassword,
      ...otherProps
    } = this.props;
    const { showPassword } = this.state;
    return (
      <div className={className}>
        <EnzymeInput
          {...otherProps}
          className={className}
          error={isError}
          type={showPassword ? 'text' : 'password'}
          label={label}
          value={password}
          onChange={onChange('password')}
          helperText={errorMessage}
          InputProps={{
            endAdornment: (
              <PasswordAdornment
                position="end"
                onClick={this.handleClickShowPassword}
                showPassword={showPassword}
                showColor={showColor}
                hideColor={hideColor}
              />
            ),
          }}
        />
      </div>
    );
  }
}
