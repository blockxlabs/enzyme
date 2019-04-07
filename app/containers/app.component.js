import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import HttpStatus from 'http-status-codes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import 'react-block-ui/style.css';
import 'loaders.css/loaders.min.css';
import SignIn from '../views/sign-in';
import SignUp from '../views/sign-up';
import CreateAccount from '../views/create-account';
import Terms from '../views/terms';
import Dashboard from '../views/dashboard';
import Deposit from '../components/deposit';
import HeaderUpdated from '../components/common/header';
import LoaderOverlay from '../components/loader-overlay';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.css';
import './styles.css';
import {
  DASHBOARD_PAGE,
  TERMS_PAGE,
  SIGN_IN_PAGE,
  DEPOSIT_PAGE,
  LOADER_OVERLAY,
  SIGN_UP_PAGE,
  CREATE_ACCOUNT_PAGE,
} from '../constants/navigation';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    const { verifyTermsVersion } = props;
    verifyTermsVersion();
    this.state = {
      prevConnection: true,
      msg: '',
      isShow: false,
    };
  }

  verifyConnection() {
    const {
      props: { isNetworkConnected, statusCode },
      state: { prevConnection },
    } = this;
    let message = '';
    if (statusCode === 0) {
      message = 'Internet connection is offline';
    } else if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = 'Provider internal server error';
    } else if (statusCode === HttpStatus.REQUEST_TIMEOUT) {
      message = 'Provider timeout';
    } else if (statusCode === HttpStatus.UNAUTHORIZED) {
      message = 'Provider access permission error';
    } else if (statusCode === HttpStatus.OK) {
      message = 'Provider is online';
    } else {
      message = 'Provider internal server error';
    }

    if (isNetworkConnected !== prevConnection) {
      if (isNetworkConnected) {
        this.setState({
          msg: message,
          prevConnection: isNetworkConnected,
          isShow: true,
        });
        setTimeout(() => {
          this.setState({ isShow: false });
        }, 3000);
      } else {
        this.setState({
          msg: message,
          prevConnection: isNetworkConnected,
          isShow: true,
        });
      }
    }
  }

  render() {
    let component = null;
    const {
      props: { page, isNetworkConnected, isLoading },
      state: { msg, isShow },
    } = this;
    switch (page) {
      case TERMS_PAGE:
        component = <Terms />;
        break;
      case DASHBOARD_PAGE:
        component = <Dashboard />;
        break;
      case DEPOSIT_PAGE:
        component = <Deposit />;
        break;
      case LOADER_OVERLAY:
        component = <LoaderOverlay />;
        break;
      case SIGN_IN_PAGE:
        component = <SignIn />;
        break;
      case SIGN_UP_PAGE:
        component = <SignUp />;
        break;
      case CREATE_ACCOUNT_PAGE:
        component = <CreateAccount />;
        break;
      default:
        component = <Dashboard />;
    }

    return (
      <BlockUi
        tag="div"
        blocking={isLoading}
        loader={<Loader active type="ball-grid-pulse" color="#A32C71" />}
      >
        <div className="app">
          {isShow && (
            <div
              className="offlineError"
              style={{ backgroundColor: isNetworkConnected ? 'green' : 'red' }}
            >
              {isNetworkConnected === false && (
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  style={{ color: 'white', paddingRight: 5 }}
                />
              )}
              {msg}
            </div>
          )}
          <HeaderUpdated />
          <ToastContainer />
          {component}
        </div>
      </BlockUi>
    );
  }
}

App.propTypes = {
  page: PropTypes.string,
  verifyTermsVersion: PropTypes.func,
};

App.defaultProps = {
  page: SIGN_IN_PAGE,
  verifyTermsVersion: undefined,
};

App.getDerivedStateFromProps = (props, state) => {
  if (props.isAgree !== undefined && !props.isOnBoarded) {
    props.onBoard();
  }
  if (props.list !== state.prevPropsList || state.prevFilterText !== state.filterText) {
    return {
      prevPropsList: props.list,
      prevFilterText: state.filterText,
      filteredList: props.list.filter(item => item.text.includes(state.filterText)),
    };
  }
  return null;
};
