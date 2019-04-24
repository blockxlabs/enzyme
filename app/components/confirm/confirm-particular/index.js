import React, { Component } from 'react';
import FontMedium from '../../common/fonts/font-medium';
import FontRegular from '../../common/fonts/font-regular';
import './styles.css';

export default class ConfirmQuote extends Component {
  render() {
    const { description, price, ...otherProps } = this.props;
    return (
      <div {...otherProps}>
        <FontMedium className="confirm-quote-description" text={description} />
        <FontRegular className="confirm-quote-price" text={price} />
      </div>
    );
  }
}
