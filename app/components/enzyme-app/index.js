import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import EnzymeContainer from '../enzyme-container';
import Header from '../common/header/header.component';
import ViewSelector from '../view-selector';
import Network from '../network/network';
import Options from '../options';
import EnzymeBanner from '../common/enzyme-banner';
import EnzymeLogo from '../common/enzyme-logo';
import { NetworkDisconnectionIcon } from '../common/icon';
import './styles.css';

export default class EnzymeApp extends Component {
  render() {
    const {
      page,
      isLoading,
      networks,
      network,
      onNetworkChange,
      showLogo,
      showBanner,
      showNetwork,
      isConnected,
      showSettings,
      showHeader,
      onLogoClick,
      options,
      onOptionsChange,
      isDeveloperMode,
      onToggleDeveloperMode,
      ...otherProps
    } = this.props;

    const EnzymeHeaderClassNames = classnames({
      'enzyme-header': showHeader,
      'enzyme-header-banner':
        showHeader && showBanner && !showLogo && !showNetwork && !showSettings,
      'enzyme-header-boarded': showHeader && !showBanner && showLogo && showNetwork && showSettings,
      'display-none': !showHeader,
    });

    const EnzymeLogoClassNames = classnames({
      'enzyme-logo': showLogo,
      'display-none': !showLogo,
      'clickable-icon': showLogo,
    });
    const EnzymeNetworkClassNames = classnames({
      'enzyme-network': showNetwork,
      'display-none': !showNetwork,
    });
    const EnzymeNetworkStatusClassNames = classnames({
      'display-none': isConnected,
      'enzyme-network-status': !isConnected,
    });
    const EnzymeBannerClassNames = classnames({
      'enzyme-banner': showBanner,
      'display-none': !showBanner,
    });
    const EnzymeSettingsClassNames = classnames({
      'enzyme-settings': showSettings,
      'display-none': !showSettings,
    });
    const EnzymeConfigClassNames = classnames({
      'enzyme-config': showNetwork && showSettings,
      'display-none': showBanner,
    });
    return (
      <EnzymeContainer blocking={isLoading}>
        <div {...otherProps}>
          <Header page={page} className={EnzymeHeaderClassNames}>
            <EnzymeLogo onClick={onLogoClick} className={EnzymeLogoClassNames} />
            <EnzymeBanner className={EnzymeBannerClassNames} />
            <div className={EnzymeConfigClassNames}>
              <NetworkDisconnectionIcon
                title="Network unavailable"
                className={EnzymeNetworkStatusClassNames}
              />
              <Network
                networks={networks}
                network={network}
                onNetworkChange={onNetworkChange}
                className={EnzymeNetworkClassNames}
                page={page}
              />
              <Options
                onToggleDeveloperMode={onToggleDeveloperMode}
                options={options}
                onOptionsChange={onOptionsChange}
                className={EnzymeSettingsClassNames}
                isDeveloperMode={isDeveloperMode}
                page={page}
              />
            </div>
          </Header>
          <ViewSelector page={page} />
          <ToastContainer />
        </div>
      </EnzymeContainer>
    );
  }
}
