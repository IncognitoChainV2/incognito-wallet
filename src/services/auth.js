import storageService from '@src/services/storage';
import { setTokenHeader } from '@src/services/http';
import { CONSTANT_KEYS } from '@src/constants';
import { getToken as getFirebaseToken } from '@src/services/firebase';
import DeviceInfo from 'react-native-device-info';
import { getToken as getUserToken } from '@src/services/api/user';
import { CustomError, ErrorCode } from './exception';

export const getToken = async () => {
  const firebaseToken = await getFirebaseToken();
  const uniqueId = DeviceInfo.getUniqueId();
  const tokenData = await getUserToken(uniqueId, firebaseToken);
  const { token } = tokenData;

  return token;
};

export const login = async () => {
  try {
    // get existed token
    let token = await storageService.getItem(CONSTANT_KEYS.DEVICE_TOKEN);

    // if not existed, get new one
    if (!token) {
      const newToken = await getToken();

      // save new token to device storage
      storageService.setItem(CONSTANT_KEYS.DEVICE_TOKEN, newToken);
      token = newToken;
    }

    // set the token to axios header
    setTokenHeader(token);

    return token;
  } catch (e) {
    throw new CustomError(ErrorCode.user_login_failed, { rawError: e });
  }
};

export const logout = async () => {
  storageService.clear(CONSTANT_KEYS.DEVICE_TOKEN);
};
