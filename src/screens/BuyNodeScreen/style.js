import { COLORS } from '@src/styles';
import { StyleSheet } from 'react-native';
import { ScreenWidth } from '@src/utils/devices';

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
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
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  wallet: {
    flexDirection: 'row', 
    borderRadius: 8, 
    paddingLeft: 5,
    borderColor: COLORS.lightGrey11,
    borderWidth: 0.5,
    marginBottom: 10,
    justifyContent: 'flex-end', 
    alignSelf: 'flex-end',
    alignItems: 'center', 
    alignContent: 'flex-end'
  },
  iconDropDown: {
    alignSelf: 'center', 
    justifyContent: 'center', 
    height: 50,
    marginEnd: 10
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderColor: COLORS.lightGrey3,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
});

export default style;