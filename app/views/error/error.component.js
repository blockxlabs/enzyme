import React, { Component } from 'react';
import FontRegular from '../../components/common/fonts/font-regular';

export default class Error extends Component {
  render() {
    return (
      <div>
        <FontRegular text="Fatal error occurred. PLease re-open Enzyme!" />
      </div>
    );
  }
}
