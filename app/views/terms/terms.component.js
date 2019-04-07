import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ButtonMD from '../../components/common/buttons/button-md';
import Footer from '../../components/common/footer';
import TermsText from './terms-text';
import './styles.css';
import { SIGN_UP_PAGE } from '../../constants/navigation';

const TOP_MARGIN = 100;

export default class Terms extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled: true,
      titleText: 'Read and agree to the following items',
    };
  }

  handleScroll = e => {
    const bottom = e.target.offsetHeight + e.target.scrollTop + TOP_MARGIN >= e.target.scrollHeight;
    if (bottom) {
      this.setState({ disabled: false });
    }
  };

  handleAgree = async () => {
    const {
      props: { changePage, storeTermsStatus, verifyTermsVersion },
    } = this;
    storeTermsStatus(true);
    verifyTermsVersion();
    changePage(SIGN_UP_PAGE);
  };

  render() {
    return (
      <div className="tou-grid-container">
        <div className="tou-header">
          <p className="tou-title">Terms of use</p>
          <p className="tou-subtitle">{this.state.titleText}</p>
        </div>

        <div className="tou-main" onScroll={this.handleScroll}>
          <TermsText />
        </div>
        <div className="tou-footer">
          <Footer>
            <ButtonMD disabled={this.state.disabled} onClick={this.handleAgree}>
              AGREE
            </ButtonMD>
          </Footer>
        </div>
      </div>
    );
  }
}

Terms.defaultProps = {
  storeTermsStatus: undefined,
  verifyTermsVersion: undefined,
  changePage: undefined,
};

Terms.propTypes = {
  storeTermsStatus: PropTypes.func,
  verifyTermsVersion: PropTypes.func,
  changePage: PropTypes.func,
};
