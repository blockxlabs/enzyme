import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import CreateContactForm from '../../components/address-book/create-contact-form';
import EnzymeValidator from '../../utils/enzyme-validator';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import validator from '../../utils/enzyme-validator/validator';
import './styles.css';
import { findChainByName } from '../../../lib/constants/chain';

const FnameRequiredErrorMessage = 'Firstname required';
const AddressRequiredErrorMessage = 'Address required';

export default class CreateAddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isAddressError: false,
      addressErrorMessage: '',
      addressPropName: 'address',
      fnamePropName: 'fname',
      fname: '',
      fnameLabel: 'Firstname',
      isFnameError: false,
      fnameErrorMessage: '',
      lnamePropName: 'lname',
      lname: '',
      lnameLabel: 'Lastname',
      buttonText: 'Submit',
      network: '',
    };
    this.lnameValidator = new EnzymeValidator(validator.lnameValidation);
    this.fnameValidator = new EnzymeValidator(validator.fnameValidation);
    this.addressInputRef = React.createRef();
    this.fnameInputRef = React.createRef();
    this.lnameInputRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.address === '') return { network: props.network, address: props.toAddress };
    return state;
  }

  onSubmit = () => {
    const {
      address, fname, lname, network
    } = this.state;
    const { isFnameError, fnameErrorMessage } = this.validateFname(fname);
    this.setState({
      isFnameError,
      fnameErrorMessage,
    });
    const { isLnameError, lnameErrorMessage } = this.validateLname(lname);
    this.setState({
      isLnameError,
      lnameErrorMessage,
    });
    const { isAddressError, addressErrorMessage } = this.validateAddress(address);
    this.setState({
      isAddressError,
      addressErrorMessage,
    });
    if (!isFnameError && !isAddressError && !isLnameError) {
      this.props.submitContact({
        address,
        fname,
        lname,
        network,
      });
    }
  };

  handleAddressOnBlur = () => {
    const { address } = this.state;
    const { isAddressError, addressErrorMessage } = this.validateAddress(address);
    this.setState({
      isAddressError,
      addressErrorMessage,
    });
  };

  handleFnameOnBlur = () => {
    const { isFnameError, fnameErrorMessage } = this.validateFname(this.state.fname);
    if (this.state.fname !== '' || !isFnameError) {
      this.setState({
        isFnameError,
        fnameErrorMessage,
      });
    }
  };

  handleLnameOnBlur = () => {
    const { isLnameError, lnameErrorMessage } = this.validateLname(this.state.lname);
    if (this.state.lname !== '' || !isLnameError) {
      this.setState({
        isLnameError,
        lnameErrorMessage,
      });
    }
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  handleInputChange = prop => e => {
    this.setState({
      [prop]: e.target.value,
    });
  };

  handelNetworkChnage = e => {
    const network = e.target.value;
    this.setState({ network });
  };

  validateAddress(address) {
    let { isAddressError, addressErrorMessage } = this.state;
    if (address.length === 0) {
      isAddressError = true;
      addressErrorMessage = AddressRequiredErrorMessage;
    } else {
      isAddressError = false;
      addressErrorMessage = '';
    }
    return {
      isAddressError,
      addressErrorMessage,
    };
  }

  validateFname(fname) {
    let { isFnameError, fnameErrorMessage } = this.state;
    if (fname.length === 0) {
      isFnameError = true;
      fnameErrorMessage = FnameRequiredErrorMessage;
    } else if (fname !== '') {
      const fnameValidation = this.fnameValidator.validate({
        fname,
      });
      if (!fnameValidation.isValid) {
        isFnameError = true;
        fnameErrorMessage = fnameValidation.fname.message;
      } else {
        isFnameError = false;
        fnameErrorMessage = null;
      }
    } else {
      isFnameError = false;
      fnameErrorMessage = null;
    }
    return {
      isFnameError,
      fnameErrorMessage,
    };
  }

  validateLname(lname) {
    let { isLnameError, lnameErrorMessage } = this.state;

    if (lname !== '') {
      const lnameValidation = this.lnameValidator.validate({
        lname,
      });
      if (!lnameValidation.isValid) {
        isLnameError = true;
        lnameErrorMessage = lnameValidation.lname.message;
      } else {
        isLnameError = false;
        lnameErrorMessage = null;
      }
    }
    return {
      isLnameError,
      lnameErrorMessage,
    };
  }

  render() {
    const {
      address,
      isAddressError,
      addressPropName,
      addressErrorMessage,
      fname,
      fnameLabel,
      fnamePropName,
      isFnameError,
      fnameErrorMessage,
      lname,
      lnameLabel,
      lnamePropName,
      isLnameError,
      lnameErrorMessage,
      buttonText,
      network,
    } = this.state;
    const { networks } = this.props;
    const chain = findChainByName(this.props.network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Address Book"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <CreateContactForm
          className="create-address-book-form"
          address={address}
          theme={theme}
          isAddressError={isAddressError}
          addressPropName={addressPropName}
          addressErrorMessage={addressErrorMessage}
          addressInputRef={input => {
            this.addressInputRef = input;
          }}
          handleToChange={this.handleInputChange}
          fname={fname}
          fnameLabel={fnameLabel}
          fnamePropName={fnamePropName}
          isFnameError={isFnameError}
          fnameErrorMessage={fnameErrorMessage}
          fnameInputRef={input => {
            this.fnameInputRef = input;
          }}
          handleFnameChange={this.handleInputChange}
          handleFnameOnBlur={this.handleFnameOnBlur}
          lname={lname}
          lnameLabel={lnameLabel}
          lnamePropName={lnamePropName}
          isLnameError={isLnameError}
          lnameErrorMessage={lnameErrorMessage}
          lnameInputRef={input => {
            this.lnameInputRef = input;
          }}
          handleLnameChange={this.handleInputChange}
          handleLnameOnBlur={this.handleLnameOnBlur}
          buttonName={buttonText}
          onSubmit={this.onSubmit}
          networks={networks}
          network={network}
          onNetworkChange={this.handelNetworkChnage}
        />
      </div>
    );
  }
}
