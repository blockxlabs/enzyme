import React, { Component } from 'react';
import FontLight from '../../common/fonts/font-light';

export default class TOUHeader extends Component {
  render() {
    const {
      title, subtitle, titleClassName, subTitleClassName, style, ...otherProps
    } = this.props;
    return (
      <div style={style} {...otherProps}>
        <FontLight className={titleClassName} text={title} />
        <FontLight className={subTitleClassName} text={subtitle} />
      </div>
    );
  }
}
