import React, { Component } from 'react';
import TokenDetails from '../../components/token/token-details';
import Wallet from '../../components/wallet';
import { TRANSFER_PAGE } from '../../constants/navigation';
import Transaction from '../../components/transaction/transaction';
import { copyAccountMessage } from '../../services/static-message-factory-service';
import './styles.css';

export default class Dashboard extends Component {
  handleSend = () => {
    this.props.changePage(TRANSFER_PAGE);
  };

  handleDeposit = () => {
    // TODO: DP: Code for receive navigate page
  };

  onCopyAddress = () => {
    this.props.createToast({
      message: copyAccountMessage(),
      type: 'info',
    });
  };

  render() {
    const {
      accounts, account, balances, balance, transactions
    } = this.props;
    return (
      <div>
        <Wallet
          className="wallet-container"
          accounts={accounts}
          balances={balances}
          balance={balance}
          selectedAccount={account}
          theme="polkadot"
          onCopyAddress={this.onCopyAddress}
        />
        <TokenDetails
          className="token-container"
          balance={balance}
          handleSend={this.handleSend}
          handleDeposit={this.handleDeposit}
        />
        <Transaction className="transaction-container" transactions={transactions} />
      </div>
    );
  }
}
