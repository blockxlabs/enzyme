import React, { Component } from 'react';
import TokenDetails from '../../components/token/token-details';
import Wallet from '../../components/wallet';
import { TRANSFER_PAGE, QR_CODE_PAGE } from '../../constants/navigation';
import Transaction from '../../components/transaction/transaction';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import './styles.css';

export default class Dashboard extends Component {
  handleSend = () => {
    this.props.changePage(TRANSFER_PAGE);
  };

  handleDeposit = () => {
    this.props.changePage(QR_CODE_PAGE);
  };

  onCopyAddress = () => {
    this.props.createToast({
      message: copyAccountMessage(),
      type: 'info',
    });
  };

  render() {
    const {
      accounts,
      account,
      balances,
      transactions,
      balance: { balanceFormatted },
      isLinkToFaucet,
      network,
    } = this.props;

    return (
      <div>
        <Wallet
          className="wallet-container"
          accounts={accounts}
          balances={balances}
          balance={balanceFormatted}
          selectedAccount={account}
          theme="polkadot"
          onCopyAddress={this.onCopyAddress}
        />
        <TokenDetails
          className="token-container"
          balance={balanceFormatted}
          handleSend={this.handleSend}
          handleDeposit={this.handleDeposit}
        />
        <Transaction
          className="transaction-container"
          network={network}
          isLinkToFaucet={isLinkToFaucet}
          transactions={transactions}
        />
      </div>
    );
  }
}
