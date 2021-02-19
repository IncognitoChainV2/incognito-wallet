import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import withToken from '@src/components/Token/Token.enhance';
import { TokenVerifiedIcon } from '@src/components/Icons';
import round from 'lodash/round';
import Swipeout from 'react-native-swipeout';
import { BtnDelete, BtnInfo } from '@src/components/Button';
import replace from 'lodash/replace';
import trim from 'lodash/trim';
import { TouchableOpacity, ActivityIndicator } from '@src/components/core';
import { useSelector } from 'react-redux';
import {
  currencySelector,
  decimalDigitsSelector
} from '@src/screens/Setting';
import {
  prefixCurrency,
  pTokenSelector
} from '@src/redux/selectors/shared';
import {
  formatAmount,
  formatPrice
} from '@components/Token/Token.utils';
import { generateTestId } from '@utils/misc';
import { TEST_TOKEN } from '@src/constants/elements';
import { styled } from './Token.styled';

export const NormalText = (props) => {
  const prefix = useSelector(prefixCurrency);
  const { style, stylePSymbol, containerStyle, text, hasPSymbol, ...rest } = props;
  return (
    <View accessible={false} style={[styled.normalText, containerStyle]}>
      {hasPSymbol && (
        <Text
          {...generateTestId(TEST_TOKEN.LBL_SYMBOL)}
          style={[styled.pSymbol, stylePSymbol]}
        >
          {prefix}
        </Text>
      )}
      <Text
        {...rest}
        numberOfLines={1}
        style={[styled.text, style]}
        ellipsizeMode="tail"
      >
        {trim(text)}
      </Text>
    </View>
  );
};

NormalText.propTypes = {
  style: PropTypes.any,
  stylePSymbol: PropTypes.any,
  containerStyle: PropTypes.any,
  text: PropTypes.string,
  hasPSymbol: PropTypes.bool,
};

NormalText.defaultProps = {
  style: null,
  stylePSymbol: null,
  containerStyle: null,
  text: '',
  hasPSymbol: false,
};

export const Name = (props) => {
  const { name, isVerified, tokenId, shouldShowFollowed } = props;
  return (
    <View accessible={false} style={[styled.name, props?.styledContainerName]}>
      <NormalText
        text={name}
        style={[styled.boldText, props?.styledName]}
        {...generateTestId(TEST_TOKEN.LBL_TOKEN_NAME)}
      />
      {isVerified && <TokenVerifiedIcon />}
      {shouldShowFollowed && <BtnInfo tokenId={tokenId} />}
    </View>
  );
};

Name.propTypes = {
  name: PropTypes.string,
  isVerified: PropTypes.bool,
  tokenId: PropTypes.string,
  shouldShowFollowed: PropTypes.bool,
};

Name.defaultProps = {
  name: 'Sample Name',
  isVerified: false,
  tokenId: null,
  shouldShowFollowed: false,
};

export const AmountBasePRV = (props) => {
  const {
    amount,
    pDecimals,
    pricePrv,
    customPSymbolStyle,
    customStyle,
  } = props;
  const decimalDigits = useSelector(decimalDigitsSelector);

  let currentAmount = formatAmount(
    pricePrv,
    amount,
    pDecimals,
    pDecimals,
    decimalDigits,
    false
  );

  return (
    <NormalText
      hasPSymbol
      text={`${currentAmount}`}
      style={[styled.rightText, customStyle]}
      stylePSymbol={[customPSymbolStyle]}
      {...generateTestId(TEST_TOKEN.LBL_TOKEN_AMOUNT_PAIR)}
    />
  );
};

AmountBasePRV.defaultProps = {
  amount: 0,
  pricePrv: 0,
  customStyle: null,
  customPSymbolStyle: null,
  isUSDT: false
};

AmountBasePRV.propTypes = {
  amount: PropTypes.number,
  pricePrv: PropTypes.number,
  customStyle: PropTypes.any,
  customPSymbolStyle: PropTypes.any,
  pDecimals: PropTypes.number.isRequired,
  isUSDT: PropTypes.bool
};

export const AmountBaseUSDT = React.memo((props) => {
  const {
    amount,
    pDecimals,
    priceUsd,
    customPSymbolStyle,
    customStyle,
  } = props;
  const decimalDigits = useSelector(decimalDigitsSelector);

  let currentAmount = formatAmount(
    priceUsd,
    amount,
    pDecimals,
    pDecimals,
    decimalDigits,
    false
  );

  return (
    <NormalText
      hasPSymbol
      text={`${currentAmount}`}
      style={[styled.rightText, customStyle]}
      stylePSymbol={[customPSymbolStyle]}
      {...generateTestId(TEST_TOKEN.LBL_TOKEN_AMOUNT_PAIR)}
    />
  );
});

export const ChangePrice = (props) => {
  const { change, customStyle } = props;
  const isTokenDecrease = change[0] === '-';
  const changeToNumber = Number(replace(change, '-', ''));
  if (changeToNumber === 0) {
    return null;
  }
  return (
    <NormalText
      text={` ${isTokenDecrease ? '-' : '+'}${round(changeToNumber, 2)}%`}
      style={[
        {
          marginLeft: 5,
        },
        styled.bottomText,
        isTokenDecrease ? styled.redText : styled.greenText,
        customStyle,
      ]}
      {...generateTestId(TEST_TOKEN.LBL_EXCHANGE_RATE)}
    />
  );
};

ChangePrice.propTypes = {
  change: PropTypes.string,
  customStyle: PropTypes.any,
};

ChangePrice.defaultProps = {
  change: '0',
  customStyle: null,
};

const Price = (props) => {
  const { priceUsd, pricePrv } = props;
  const { isToggleUSD } = useSelector(pTokenSelector);

  return (
    <View accessible={false} style={styled.priceContainer}>
      <NormalText
        text={formatPrice(isToggleUSD ? priceUsd : pricePrv)}
        hasPSymbol
        style={styled.bottomText}
        {...generateTestId(TEST_TOKEN.LBL_TOKEN_PRICE)}
      />
    </View>
  );
};

Price.propTypes = {
  priceUsd: PropTypes.number,
  pricePrv: PropTypes.number,
  pDecimals: PropTypes.number
};

Price.defaultProps = {
  priceUsd: 0,
  pricePrv: 0,
  pDecimals: 0
};

export const Amount = (props) => {
  const {
    amount,
    pDecimals,
    symbol,
    customStyle,
    showSymbol,
    isGettingBalance,
    showGettingBalance,
    hasPSymbol,
    stylePSymbol,
    containerStyle,
    size,
    testId
  } = props;
  const decimalDigits = useSelector(decimalDigitsSelector);
  const shouldShowGettingBalance = isGettingBalance || showGettingBalance;
  if (shouldShowGettingBalance) {
    return <ActivityIndicator size={size} />;
  }

  let amountWithDecimalDigits = formatAmount(
    1,
    amount,
    pDecimals,
    pDecimals,
    decimalDigits,
    false
  );

  return (
    <NormalText
      style={[styled.bottomText, styled.boldText, customStyle]}
      text={`${amountWithDecimalDigits} ${showSymbol ? symbol : ''}`}
      hasPSymbol={hasPSymbol}
      stylePSymbol={stylePSymbol}
      containerStyle={containerStyle}
      {...testId}
    />
  );
};

Amount.propTypes = {
  size: PropTypes.string,
  amount: PropTypes.number,
  pDecimals: PropTypes.number,
  symbol: PropTypes.string,
  customStyle: PropTypes.any,
  showSymbol: PropTypes.bool,
  isGettingBalance: PropTypes.bool,
  showGettingBalance: PropTypes.bool,
  hasPSymbol: PropTypes.bool,
  stylePSymbol: PropTypes.any,
  containerStyle: PropTypes.any,
  testId: PropTypes.object,
};

Amount.defaultProps = {
  size: 'small',
  amount: 0,
  pDecimals: 0,
  symbol: '',
  customStyle: null,
  showSymbol: true,
  isGettingBalance: false,
  showGettingBalance: false,
  hasPSymbol: false,
  stylePSymbol: null,
  containerStyle: null,
  testId: {}
};

export const Symbol = (props) => {
  const {
    symbol,
    networkName,
    isErc20Token,
    isBep2Token,
    styledSymbol,
  } = props;
  return (
    <NormalText
      {...generateTestId(TEST_TOKEN.LBL_SYMBOL)}
      allowFontScaling={false}
      style={[styled.bottomText, styledSymbol]}
      text={`${symbol} ${
        isErc20Token || isBep2Token ? `(${networkName})` : ''
      }`}
    />
  );
};

Symbol.propTypes = {
  symbol: PropTypes.string,
  networkName: PropTypes.string,
  isErc20Token: PropTypes.bool,
  isBep2Token: PropTypes.bool,
  styledSymbol: PropTypes.any,
};

Symbol.defaultProps = {
  symbol: '',
  networkName: '',
  isErc20Token: false,
  isBep2Token: false,
  styledSymbol: null,
};

const TokenPairPRV = (props) => (
  <TouchableOpacity accessible={false} onPress={props?.onPress}>
    <View style={[styled.container, props?.style]}>
      <View style={[styled.extra, styled.extraTop]}>
        <Name {...props} />
        <Amount
          {...props}
          testId={generateTestId(TEST_TOKEN.LBL_TOKEN_AMOUNT)}
        />
      </View>
      <View style={styled.extra}>
        <Price {...props} />
        <AmountBasePRV {...props} />
      </View>
    </View>
  </TouchableOpacity>
);

const TokenDefault = (props) => (
  <TouchableOpacity accessible={false} onPress={props?.onPress}>
    <View style={[styled.container, props?.style]}>
      <View style={styled.extra}>
        <Name {...props} />
        <Amount
          {...{ ...props, customStyle: styled.boldText }}
          testId={generateTestId(TEST_TOKEN.LBL_TOKEN_AMOUNT)}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const TokenPairUSDT = (props) => (
  <TouchableOpacity accessible={false} onPress={props?.onPress}>
    <View style={[styled.container, props?.style]}>
      <View style={[styled.extra, styled.extraTop]}>
        <Name {...props} />
        <Amount
          {...props}
          testId={generateTestId(TEST_TOKEN.LBL_TOKEN_AMOUNT)}
        />
      </View>
      <View style={styled.extra}>
        <Price {...props} />
        <AmountBaseUSDT {...props} />
      </View>
    </View>
  </TouchableOpacity>
);

export const Follow = (props) => {
  const { shouldShowFollowed, isFollowed } = props;
  if (!shouldShowFollowed) {
    return null;
  }
  if (isFollowed) {
    return <Text {...generateTestId(TEST_TOKEN.LBL_ADDED)} style={styled.followText}>Added</Text>;
  }
  return null;
};

Follow.propTypes = {
  shouldShowFollowed: PropTypes.bool.isRequired,
  isFollowed: PropTypes.bool.isRequired,
  tokenId: PropTypes.number.isRequired,
};

const Token = (props) => {
  const {
    handleRemoveToken = null,
    swipable = false,
    pricePrv,
    isPRV
  } = props;
  const isToggleUSD = useSelector(currencySelector);
  let TokenComponent;
  if (isToggleUSD) {
    TokenComponent = (<TokenPairUSDT {...props} />);
  }
  else {
    const pairWithPRV = pricePrv !== 0 && !isPRV;
    TokenComponent = pairWithPRV ? (
      <TokenPairPRV {...props} />
    ) : (
      <TokenDefault {...props} />
    );
  }


  if (swipable === true) {
    return (
      <Swipeout
        autoClose
        style={{
          backgroundColor: 'transparent',
        }}
        right={[
          {
            component: (
              <BtnDelete
                showIcon={false}
                onPress={
                  typeof handleRemoveToken === 'function'
                    ? handleRemoveToken
                    : null
                }
              />
            ),
          },
        ]}
      >
        {TokenComponent}
      </Swipeout>
    );
  }
  return TokenComponent;
};

Token.defaultProps = {
  displayName: 'Sample name',
  amount: 0,
  onPress: null,
  symbol: null,
  isGettingBalance: false,
  style: null,
  pDecimals: null,
  isVerified: false,
  iconUrl: null,
  amountInPRV: 0,
  price: 0,
  percentChange: 0,
  pricePrv: 0,
};

Token.propTypes = {
  pDecimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  displayName: PropTypes.string,
  amount: PropTypes.number,
  onPress: PropTypes.func,
  symbol: PropTypes.string,
  isGettingBalance: PropTypes.bool,
  style: PropTypes.any,
  isVerified: PropTypes.bool,
  iconUrl: PropTypes.string,
  amountInPRV: PropTypes.number,
  price: PropTypes.number,
  percentChange: PropTypes.number,
  pricePrv: PropTypes.number,
  swipable: PropTypes.bool,
  removable: PropTypes.bool,
  handleRemoveToken: PropTypes.func,
};

export default withToken(React.memo(Token));
