import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View, Text } from '@components/core';
import { withLayout_2 } from '@components/Layout';
import Header from '@components/Header/index';
import ExtraInfo from '@screens/DexV2/components/ExtraInfo';
import styles from './style';
import withData from './data.enhance';

const HistoryDetail = ({
  history,
}) => {
  return (
    <View>
      <Header title="pDEX" />
      <View style={styles.historyItem}>
        <Text style={styles.buttonTitle}>{history.type}</Text>
        <Text style={styles.content}>{history.description}</Text>
      </View>
      <ExtraInfo left="ID" right={history.id} />
      <ExtraInfo left="Buy" right={`${history.buyAmount} ${history.buyTokenSymbol}`} />
      <ExtraInfo left="Sell" right={`${history.sellAmount} ${history.sellTokenSymbol}`} />
      <ExtraInfo left="Fee" right={`${history.networkFee} ${history.networkFeeTokenSymbol}`} />
      <ExtraInfo left="Time" right={history.createdAt} />
      <ExtraInfo left="Status" right={history.status} />
      <ExtraInfo left="Account" right={history.account} />
    </View>
  );
};

HistoryDetail.propTypes = {
  history: PropTypes.object.isRequired,
};

HistoryDetail.defaultProps = {
};

export default compose(
  withLayout_2,
  withData,
)(HistoryDetail);
