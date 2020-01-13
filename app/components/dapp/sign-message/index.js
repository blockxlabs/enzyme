import React, { Component } from 'react';
import RequestType from '../request-type';
import WalletExpansionPanel from '../../common/wallet-expansion-panel';
import FontRegular from '../../common/fonts/font-regular';
import FooterTwoSMButton from '../../common/footer-two-sm-button';
import Disclaimer from '../disclaimer';
import AccountItem from '../../account/account-item';
import DarkDivider from '../../common/divider/dark-divider';
import './styles.css';
import ClickToCopy from '../../common/click-to-copy';

const Summary = props => (
  <div className={props.className}>
    <RequestType
      type="Sign"
      blockchain={props.blockchain}
      className="sign-message-summary-request-type"
    />
    <AccountItem
      className="sign-message-summary-account-item"
      account={props.account}
      balance={props.balance}
      onCopyAddress={props.onCopyAddress}
    />
  </div>
);

const SignedMessage = props => (
  <div className={props.className}>
    <DarkDivider style={{ width: '100%' }} />
    <ClickToCopy
      className="signedmessage-data clickable-icon"
      text={props.data}
      value={props.data}
      onCopy={props.onCopyData}
    />
    <DarkDivider style={{ width: '100%' }} />
  </div>
);

export default class SignMessage extends Component {
  render() {
    const {
      isSignMessageExpanded,
      handleSignMessageExpansion,
      onCopyAddress,
      account,
      balance,
      onCancel,
      onAllow,
      errorMessage,
      data,
      onCopyData,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <WalletExpansionPanel
          isBelowExpandIcon
          expanded={isSignMessageExpanded}
          handleChange={handleSignMessageExpansion}
          summary={(
            <Summary
              className="sign-message-summary-container"
              account={account}
              balance={balance}
              onCopyAddress={onCopyAddress}
            />
          )}
        >
          <Disclaimer
            className="sign-message-disclaimer"
            notice="Signing can provide access to the value of your account. Only sign this if you know and trust the requesting source."
          />
          <FontRegular className="sign-message-title" text="Message" />
          <SignedMessage className="sign-message-body" data={data} onCopyData={onCopyData} />
          <FooterTwoSMButton
            className="sign-message-footer-container"
            namePrimary="cancel"
            nameSecondary="sign"
            onClickPrimary={onCancel}
            onClickSecondary={onAllow}
            isSecondaryDisabled={!!errorMessage}
          />
        </WalletExpansionPanel>
      </div>
    );
  }
}
