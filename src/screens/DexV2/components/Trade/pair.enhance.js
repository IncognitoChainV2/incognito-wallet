import React from 'react';
import { COINS } from '@src/constants';
import { getDAppAddresses } from '@services/trading';

const withPair = WrappedComp => (props) => {
  const [pair, setPair] = React.useState([]);
  const { inputToken, outputToken, pairs, isErc20 } = props;

  React.useEffect(() => {
    if (inputToken && outputToken && !isErc20) {
      if (inputToken.id === COINS.PRV_ID || outputToken.id === COINS.PRV_ID) {
        const pair = pairs.find(item =>
          item.keys.includes(inputToken.id) &&
          item.keys.includes(outputToken.id)
        );
        setPair([pair]);
      } else {
        const inPair = pairs.find(item =>
          item.keys.includes(inputToken.id) &&
          item.keys.includes(COINS.PRV_ID)
        );
        const outPair = pairs.find(item =>
          item.keys.includes(outputToken.id) &&
          item.keys.includes(COINS.PRV_ID)
        );

        if (inPair && outPair) {
          setPair([inPair, outPair]);
        } else {
          setPair(null);
        }
      }
    } else {
      setPair(null);
    }
  }, [inputToken, outputToken, pairs, isErc20]);

  React.useEffect(() => {
    getDAppAddresses()
      .catch(e => e);
  }, []);

  return (
    <WrappedComp
      {...{
        ...props,
        pair,
      }}
    />
  );
};

export default withPair;
