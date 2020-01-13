import React, { Component } from 'react';
import EnzymeInputAdornment from '../../common/enzyme-input-adornment';
import IconContainer from '../../common/icon-container';
import { AddressBook } from '../../common/icon';

export default class AddressBookAdornment extends Component {
  render() {
    const { onClick, ...otherProps } = this.props;
    return (
      <EnzymeInputAdornment {...otherProps}>
        <IconContainer aria-label="Toggle password visibility" onClick={onClick}>
          <AddressBook />
        </IconContainer>
      </EnzymeInputAdornment>
    );
  }
}
