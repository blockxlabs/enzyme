import React, { Component } from 'react';
import RequestType from '../request-type';
import SendToFrom from '../send-to-from';
import WalletExpansionPanel from '../../common/wallet-expansion-panel';
import FontRegular from '../../common/fonts/font-regular';
import FooterTwoSMButton from '../../common/footer-two-sm-button';
import TransactionUI from '../transaction-ui';
import './styles.css';
import DarkDivider from '../../common/divider/dark-divider';
import ClickToCopy from '../../common/click-to-copy';

const Summary = props => (
  <div className={props.className}>
    <RequestType type="Send" className="send-summary-request-type" />
    <SendToFrom
      toAccount={props.toAccount}
      fromAccount={props.fromAccount}
      onCopyAddress={props.onCopyAddress}
      className="send-summary-send-to-from"
    />
  </div>
);

const SignedMessage = props => (
  <div className={props.className}>
    <DarkDivider style={{ width: '100%' }} />
    <div className="send-data-container">
      <div>
        <FontRegular text="Data" className="send-data-label" />
      </div>
      <div>
        <ClickToCopy
          className="send-data clickable-icon"
          text={props.data}
          value={props.data}
          onCopy={props.onCopyData}
        />
      </div>
    </div>
    <DarkDivider style={{ width: '100%' }} />
  </div>
);
export default class Send extends Component {
  render() {
    const {
      fromAccount,
      toAccount,
      onCopyAddress,
      isSendExpanded,
      handleSendExpansion,
      handleInfoExpansion,
      isInfoExpanded,
      amount,
      onCancel,
      onAllow,
      errorMessage,
      txnUi,
      data,
      onCopyData,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <WalletExpansionPanel
          isBelowExpandIcon
          expanded={isSendExpanded}
          handleChange={handleSendExpansion}
          summary={(
            <Summary
              className="send-summary-container"
              onCopyAddress={onCopyAddress}
              fromAccount={fromAccount}
              toAccount={toAccount}
            />
          )}
        >
          {data && (
            <SignedMessage className="sign-message-body" data={data} onCopyData={onCopyData} />
          )}

          {txnUi && (
            <TransactionUI
              txnUi={txnUi}
              isInfoExpanded={isInfoExpanded}
              handleInfoExpansion={handleInfoExpansion}
              className="send-txn"
            />
          )}

          <FooterTwoSMButton
            className="send-footer-container"
            namePrimary="cancel"
            nameSecondary="allow"
            onClickPrimary={onCancel}
            onClickSecondary={onAllow}
            isSecondaryDisabled={!!errorMessage}
          />
          {errorMessage && <FontRegular text={errorMessage} className="send-error" />}
        </WalletExpansionPanel>
      </div>
    );
  }
}
