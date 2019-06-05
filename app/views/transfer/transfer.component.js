import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import TransferForm from '../../components/transfer/transfer-form';
import { DASHBOARD_PAGE, CONFIRM_PAGE } from '../../constants/navigation';
import { INPUT_NUMBER_REGEX } from '../../../lib/constants/regex';

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
      unit: metadata ? metadata.unit : props.units[5],
      alias: metadata ? metadata.account.alias : account.alias,
      from: metadata ? metadata.account.address : account.address,
      buttonText: 'next',
    };
    this.toInput = React.createRef();
    this.amountInput = React.createRef();
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
    if (props.success) {
      this.props.updateAppLoading(false);
      this.props.changePage(CONFIRM_PAGE);
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
    this.props.changePage(DASHBOARD_PAGE);
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

  handleSendButton = () => {
    const { to, amount, unit } = this.state;
    if (to !== '' && amount !== '') {
      this.props.confirmTransaction(to, this.props.account, amount, unit);
    } else if (to === '') {
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
    } = this.props;
    const {
      to, amount, unit, alias, from, buttonText
    } = this.state;
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Send"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <TransferForm
          address={from}
          alias={alias}
          unit={unit}
          amountPropName="amount"
          toPropName="to"
          units={units}
          to={to}
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
