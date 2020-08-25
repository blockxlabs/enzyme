import React, { Component } from 'react';
import SubHeader from '../../components/common/sub-header';
import * as RequestType from '../../../lib/constants/request-types';
import Send from '../../components/dapp/send';
import SignMessage from '../../components/dapp/sign-message';
import {
  copyAccountMessage,
  copyDataMessage,
} from '../../../lib/services/static-message-factory-service';
import { createAccountObject, createTxnUI } from '../../services/wallet-service';
import './styles.css';

export default class DAppRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestId: '',
      isInfoExpanded: false,
    };
  }

  componentDidMount() {
    this.props.fetchNetwork();
  }

  onCopyAddress = () => {
    this.props.createToast({
      message: copyAccountMessage(),
      type: 'info',
    });
  };

  onCopyData = () => {
    this.props.createToast({
      message: copyDataMessage(),
      type: 'info',
    });
  };

  handleExpansion = id => () => {
    const { requestId } = this.state;

    this.setState({ requestId: requestId === id ? '' : id });
  };

  handleInfoExpansion = () => {
    const { isInfoExpanded } = this.state;
    this.setState({ isInfoExpanded: !isInfoExpanded });
  };

  handleAllow = request => () => {
    this.props.allowRequest(request);
    this.props.updateAppLoading(true);
  };

  handleCancel = request => () => {
    this.props.cancelDAppRequest(request);
  };

  renderRequests() {
    const { requests, accounts, balances } = this.props;
    // Use for toggle
    const { isInfoExpanded } = this.state;
    return (
      <div className="dapp-requests-container">
        {requests.map(request => {
          switch (request.request.requestType) {
            case RequestType.SEND:
              return (
                <Send
                  isSendExpanded
                  fromAccount={request.result.account}
                  toAccount={
                    request.result.txnForUI.dest
                      ? request.result.txnForUI
                        && createAccountObject(accounts, request.result.txnForUI.dest)
                      : null
                  }
                  onCopyAddress={this.onCopyAddress}
                  handleSendExpansion={this.handleExpansion(request.id)}
                  handleInfoExpansion={this.handleInfoExpansion}
                  isInfoExpanded={isInfoExpanded}
                  txnUi={createTxnUI(request.result.txnForUI)}
                  errorMessage={
                    request.result.isError && request.result.isAmountError
                      ? request.result.toAmountErrorMessage
                      : request.result.isToAddressError
                        ? request.result.toAddressErrorMessage
                        : null
                  }
                  onCopyData={this.onCopyData}
                  onCancel={this.handleCancel(request)}
                  onAllow={this.handleAllow(request)}
                  className="dapp-requests-card"
                  key={request.id}
                />
              );
            case RequestType.SIGN_MESSAGE:
              return (
                <SignMessage
                  isSignMessageExpanded
                  account={request.result.account}
                  balance={balances.find(
                    balance => balance.address === request.result.account.address,
                  )}
                  onCopyAddress={this.onCopyAddress}
                  handleSignMessageExpansion={this.handleExpansion(request.id)}
                  onCancel={this.handleCancel(request)}
                  onAllow={this.handleAllow(request)}
                  errorMessage={null}
                  data={request.result.message.message}
                  key={request.id}
                  onCopyData={this.onCopyData}
                  className="dapp-requests-card"
                />
              );
            default:
              return <div key={request.id} />;
          }
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <SubHeader title="Pending Requests" />
        {this.props.requests && this.renderRequests()}
      </div>
    );
  }
}
