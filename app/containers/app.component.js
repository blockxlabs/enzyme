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
    this.props.onBoard();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    let {
      showHeader, showLogo, showBanner, showNetwork, showSettings
    } = this.state;
    if (prevProps.page !== page) {
      if (page !== LOADER_OVERLAY) {
        showHeader = true;
        showLogo = false;
        showBanner = false;
        showNetwork = false;
        showSettings = false;
        if (ONBOARDING_PAGES_GROUP.indexOf(page) !== -1) {
          showBanner = true;
          showLogo = false;
          showNetwork = false;
          showSettings = false;
        } else {
          showBanner = false;
          showLogo = true;
          showNetwork = true;
          showSettings = true;
        }
      } else {
        showHeader = false;
      }
      this.setShowState({
        showHeader,
        showLogo,
        showBanner,
        showNetwork,
        showSettings,
      });
    }
  }

  setShowState(state) {
    this.setState(state);
  }

  handleNetworkChange = network => {
    if (network.value === 'custom') {
      this.props.changePage(CUSTOM_NETWORK_PAGE);
    } else {
      this.props.switchNetwork(network);
    }
  };

  render() {
    const {
      props: {
        page, isLoading, networks, network
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
        onNetworkChange={this.handleNetworkChange}
        showLogo={showLogo}
        showBanner={showBanner}
        showNetwork={showNetwork}
        showSettings={showSettings}
        showHeader={showHeader}
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
