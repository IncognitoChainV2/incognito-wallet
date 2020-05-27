import { FONT } from '@src/styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
  },
  centerAlign: {
    alignItems: 'center',
  },
  centerJustify: {
    justifyContent: 'center'
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  token: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bigText: {
    fontSize: 26,
    ...FONT.STYLE.bold,
  },
  inputContainer: {
    width: '65%',
  },
});
