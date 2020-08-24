import React, { Component } from 'react';
import TokenDetails from '../../components/token/token-details';
import Wallet from '../../components/wallet';
import { TRANSFER_PAGE, QR_CODE_PAGE } from '../../constants/navigation';
import Transaction from '../../components/transaction/transaction';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import './styles.css';
import { RENAME } from '../../constants/options';
import { findChainByName } from '../../../lib/constants/chain';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleSend = () => {
    if (!this.props.isConnected) {
      this.props.connectionError();
    } else {
      this.props.getUnits();
      this.props.resetToAddress();
      this.props.changePage(TRANSFER_PAGE);
    }
  };

  handleDeposit = () => {
    this.props.changePage(QR_CODE_PAGE);
  };

  // eslint-disable-next-line no-unused-vars
  handleAccountMenuOptionsChange = async (option, account, transactionsUrl) => {
    await this.props.configEditAccount(option, account, transactionsUrl);
    if (option.value === RENAME.value) {
      this.textInput.current.focus();
      this.textInput.current.maxLength = 20;
    }
  };

  handleAliasChange = (value, account) => {
    this.props.configAliasAccount(value, account);
  };

  handleAliasInputBlur = account => {
    this.props.renameAlias(account);
  };

  handleOnKeyPress = (e, account) => {
    if (e.key === 'Enter') {
      this.props.renameAlias(account);
    }
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
      balance: { balanceFormatted, marketData, amount },
      isLinkToFaucet,
      network,
      unit,
      accountMenu,
    } = this.props;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div>
        <Wallet
          className="wallet-container"
          inputRef={this.textInput}
          accounts={accounts}
          balances={balances}
          balance={balanceFormatted}
          selectedAccount={account}
          theme={theme}
          onAliasChange={this.handleAliasChange}
          onAliasInputBlur={this.handleAliasInputBlur}
          onAliasInputKeyPress={this.handleOnKeyPress}
          onCopyAddress={this.onCopyAddress}
          accountMenu={accountMenu}
          onAccountMenuOptionsChange={this.handleAccountMenuOptionsChange}
        />
        <TokenDetails
          unit={network.unit !== undefined ? network.unit : unit !== undefined ? unit.text : ''}
          className="token-container"
          balance={balanceFormatted}
          marketData={marketData && marketData}
          amount={amount}
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
