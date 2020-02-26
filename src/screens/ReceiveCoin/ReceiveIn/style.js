import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '@src/styles';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  mainContainer: {
    flex: 1,
  },
  desc: {
    ...FONT.STYLE.medium,
    marginBottom: 20,
    textAlign: 'center'
  },
  cryptoItem: {
    marginVertical: 5
  },
  addTokenContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100
  },
  addTokenLabel: {
    fontSize: 15
  },
  addTokenBtn: {
    fontSize: 15,
    color: COLORS.blue,
    marginVertical: 20
  }
});
