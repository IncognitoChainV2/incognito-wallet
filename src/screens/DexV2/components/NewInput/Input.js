import React from 'react';
import PropTypes from 'prop-types';
import { BaseTextInput as TextInput, View } from '@components/core';
import { COLORS } from '@src/styles';
import stylesheet from './style';

const Input = ({ value, onChange, disabled }) => {
  return (
    <View style={stylesheet.inputContainer}>
      <TextInput
        keyboardType="decimal-pad"
        style={[stylesheet.bigText, stylesheet.input]}
        placeholder={onChange ? '0.0' : ''}
        placeholderTextColor={COLORS.lightGrey1}
        value={value}
        onChangeText={onChange}
        editable={!disabled}
      />
    </View>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  value: '',
  disabled: false,
};

export default Input;
