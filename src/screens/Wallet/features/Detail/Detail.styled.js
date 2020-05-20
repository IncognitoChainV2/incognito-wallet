import { StyleSheet } from 'react-native';
import { FONT, COLORS } from '@src/styles';

export const styled = StyleSheet.create({
  container: { flex: 1 },
  btnTrade: {
    backgroundColor: COLORS.colorGrey,
    paddingHorizontal: 18,
    height: 40,
  },
  titleBtnTrade: {
    color: COLORS.black,
    fontSize: FONT.SIZE.regular - 1,
    fontFamily: FONT.NAME.regular,
  },
});

export const groupBtnStyled = StyleSheet.create({
  groupButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle: {
    width: '100%',
    maxWidth: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    color: COLORS.white,
  },
});

export const balanceStyled = StyleSheet.create({
  container: {
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 42,
  },
  amount: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superLarge + 10,
    lineHeight: FONT.SIZE.superLarge + 18,
    color: COLORS.black,
    maxWidth: '80%',
  },
  amountBasePRV: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 3,
    color: COLORS.colorGreyBold,
  },
  changePrice: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 3,
  },
  hook: {
    flexDirection: 'row',
    marginTop: 10,
  },
  pSymbol: {
    color: COLORS.colorGreyBold,
    fontFamily: FONT.NAME.specialRegular,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 3,
  },
});

export const historyStyled = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 35,
  },
});