import sdk from 'papp-sdk';

const { COMMANDS: COMMANDS_SDK, DATA_NAMES: DATA_NAMES_SDK } = sdk;

const SDK_MODULE = 'pappSdk';

const DATA_NAMES = {
  TOKEN_INFO: DATA_NAMES_SDK.TOKEN_INFO,
  PAYMENT_ADDRESS: DATA_NAMES_SDK.PAYMENT_ADDRESS,
  TX_PENDING_RESULT: DATA_NAMES_SDK.TX_PENDING_RESULT,
  LIST_TOKEN: DATA_NAMES_SDK.LIST_TOKEN,
  DEVICE_ID: DATA_NAMES_SDK.DEVICE_ID,
  PUBLIC_KEY: DATA_NAMES_SDK.PUBLIC_KEY,
};

const COMMANDS = {
  SEND_TX: COMMANDS_SDK.SEND_TX,
  SELECT_PRIVACY_TOKEN_BY_ID: COMMANDS_SDK.SELECT_PRIVACY_TOKEN_BY_ID,
  SET_LIST_SUPPORT_TOKEN_BY_ID: COMMANDS_SDK.SET_LIST_SUPPORT_TOKEN_BY_ID,
  REQUEST_OPEN_CAMERA_QR_CODE: COMMANDS_SDK.REQUEST_OPEN_CAMERA_QR_CODE,
  REQUEST_CLOSE_CAMERA: COMMANDS_SDK.REQUEST_CLOSE_CAMERA,
};

export default {
  SDK_MODULE,
  DATA_NAMES,
  COMMANDS,
};
