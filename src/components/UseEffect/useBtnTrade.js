import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';
import { selectedPrivacySeleclor } from '@src/redux/selectors';
import { CONSTANT_COMMONS } from '@src/constants';
import { ButtonBasic } from '@src/components/Button';
import routeNames from '@src/router/routeNames';
import { COLORS, FONT } from '@src/styles';
import useFeatureConfig from '@src/shared/hooks/featureConfig';
import appConstant from '@src/constants/app';
import { generateTestId } from '@utils/misc';
import { TEST_HEADER } from '@src/constants/elements';

const styled = StyleSheet.create({
  btnTrade: {
    backgroundColor: COLORS.colorGrey,
    paddingHorizontal: 18,
    height: 40,
    maxWidth: 80,
  },
  titleBtnTrade: {
    color: COLORS.black,
    fontSize: FONT.SIZE.regular - 1,
    lineHeight: FONT.SIZE.regular + 4,
    fontFamily: FONT.NAME.medium,
  },
  disableBtnTrade: {
    opacity: 0.4
  }
});

export const useBtnTrade = () => {
  const navigation = useNavigation();
  const selectedPrivacy = useSelector(selectedPrivacySeleclor.selectedPrivacy);
  const [ onPress, isDisabled ] = useFeatureConfig(appConstant.DISABLED.TRADE);

  const hasTradeBtn =
    selectedPrivacy?.pairWithPrv &&
    selectedPrivacy?.tokenId !== CONSTANT_COMMONS.PRV.id;

  const _onTradePress = () => {
    if (isDisabled && onPress) {
      onPress();
      return;
    }
    navigation.navigate(routeNames.Trade, {
      inputTokenId: CONSTANT_COMMONS.PRV.id,
      outputTokenId: selectedPrivacy?.tokenId,
    });
  };

  const BtnTrade = () =>
    hasTradeBtn ? (
      <ButtonBasic
        title="Trade"
        btnStyle={[styled.btnTrade, isDisabled && styled.disableBtnTrade]}
        titleStyle={styled.titleBtnTrade}
        onPress={_onTradePress}
        {...generateTestId(TEST_HEADER.BTN_TRADE)}
      />
    ) : null;
  return [BtnTrade, hasTradeBtn];
};
