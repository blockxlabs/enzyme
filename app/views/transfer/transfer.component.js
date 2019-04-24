import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import TransferForm from '../../components/transfer/transfer-form';
import { DASHBOARD_PAGE, CONFIRM_PAGE } from '../../constants/navigation';
import { INPUT_NUMBER_REGEX } from '../../../lib/constants/regex';
import EnzymeValidator from '../../utils/enzyme-validator';
import validator from '../../utils/enzyme-validator/validator';
import { units } from '../../../lib/constants/units';

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    const {
      transferDetails: { metadata },
    } = props;
    //TODO DP: Can be improved by using optional chaining operator
    this.state = {
      to: metadata ? metadata.to : '',
      amount: metadata ? metadata.value : '',
      unit: metadata ? metadata.unit : units[8],
      isAddressEncoded: !!metadata,
      isToError: false,
      toErrorText: '',
      isAmountError: false,
      amountErrorText: '',
      buttonText: 'next',
    };
    this.toValidator = new EnzymeValidator(validator.addressValidation);
    this.amountValidator = new EnzymeValidator(validator.amountValidation);
    this.toInput = React.createRef();
    this.amountInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.transferAmount !== prevProps.transferAmount) {
      const validation = this.amountValidator.validate({
        transferFee: this.props.transferFee,
        balance: this.props.balance,
        amount: this.props.transferAmount,
      });
      if (!validation.isValid) {
        this.amountInput.focus();
        this.setAmountState({
          isAmountError: true,
          amountErrorText: validation.amount.message,
        });
      } else {
        this.setAmountState({
          isAmountError: false,
          amountErrorText: null,
        });
      }
    }

    if (this.props.transferDetails !== prevProps.transferDetails) {
      this.props.changePage(CONFIRM_PAGE);
    }
  }

  setAmountState = state => {
    this.setState(state);
  };

  handleSubheaderBackBtn = () => {
    this.props.clearTransferDetails();
    this.props.changePage(DASHBOARD_PAGE);
  };

  handleToChange = prop => e => {
    const { value } = e.target;
    let { isAddressEncoded } = this.state;
    const validation = this.toValidator.validate({ to: value });
    isAddressEncoded = validation.isValid;
    if (isAddressEncoded) {
      this.props.setTransferFee(value);
    }
    this.setState({
      [prop]: value,
      isAddressEncoded,
      isToError: false,
      toErrorText: '',
    });
  };

  handleAmountChange = prop => e => {
    if (e.target.value === '' || INPUT_NUMBER_REGEX.test(e.target.value)) {
      this.setState({ [prop]: e.target.value });
    }
  };

  handleSendButton = () => {
    const { account, setTransferAmount } = this.props;
    const { to, amount, unit } = this.state;
    const { isToError, isAmountError } = this.state;
    if (to !== '' && amount !== '' && !isToError && !isAmountError) {
      setTransferAmount(amount, unit);
      this.props.setTransferDetails({
        from: account.address,
        to,
        value: amount,
        unit,
        alias: account.alias,
      });
    }
  };

  handleUnitChange = e => {
    const { amount } = this.state;
    const unit = units.find(u => u.value === e.target.value);
    if (amount !== '') {
      const { setTransferAmount } = this.props;
      setTransferAmount(amount, unit);
    }
    this.setState({ unit });
  };

  onBlur = e => {
    const { name } = e.target;
    const { to, amount, unit } = this.state;
    let {
      isToError, toErrorText, isAmountError, amountErrorText
    } = this.state;
    const { setTransferAmount } = this.props;
    if (name === 'to' && to !== '') {
      const validation = this.toValidator.validate({ to });
      if (!validation.isValid) {
        this.toInput.focus();
        isToError = true;
        toErrorText = 'Invalid Address';
      }
    } else {
      isToError = false;
      toErrorText = '';
    }

    if (name === 'amount' && amount !== '') {
      setTransferAmount(amount, unit);
    } else {
      isAmountError = false;
      amountErrorText = '';
    }
    this.setState({
      isToError,
      toErrorText,
      isAmountError,
      amountErrorText,
    });
  };

  render() {
    const { account } = this.props;
    const {
      to,
      amount,
      unit,
      buttonText,
      isToError,
      toErrorText,
      isAmountError,
      amountErrorText,
    } = this.state;
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Send"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <TransferForm
          address={account.address}
          alias={account.alias}
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
          isToError={isToError}
          toErrorText={toErrorText}
          isAmountError={isAmountError}
          amountErrorText={amountErrorText}
          handleAmountChange={this.handleAmountChange}
          handleToChange={this.handleToChange}
          handleSendButton={this.handleSendButton}
          handleUnitOnChange={this.handleUnitChange}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

Transfer.defaultProps = {
  changePage: undefined,
  account: undefined,
  setTransferAmount: undefined,
  setTransferFee: undefined,
};

Transfer.propTypes = {
  changePage: PropTypes.func,
  account: PropTypes.object,
  setTransferAmount: PropTypes.func,
  setTransferFee: PropTypes.func,
};
