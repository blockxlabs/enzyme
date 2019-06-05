import React, { Component } from 'react';
import EnzymeInput from '../../common/enzyme-input';
import DropDown from '../../common/drop-down';

export default class TransferFormAmount extends Component {
  render() {
    const {
      error,
      label,
      value,
      helperText,
      onChange,
      inputRef,
      options,
      dropDownValue,
      propName,
      onDropDownChange,
      ...otherProps
    } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        {...otherProps}
      >
        <EnzymeInput
          style={{ width: '171.23px' }}
          error={error}
          label={label}
          value={value}
          name={propName}
          helperText={helperText}
          onChange={onChange(propName)}
          inputRef={inputRef}
        />
        <DropDown options={options} value={dropDownValue} onChange={onDropDownChange} />
      </div>
    );
  }
}
