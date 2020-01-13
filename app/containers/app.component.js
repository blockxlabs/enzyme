import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DASHBOARD_PAGE,
  CUSTOM_NETWORK_PAGE,
  LOADER_OVERLAY,
  ONBOARDING_PAGES_GROUP,
} from '../constants/navigation';
import EnzymeApp from '../components/enzyme-app';
import './styles.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: false,
      showLogo: false,
      showBanner: false,
      showNetwork: false,
      showSettings: false,
    };
  }

  componentDidMount() {
    this.props.updateBackupPage(this.props.page);
    this.props.fetchAndUpdateAppManifest();
    this.props.updateAppLoading(true);
    this.props.onBoard();
  }

  static getDerivedStateFromProps(prevProps, nextState) {
    // below vars are from 'nextState' and we are overwriting to hide/show as per page

    if (prevProps.page !== LOADER_OVERLAY) {
      if (ONBOARDING_PAGES_GROUP.indexOf(prevProps.page) !== -1) {
        return {
          showHeader: true, // no change
          showLogo: false,
          showBanner: true,
          showNetwork: false,
          showSettings: false,
        };
      }
      return {
        showHeader: true, // no change
        showLogo: true,
        showBanner: false,
        showNetwork: true,
        showSettings: true,
      };
    }

    return nextState;
  }

  handleNetworkChange = network => {
    if (network.value === 'custom') {
      this.props.updateBackupPage(this.props.page);
      this.props.changePage(CUSTOM_NETWORK_PAGE);
    } else {
      this.props.switchNetwork(network);
    }
  };

  handleOptionsChange = option => {
    this.props.updateBackupPage(this.props.page);
    this.props.changePage(option.value);
  };

  onToggleDeveloperMode = event => {
    const isDeveloperMode = event.target.checked;
    this.props.onToggleDeveloperMode(isDeveloperMode);
  };

  onClick = () => {
    this.props.resetConfirmOnBoarding();
    this.props.clearTransferDetails();
    this.props.changePage(DASHBOARD_PAGE);
  };

  render() {
    const {
      props: {
        page, isLoading, networks, network, isConnected, isDeveloperMode, options
      },
      state: {
        showLogo, showBanner, showNetwork, showSettings, showHeader
      },
    } = this;
    return (
      <EnzymeApp
        className="app"
        isLoading={isLoading}
        page={page}
        networks={networks}
        network={network}
        isConnected={isConnected}
        onNetworkChange={this.handleNetworkChange}
        showLogo={showLogo}
        showBanner={showBanner}
        showNetwork={showNetwork}
        showSettings={showSettings}
        showHeader={showHeader}
        onLogoClick={this.onClick}
        options={options}
        onOptionsChange={this.handleOptionsChange}
        isDeveloperMode={isDeveloperMode}
        onToggleDeveloperMode={this.onToggleDeveloperMode}
      />
    );
  }
}

App.propTypes = {
  page: PropTypes.string,
  switchNetwork: PropTypes.func,
  changePage: PropTypes.func,
};

App.defaultProps = {
  page: DASHBOARD_PAGE,
  switchNetwork: undefined,
  changePage: undefined,
};
