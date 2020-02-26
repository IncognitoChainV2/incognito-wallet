import { genNamspace } from '@src/utils/reduxUtils';

const n = genNamspace('ACCOUNT');

// define types here
const TYPES = {
  SET: n('SET'),
  SET_LIST: n('SET_LIST'),
  REMOVE_BY_PRIVATE_KEY: n('REMOVE_BY_PRIVATE_KEY'),
  GET_BALANCE: n('GET_BALANCE'),
  GET_BALANCE_FINISH: n('GET_BALANCE_FINISH'),
  SET_DEFAULT_ACCOUNT: n('SET_DEFAULT_ACCOUNT')
};

export default TYPES;
