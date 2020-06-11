import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING, FONT } from '@src/styles';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  rowTextTouchable: {},
  rowText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    position: 'relative',
    height: 30,
  },
  icon: {
    fontSize: 100,
    color: COLORS.primary,
    marginVertical: 40,
  },
  labelText: {
    flex: 1,
    fontFamily: FONT.NAME.medium,
    color: COLORS.colorGreyBold,
    fontSize: 15,
    lineHeight: 18,
    minWidth: 70,
  },
  valueText: {
    flex: 5,
    fontFamily: FONT.NAME.bold,
    color: COLORS.black,
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'left',
  },
  txButton: {
    flex: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  statusValueContainer: {
    textAlign: 'left',
  },
  statusText: {},
  statusRetryBtn: {
    height: 25,
    marginLeft: 20,
  },
  submitBTN: {
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  cancelBTN: {
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    backgroundColor: 'gray',
  },
  warning: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
    fontFamily: FONT.NAME.regular,
    fontSize: 14,
    opacity: 0.8,
  },
  depositAddressContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  copyBlock: {
    marginLeft: 5,
  },
  modalBackground: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000040',
  },
  modalContainer: {
    width: width,
    height: height,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000040',
    borderRadius: 12,
  },
  modalWrapper: {
    width: width,
    height: height,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000040',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    height: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    zIndex: 1,
  },
  titleModal: {
    marginBottom: 10,
    fontSize: 17,
    fontFamily: FONT.NAME.medium,
  },
  txField: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: FONT.NAME.regular,
    width: width * 0.8,
    height: 45,
    borderColor: 'white',
    borderBottomColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 0,
  },
  btnRetryDeposit: {
    height: '100%',
    backgroundColor: COLORS.colorGrey,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 60,
  },
  titleRetryDeposit: {
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    fontFamily: FONT.NAME.regular,
    color: COLORS.black,
  },
});