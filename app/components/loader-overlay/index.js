import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockUi from 'react-block-ui';
import { Loader } from 'react-loaders';
import { changePageStatus } from '../../constants/common';
// import { SIGN_IN_PAGE } from '../../constants/navigation';
import 'loaders.css/loaders.min.css';

import './styles.css';

function mapStateToProps() {
  return {};
}

class LoaderOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    const {
      state: { isLoading },
    } = this;

    return (
      <div>
        <BlockUi
          tag="div"
          blocking={isLoading}
          loader={<Loader active type="ball-grid-pulse" color="#A32C71" />}
        >
          <div className="wallet-loader-page" />
        </BlockUi>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoaderOverlay);
