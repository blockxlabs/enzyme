import React, { Component } from 'react';
import TransferFrom from '../../transfer/transfer-from';
import { IconTransferFromTo } from '../../common/icon';
import ConfirmTo from '../confirm-to';

export default class ConfirmFromTo extends Component {
  render() {
    const {
      to, alias, from, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <TransferFrom address={from} alias={alias} />
        <IconTransferFromTo />
        <ConfirmTo
          style={{
            marginTop: '10.8px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '26px',
            height: '54.8px',
          }}
          address={to}
        />
      </div>
    );
  }
}
