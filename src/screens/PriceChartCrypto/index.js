import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PriceChart from '@src/components/PriceChart';
import LoadingContainer from '@src/components/LoadingContainer';
import {View} from '@src/components/core';
import PriceChartSelector from '@src/components/HeaderRight/PriceChartSelector';
import SimpleInfo from '@src/components/SimpleInfo';
import {getPriceData as getPriceDataAPI} from '@services/api/price';
import {ExHandler} from '@services/exception';
import ChartActions from './ChartActions';
import LatestPrice from './LatestPrice';
import { BY_HOUR, BY_DAY, BY_WEEK, BY_MONTH, BY_YEAR } from './util';


const DEFAULT_PAIR = 'PRV-pZIL';

class PriceChartCrypto extends Component {
  state = {
    data: null,
    label: null,
    intervalMs: 3600,
    latestPrice: 0,
    diffPercent: 0,
    isShowAll: false,
  };

  static navigationOptions = ({ navigation }) => {
    const { handleSelectPair, currentPair, tokenPairs } = navigation.state.params || {};
    return {
      headerRight: (
        <View>
          <PriceChartSelector currentPair={currentPair} pairs={tokenPairs} onPress={handleSelectPair} />
        </View>
      )
    };
  };

  componentWillMount() {
    const { navigation } = this.props;
    const { pair } = navigation.state?.params || {};
    navigation?.setParams({
      handleSelectPair: this.handleSelectPair,
    });

    this.handleSelectPair(pair || DEFAULT_PAIR);
  }

  getPriceData(pair) {
    try {
      const {intervalMs} = this.state;
      return getPriceDataAPI({pair, intervalMs});
    } catch (e) {
      new ExHandler(e).showErrorToast();
      return [];
    }
  }

  handleSelectPair = (pair) => {
    // reset
    this.setState({ data: null }, async () => {
      const data = await this.getPriceData(pair);
      const latestPrice = data.length > 0 ? data[data.length -1].value : 0;
      const prevPrice = data.length > 1 ? data[data.length -2].value : null;
      const diffPercent = prevPrice ? ((latestPrice/prevPrice -1)*100).toFixed(5) : 0;

      this.setState({ latestPrice, diffPercent });
      if (data instanceof Array) {
        const { navigation } = this.props;
        this.setState({ label: pair, data });

        navigation?.setParams({
          currentPair: pair,
        });
      }
    });
  };

  handleChangePeriodTime = (intervalMs, isShowAll = false) => {
    this.setState({ intervalMs, isShowAll, data: null }, async () => {
      const { label: pair} = this.state;
      const data = await this.getPriceData(pair);
      const latestPrice = data.length > 0 ? data[data.length -1].value : 0;
      const prevPrice = data.length > 0 ? data[data.length -2].value : 0;
      const diffPercent = ((latestPrice/prevPrice -1)*100).toFixed(5);
      this.setState({ data, diffPercent});
    });
  };

  getLatestPrice = () => {
    const { label, latestPrice } = this.state;

    if (latestPrice && latestPrice.toFixed) {
      return latestPrice.toFixed(5) + ' ' + (label || 'PRV-PRV').split('-')[1];
    }

    return latestPrice;
  };

  handlingChartData = data => {
    const { intervalMs, isShowAll } = this.state;
    switch(intervalMs) {
    case BY_HOUR: {
      return data.slice(-12);
    }
    case BY_DAY: {
      return !isShowAll ? data.slice(-14) : data;
    }
    case BY_WEEK: {
      return data.slice(-4);
    }
    case BY_MONTH: {
      return data.slice(-12);
    }
    case BY_YEAR: {
      return data.slice(-5);
    }
    default: return data;
    }
  };

  render() {
    const { label, data, intervalMs, diffPercent, isShowAll } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <LatestPrice price={this.getLatestPrice()} diffPercent={diffPercent} />
        <ChartActions value={intervalMs} isShowAll={isShowAll} onPress={this.handleChangePeriodTime} />
        {!data ? <LoadingContainer /> : data.length ? (
          <PriceChart
            onChangePeriodTime={this.handleChangePeriodTime}
            label={label}
            data={this.handlingChartData(data)}
            chartType={intervalMs}
            isShowAll={isShowAll}
          />
        ) :
          <SimpleInfo text={label} subText='does not have any data' />}
      </View>
    );
  }
}

PriceChartCrypto.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default PriceChartCrypto;