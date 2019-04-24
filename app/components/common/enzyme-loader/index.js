import React, { Component } from 'react';
import { Loader } from 'react-loaders';
import 'loaders.css/loaders.min.css';

export default class EnzymeLoader extends Component {
  render() {
    return <Loader active type="ball-grid-pulse" color="#A32C71" />;
  }
}
