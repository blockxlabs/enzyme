import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import QRCode from 'qrcode-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { changePageStatus } from '../../constants/common';
import Wallet from '../wallet';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import SubHeader from '../common/sub-header';
import ButtonLG from '../common/buttons/button-lg';
import FontMonoRegular from '../common/fonts/font-mono-regular';
import './styles.css';
import toggleApplicationAnimationOff from '../../actions/animation';
import { shrinkAllApplicationSetting } from '../../services/animationService';

function mapStateToProps(state) {
  return {
    wallets: state.wallets.wallets,
    currentWallet: state.wallets.currentWallet,
    transactions: state.transactions.transactions,
  };
}

class Deposit extends Component {
  static defaultProps = {
    changePageStatus: undefined,
  };

  static propTypes = {
    changePageStatus: PropTypes.func,
  };

  componentDidMount() {
    // Turn off all other animations within Reducer State
    this.props.toggleApplicationAnimationOff();
    shrinkAllApplicationSetting();
  }

  handleSubheaderBackBtn = () => {
    this.props.changePageStatus(DASHBOARD_PAGE);
  };

  render() {
    return (
      <div>
        <Wallet />
        <SubHeader title="Receive" backBtnOnClick={this.handleSubheaderBackBtn} />
        <div className="deposit-grid-container">
          <div className="deposit-grid-qr-code">
            <QRCode size={224} bgColor="#ebebeb" value={this.props.currentWallet.address} />
          </div>
          <div className="deposit-grid-address">
            <span>
              <FontMonoRegular className="deposit-wallet-address">
                {this.props.currentWallet.address.slice(0, 33)}
                <br />
                {this.props.currentWallet.address.substr(
                  this.props.currentWallet.address.length - 33,
                )}
              </FontMonoRegular>
            </span>
          </div>
          <div className="deposit-grid-copy-to-clipboard">
            <CopyToClipboard text={this.props.currentWallet.address}>
              <ButtonLG color="secondary">Copy to Clipboard</ButtonLG>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    toggleApplicationAnimationOff: () => dispatch(toggleApplicationAnimationOff()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Deposit);
