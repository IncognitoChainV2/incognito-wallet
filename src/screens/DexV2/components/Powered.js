import React from 'react';
import PropTypes from 'prop-types';
import ExtraInfo from '@screens/DexV2/components/ExtraInfo';
import { COLORS } from '@src/styles';

const colors = {
  'Incognito': COLORS.black,
  'Kyber': COLORS.green,
};

const Powered = ({ network }) => {
  return (
    <ExtraInfo
      left=""
      right={`Powered by ${network}`}
      style={{
        color: colors[network] || COLORS.lightGrey17,
      }}
    />
  );
};

Powered.propTypes = {
  network: PropTypes.string.isRequired,
};

export default Powered;