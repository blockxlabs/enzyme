import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import QRCodeForm from '../../components/qr-code/qr-code-form';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import { findChainByName } from '../../../lib/constants/chain';

export default class QRCode extends Component {
  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  onCopy = () => {
    this.props.createToast({ message: copyAccountMessage(), type: 'info' });
  };

  render() {
    const { account, network } = this.props;
    const chain = findChainByName(network.value);
    const theme = chain.icon || 'polkadot';
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Receive"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <QRCodeForm
          theme={theme}
          account={account}
          onCopyAddress={this.onCopy}
          onClick={this.handleSubheaderBackBtn}
        />
      </div>
    );
  }
}
