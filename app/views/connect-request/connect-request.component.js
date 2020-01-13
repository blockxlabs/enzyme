import React, { Component } from 'react';
import SubHeader from '../../components/common/sub-header';
import FavIcon from '../../components/common/fav-icon';
import FontRegular from '../../components/common/fonts/font-regular';
import { trimUrl } from '../../services/wallet-service';
import FooterTwoMDButton from '../../components/common/footer-two-md-button';
import { SolidWallet, SolidPlug, File } from '../../components/common/icon';
import { copyAccountMessage } from '../../../lib/services/static-message-factory-service';
import './styles.css';

const DAppURL = ({ favIconUrl, url, ...otherProps }) => (
  <div {...otherProps}>
    {favIconUrl ? (
      <FavIcon favIconUrl={favIconUrl} width="44" height="44" className="connect-request-favicon" />
    ) : (
      <File className="connect-request-favicon" />
    )}
    <FontRegular text={trimUrl(url)} className="connect-request-favicon-url" />
  </div>
);

export default class ConnectRequest extends Component {
  componentDidMount() {
    this.props.updateAppLoading(true);
    this.props.initializeRequest();
    this.props.updateAppLoading(false);
    this.props.fetchNetwork();
  }

  onDeny = () => {
    this.props.denyAccountAuthorization();
  };

  onAllow = () => {
    this.props.allowAccountAuthorization();
  };

  onCopyAddress = () => {
    this.props.createToast({
      message: copyAccountMessage(),
      type: 'info',
    });
  };

  renderHeader() {
    const { request } = this.props;
    return (
      <div className="connect-request-header">
        <DAppURL
          favIconUrl={request.sender.tab.favIconUrl}
          url={request.request.metadata.url}
          className="connect-request-dapp-url-container"
        />
        <SolidPlug className="connect-request-plug-icon" />
        <SolidWallet className="connect-request-wallet-icon" />
      </div>
    );
  }

  render() {
    const { request, title } = this.props;
    return (
      <div>
        <SubHeader title={title} />
        {this.renderHeader()}
        <FontRegular
          text={(
            <div>
              {`${request.request.metadata.url} is requesting access to a/an `}
              account. Click allow to grant access any account or click DENY to prevent access to
              any account.
            </div>
          )}
          className="connect-request-center connect-request-account-selection-header"
        />
        <FooterTwoMDButton
          namePrimary="deny"
          nameSecondary="allow"
          onClickPrimary={this.onDeny}
          onClickSecondary={this.onAllow}
        />
      </div>
    );
  }
}
