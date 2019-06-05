import React, { PureComponent } from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import EnzymeLoader from '../common/enzyme-loader';

export default class EnzymeContainer extends PureComponent {
  render() {
    const { children, blocking, ...otherProps } = this.props;
    return (
      <BlockUi tag="div" blocking={blocking} loader={<EnzymeLoader />} {...otherProps}>
        {children}
      </BlockUi>
    );
  }
}
