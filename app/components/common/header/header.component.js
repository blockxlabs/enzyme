import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default class Header extends Component {
  render() {
    const { children, ...otherProps } = this.props;

    return <div {...otherProps}>{children}</div>;
  }
}

Header.defaultProps = {
  text: 'Enzyme',
};

Header.propTypes = {
  text: PropTypes.string,
};
