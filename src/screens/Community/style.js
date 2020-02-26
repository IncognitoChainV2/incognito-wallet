import { COLORS } from '@src/styles';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundColor: COLORS.lightGrey5,
    opacity: 0.5,
    borderRadius: 50,
    padding: 15,
  },
  loading: {
    position: 'absolute',
    left: '50%',
    right: '50%',
    top: '50%',
    bottom: '50%',
  }
});

export default style;
