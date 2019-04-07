import React, { Component } from 'react';
import { connect } from 'react-redux';

import extension from 'extensionizer';
import TransactionList from './transaction-list';
import DarkDivider from '../common/divider/dark-divider';

//import service
import { getTransactionDisplayList } from '../../../lib/services/transactionService';

// Import Styles
import './styles.css';

const mapStateToProps = state => ({
  currentWallet: state.wallets.currentWallet,
  transactions: state.transactions.transactions,
  currentNetwork: state.networks.currentNetwork,
});

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTransactionFetchError: false,
    };

    this.getTransactionList();
    this.viewTransaction = this.viewTransaction.bind(this);
    this.populateTransactions = this.populateTransactions.bind(this);
  }

  getTransactionList() {
    try {
      this.props.fetchTransactionList();
    } catch (error) {
      this.setState({
        isTransactionFetchError: true,
      });
    }
  }

  viewTransaction(hash) {
    extension.tabs.create({
      url: `${this.props.currentNetwork.transactionUrl}${hash}`,
    });
  }

  populateTransactions() {
    const {
      state: { isTransactionFetchError },
      props: { transactions, currentNetwork },
    } = this;
    const currentTxns = getTransactionDisplayList(transactions, currentNetwork);

    const transactionList = currentTxns && currentTxns.length > 0 ? (
      <TransactionList transactions={currentTxns} viewTransaction={this.viewTransaction} />
    ) : isTransactionFetchError ? (
      <div className="no-transaction-class">
          Transactions couldn’t be loaded. Have you tried turning it off and on again?
      </div>
    ) : (
      <div className="no-transaction-class">You don’t have any transactions yet.</div>
    );
    return transactionList;
  }

  render() {
    return (
      // TODO : Dynamic CSS with state
      <div className="transaction-container">
        <div className="wrapper">
          <div className="title-class">Transactions</div>
        </div>
        <DarkDivider
          style={{
            width: 335,
            marginLeft: 13,
            marginTop: 12.5,
            marginBottom: 14.5,
          }}
        />
        <div className="transactions-list-class">{this.populateTransactions()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Transactions);
