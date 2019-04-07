import React, { Component } from 'react';

//Import Libraries
import { connect } from 'react-redux';

//Import Actions
import { changePageStatus } from '../../../constants/common';

//Import common Components
import ConfirmView from '../confirm-view';

//Import constants
import { createToast } from '../../../constants/toast';

function mapStateToProps(state) {
  return {
    pageStatus: state.appState.pageStatus,
    currentWallet: state.wallets.currentWallet,
    currentWalletBalance: state.wallets.currentWalletBalance,
    transactionDetails: state.transactions.transactionDetails,
    currentNetwork: state.networks.currentNetwork,
    selectedToken: state.tokens.selectedToken,
    toastOptions: state.toast.toastOptions,
  };
}

class ConfirmPageContainer extends Component {
  render() {
    const {
      SendTransaction,
      fromAlias,
      from,
      toAlias,
      to,
      value,
      symbol,
      ccyValue,
      ccy,
      validation,
      selectedToken,
      nrgType,
      nrgPrice,
      nrgLimit,
      hexData,
    } = this.props;
    return (
      <div>
        <ConfirmView
          SendTransaction={SendTransaction}
          fromAlias={fromAlias}
          from={from}
          toAlias={toAlias}
          to={to}
          value={value}
          symbol={symbol}
          ccyValue={ccyValue}
          ccy={ccy}
          validation={validation}
          selectedToken={selectedToken}
          nrgType={nrgType}
          nrgPrice={nrgPrice}
          nrgLimit={nrgLimit}
          hexData={hexData}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    createToast: toastOptions => dispatch(createToast(toastOptions)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmPageContainer);
