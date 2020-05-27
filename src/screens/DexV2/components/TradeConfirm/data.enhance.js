import React from 'react';
import _ from 'lodash';
import { useNavigationParam } from 'react-navigation-hooks';

const withData = WrappedComp => (props) => {
  const inputToken = useNavigationParam('inputToken');
  const inputValue = useNavigationParam('inputValue');
  const inputText = useNavigationParam('inputText');
  const outputToken = useNavigationParam('outputToken');
  const outputValue = useNavigationParam('outputValue');
  const minimumAmount = useNavigationParam('minimumAmount');
  const inputBalance = useNavigationParam('inputBalance');
  const prvBalance = useNavigationParam('prvBalance');
  const pair = useNavigationParam('pair');
  const fee = useNavigationParam('fee');
  const feeToken = useNavigationParam('feeToken');

  return (
    <WrappedComp
      {...{
        ...props,
        inputToken,
        inputValue,
        inputText,
        outputToken,
        outputValue,
        minimumAmount,
        fee,
        feeToken,
        pair,

        inputBalance,
        prvBalance,
      }}
    />
  );
};

export default withData;
