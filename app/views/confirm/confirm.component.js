import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ConfirmForm from '../../components/confirm/confirm-form';
import SubHeader from '../../components/common/sub-header';
import { TRANSFER_PAGE, CREATE_ADDRESS_BOOK_PAGE } from '../../constants/navigation';
import { shortenAddress } from '../../services/wallet-service';
import { findChainByName } from '../../../lib/constants/chain';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'send',
    };
  }

  componentDidMount() {
    this.props.resetConfirmOnBoarding();
  }

  openAddressBook = () => {
    this.props.changePage(CREATE_ADDRESS_BOOK_PAGE);
  };

  handleSend = async () => {
    const { confirmDetails, submitTransaction, isNewAddress } = this.props;
    const tx = await submitTransaction(confirmDetails);
    const result = await isNewAddress(tx.metadata.to);
    if (result.isNewAddress === true) {
      this.props.updateToAddress(tx.metadata.to);
      this.props.createToast({
        message: `Transfer submitted with ${shortenAddress(tx.txnHash)}`,
        onClick: this.openAddressBook,
        type: 'addAddress',
        toastType: 'info',
        autoClose: false,
      });
    } else {
      this.props.createToast({
        message: `Transfer submitted with ${shortenAddress(tx.txnHash)}`,
        type: 'info',
      });
    }
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(TRANSFER_PAGE);
  };

  render() {
    const { buttonText } = this.state;
    const { confirmDetails, network } = this.props;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div>
        <SubHeader
          icon={<ArrowBack style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Send"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <ConfirmForm
          confirmDetails={confirmDetails}
          handleSend={this.handleSend}
          buttonText={buttonText}
          theme={theme}
        />
      </div>
    );
  }
}
