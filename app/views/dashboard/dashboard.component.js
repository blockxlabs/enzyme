import React, { Component } from 'react';
import Animated from 'animated/lib/targets/react-dom';
import TokenDetails from '../../components/token-details';
import Wallet from '../../components/wallet';

import './styles.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardWidth: new Animated.Value(360),
    };
  }

  componentDidMount() {}

  render() {
    const {
      accounts, account, balance, selectedAccountBalance
    } = this.props;
    return (
      <div>
        <Wallet accounts={accounts} balance={balance} selectedAccount={account} />
        <div className="wallet-home-page-dashboard-container">
          <Animated.div style={{ overflow: 'hidden', width: this.state.dashboardWidth }}>
            <div className="wallet-home-page-dashboard-token-details-transaction">
              <div className="wallet-home-page">
                <TokenDetails balance={selectedAccountBalance} />
              </div>
            </div>
          </Animated.div>
        </div>
      </div>
    );
  }
}
