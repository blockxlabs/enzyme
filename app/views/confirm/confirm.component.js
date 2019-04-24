import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ConfirmForm from '../../components/confirm/confirm-form';
import SubHeader from '../../components/common/sub-header';
import { TRANSFER_PAGE } from '../../constants/navigation';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'send',
    };
  }

  handleSend = () => {
    const { transferDetails, submitTransaction } = this.props;
    submitTransaction(transferDetails);
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(TRANSFER_PAGE);
  };

  render() {
    const { buttonText } = this.state;
    const { transferDetails } = this.props;
    return (
      <div>
        <SubHeader
          icon={<ArrowBack style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Send"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <ConfirmForm
          transferDetails={transferDetails}
          handleSend={this.handleSend}
          buttonText={buttonText}
          theme="polkadot"
        />
      </div>
    );
  }
}
