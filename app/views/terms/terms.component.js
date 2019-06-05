import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import TOUHeader from '../../components/terms/tou-header';
import TermsOfUse from '../../components/terms/terms-of-use';
import TOUFooter from '../../components/terms/tou-footer';
import './styles.css';

const TOP_MARGIN = 100;

export default class Terms extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled: true,
      titleText: 'Read and agree to the following items',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAgree !== this.props.isAgree) {
      this.props.onBoard();
    }
  }

  handleScroll = e => {
    const bottom = e.target.offsetHeight + e.target.scrollTop + TOP_MARGIN >= e.target.scrollHeight;
    if (bottom) {
      this.setState({ disabled: false });
    }
  };

  handleAgree = async () => {
    const {
      props: { storeTermsStatus },
    } = this;
    this.props.updateAppLoading(true);
    storeTermsStatus(true);
  };

  render() {
    return (
      <div className="tou-grid-container">
        <TOUHeader
          className="tou-header"
          titleClassName="tou-title"
          subTitleClassName="tou-subtitle"
          title="Terms of use"
          subtitle={this.state.titleText}
        />
        <TermsOfUse className="tou-main" onScroll={this.handleScroll} />
        <TOUFooter
          className="tou-footer"
          disabled={this.state.disabled}
          onClick={this.handleAgree}
          buttonName="agree"
        />
      </div>
    );
  }
}

Terms.defaultProps = {
  storeTermsStatus: undefined,
  onBoard: undefined,
};

Terms.propTypes = {
  storeTermsStatus: PropTypes.func,
  onBoard: PropTypes.func,
};
