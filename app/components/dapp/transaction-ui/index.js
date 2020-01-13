import React, { Component } from 'react';
import { CaretRight, CaretDown } from '../../common/icon';
import FontRegular from '../../common/fonts/font-regular';
import { trimUrl } from '../../../services/wallet-service';
import './styles.css';

const InfoExpanded = props => (
  <div className="txn-txnui-info-value" onClick={props.handleInfoExpansion}>
    <CaretDown width="10px" />
    <FontRegular text={props.value} className="txn-info-details-expanded" />
  </div>
);

const InfoCllapsed = props => (
  <div className="txn-txnui-info-value" onClick={props.handleInfoExpansion}>
    <CaretRight height="16px" />
    <FontRegular text={trimUrl(props.value, 45)} className="txn-info-details-collapsed" />
  </div>
);

export default class TransactionUI extends Component {
  render() {
    const {
      txnUi, isInfoExpanded, handleInfoExpansion, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        {txnUi.map(txn => (
          <div className="txn-txnui" key={txn.label}>
            <FontRegular text={txn.label} className="txn-txnui-label" />
            {txn.label === 'Info' ? (
              isInfoExpanded ? (
                <InfoExpanded value={txn.value} handleInfoExpansion={handleInfoExpansion} />
              ) : (
                <InfoCllapsed value={txn.value} handleInfoExpansion={handleInfoExpansion} />
              )
            ) : (
              <FontRegular text={txn.value} className="txn-txnui-value" />
            )}
          </div>
        ))}
      </div>
    );
  }
}
