import React, { Component } from 'react';
import EnzymeExpansionPanel from '../../common/enzyme-expansion-panel';
import EnzymeRadioButtonGroup from '../../common/enzyme-radio-button-group';
import FontRegular from '../../common/fonts/font-regular';

export default class CreateAccountAdvancedConfig extends Component {
  render() {
    const {
      classes,
      keypairType,
      keypairTypes,
      onKeypairTypeChange,
      disableAccountSettings,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <EnzymeExpansionPanel disabled={disableAccountSettings} title="Advanced">
          <FontRegular
            text="Keypair Crypto Type"
            style={{
              fontSize: 14,
              fontWeight: 'bolder',
              margin: '14px 0px 14px 0px',
            }}
          />
          <EnzymeRadioButtonGroup
            options={keypairTypes}
            value={keypairType}
            onChange={onKeypairTypeChange}
            disabled={disableAccountSettings}
          />
        </EnzymeExpansionPanel>
      </div>
    );
  }
}
