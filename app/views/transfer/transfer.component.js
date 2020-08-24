import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import TransferForm from '../../components/transfer/transfer-form';
import * as NavConstants from '../../constants/navigation';
import { INPUT_NUMBER_REGEX } from '../../../lib/constants/regex';
import { findChainByName } from '../../../lib/constants/chain';

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    const {
      confirmDetails: { metadata },
      account,
    } = props;
    //TODO DP: Can be improved by using optional chaining operator
    this.state = {
      to: metadata ? metadata.to : '',
      amount: metadata ? metadata.amount : '',
      unit: metadata ? metadata.unit : '',
      alias: metadata ? metadata.account.alias : account.alias,
      from: metadata ? metadata.account.address : account.address,
      buttonText: 'next',
    };
    this.toInput = React.createRef();
    this.amountInput = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.unit === '') {
      return { unit: props.unit };
    }
    return state;
  }

  componentDidMount() {
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        account: this.props.account,
        unit: this.state.unit,
      },
    });
  }

  componentDidUpdate(props) {
    if (props.units === null) {
      this.props.updateAppLoading(true);
    }
    if (props.success) {
      this.props.updateAppLoading(false);
      this.props.changePage(NavConstants.CONFIRM_PAGE);
    }
    if (props.error && props.error.isError) {
      if (props.isToAddressError) {
        this.toInput.focus();
      } else {
        this.amountInput.focus();
      }
    }
  }

  handleSubheaderBackBtn = () => {
    this.props.resetConfirmOnBoarding();
    this.props.clearTransferDetails();
    this.props.changePage(NavConstants.DASHBOARD_PAGE);
  };

  handleToChange = prop => e => {
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        to: e.target.value,
      },
    });
    this.setState({
      [prop]: e.target.value,
    });
    this.props.updateToAddress(e.target.value);
  };

  handleAmountChange = prop => e => {
    if (e.target.value === '' || INPUT_NUMBER_REGEX.test(e.target.value)) {
      this.props.dispatchSetTransferDetails({
        metadata: {
          ...this.props.confirmDetails.metadata,
          amount: e.target.value,
        },
      });
      this.setState({ [prop]: e.target.value });
    }
  };

  onAddressBookClick = () => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(NavConstants.ADDRESS_BOOK_PAGE);
  };

  handleSendButton = () => {
    const { amount, unit } = this.state;
    const { toAddress } = this.props;
    if (toAddress !== '' && amount !== '') {
      this.props.confirmTransaction(toAddress, this.props.account, amount, unit);
    } else if (toAddress === '') {
      this.toInput.focus();
    } else {
      this.amountInput.focus();
    }
  };

  handleUnitChange = e => {
    const unit = this.props.units.find(u => u.value === e.target.value);
    this.props.dispatchSetTransferDetails({
      metadata: {
        ...this.props.confirmDetails.metadata,
        unit,
      },
    });
    this.setState({ unit });
  };

  render() {
    const {
      units,
      isToAddressError,
      toAddressErrorMessage,
      isAmountError,
      toAmountErrorMessage,
      toAddress,
      network,
    } = this.props;
    const {
      to, amount, unit, alias, from, buttonText
    } = this.state;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Send"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <TransferForm
          theme={theme}
          address={from}
          alias={alias}
          unit={unit}
          amountPropName="amount"
          toPropName="to"
          units={units}
          to={toAddress || to}
          toRef={input => {
            this.toInput = input;
          }}
          amountRef={input => {
            this.amountInput = input;
          }}
          amount={amount}
          buttonText={buttonText}
          isToError={isToAddressError}
          toErrorText={toAddressErrorMessage}
          isAmountError={isAmountError}
          amountErrorText={toAmountErrorMessage}
          handleAmountChange={this.handleAmountChange}
          handleToChange={this.handleToChange}
          handleSendButton={this.handleSendButton}
          handleUnitOnChange={this.handleUnitChange}
          onAddressBookClick={this.onAddressBookClick}
        />
      </div>
    );
  }
}

Transfer.defaultProps = {
  changePage: undefined,
  account: undefined,
};

Transfer.propTypes = {
  changePage: PropTypes.func,
  account: PropTypes.object,
};
