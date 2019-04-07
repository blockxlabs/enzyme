import React, { Component } from 'react';
import moment from 'moment';
import TransactionItem from './transaction-item';
import DarkDivider from '../common/divider/dark-divider';

class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: this.props.transactions,
    };
  }

  componentDidMount() {
    this.updateTransactionsTime();
    this.interval = setInterval(() => {
      this.updateTransactionsTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTransactionsTime() {
    const { transactions } = this.props;
    const transactionsWithModifiedTime = transactions.map(txn => {
      const date2 = moment(txn.confirmTimeStamp);
      let modifiedTime;
      const date1 = moment(new Date());
      const duration = moment.duration(date1.diff(date2));
      const seconds = Math.round(duration.asSeconds());
      if (seconds >= 1) {
        if (seconds === 1) {
          modifiedTime = 'a second ago';
        } else if (seconds < 60) {
          modifiedTime = `${seconds} seconds ago`;
        } else if (seconds < 3600) {
          const minutes = Math.round(seconds / 60);
          if (minutes === 1) {
            modifiedTime = 'a minute ago';
          } else {
            modifiedTime = `${minutes} minutes ago`;
          }
        } else if (seconds < 86400) {
          const hours = Math.round(seconds / 3600);
          if (hours === 1) {
            modifiedTime = 'an hour ago';
          } else {
            modifiedTime = `${hours} hours ago`;
          }
        } else if (seconds < 172800) {
          modifiedTime = 'a day ago';
        } else {
          modifiedTime = moment(txn.confirmTimeStamp).format('MMMM DD,YYYY');
        }
      } else {
        modifiedTime = 'just now';
      }
      txn.modifiedTime = modifiedTime;
      return txn;
    });
    this.setState({ transactions: transactionsWithModifiedTime });
  }

  render() {
    const transactions = this.state.transactions.map(
      ({
        hash,
        confirmTimeStamp,
        value,
        USD,
        status,
        to,
        selectedToken,
        isClickable,
        modifiedTime,
      }) => (
        <div key={hash}>
          <TransactionItem
            key={confirmTimeStamp}
            hash={hash}
            value={value}
            usdValue={USD}
            status={status}
            to={to}
            time={confirmTimeStamp}
            viewTransaction={this.props.viewTransaction}
            selectedToken={selectedToken}
            isClickable={isClickable}
            modifiedTime={modifiedTime}
          />
          <DarkDivider
            style={{
              marginLeft: 12.5,
              width: 335,
              marginTop: 16.5,
              marginBottom: 20.5,
            }}
          />
        </div>
      ),
    );
    return <div>{transactions}</div>;
  }
}

export default TransactionList;
