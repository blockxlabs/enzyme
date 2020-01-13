import React, { Component } from 'react';
import FontRegular from '../../common/fonts/font-regular';
import ClickToCopyAddress from '../../common/click-to-copy-address';
import EnzymeInput from '../../common/enzyme-input';
import './styles.css';

export default class AccountDetails extends Component {
  render() {
    const {
      alias,
      onCopyAddress,
      address,
      editMode,
      onAliasChange,
      aliasValue,
      onAliasInputBlur,
      onAliasInputKeyPress,
      fontSize,
      inputRef,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {!editMode && (
          <FontRegular className="account-alias" text={alias} style={fontSize && { fontSize }} />
        )}
        {editMode && (
          <EnzymeInput
            inputRef={inputRef}
            value={aliasValue}
            className="account-input"
            inputStyles={{ style: { padding: '1px 1px 1px 2px' } }}
            onBlur={onAliasInputBlur}
            onChange={onAliasChange}
            onKeyPress={onAliasInputKeyPress}
            withWhiteColor
          />
        )}
        {!editMode && (
          <ClickToCopyAddress
            className="account-address clickable-icon"
            onCopyAddress={onCopyAddress}
            address={address}
          />
        )}
      </div>
    );
  }
}
