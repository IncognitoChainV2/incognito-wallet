import { KEY } from '@src/services/wallet/Server';
import { API_BASE_URL_MAINNET, API_BASE_URL_TESTNET, BEP2_URL, CRYPTO_ICON_URL, DEX_BINANCE_TOKEN_URL, EXPLORER_CONSTANT_CHAIN_URL as TEMPLATE_EXPLORER_CONSTANT_CHAIN_URL, INCOGNITO_TOKEN_ICON_URL, MAINNET_SERVER_ADDRESS, PASSPHRASE_WALLET_DEFAULT, PASSWORD_SECRET_KEY, SHARD_ID, TESTNET_SERVER_ADDRESS, TEST_URL } from 'react-native-dotenv';

const TAG = 'Config';
const regex = /<%=.*%>/;


const isMainnet = global.isMainnet??true;

export const prefix_network = isMainnet ?'mainnet':'testnet';
const prefix_Api = isMainnet?'':'test-';

// const API_BASE_URL =  String(TEMPLATE_API_BASE_URL).replace(regex,prefix_Api);
const API_BASE_URL = isMainnet? API_BASE_URL_MAINNET:API_BASE_URL_TESTNET;
const BUILD_VERSION = `3.3.4${isMainnet?'':'-'+API_BASE_URL}`;
const EXPLORER_CONSTANT_CHAIN_URL = String(TEMPLATE_EXPLORER_CONSTANT_CHAIN_URL).replace(regex,prefix_network);
const MASTER_NODE_ADDRESS=isMainnet?MAINNET_SERVER_ADDRESS:TESTNET_SERVER_ADDRESS;
const DEFAULT_LIST_SERVER = KEY.DEFAULT_LIST_SERVER;
let DATA_EXPORT = {
  isMainnet,
  CRYPTO_ICON_URL,
  INCOGNITO_TOKEN_ICON_URL,
  API_BASE_URL,
  PASSWORD_SECRET_KEY,
  SHARD_ID: SHARD_ID || -1,
  EXPLORER_CONSTANT_CHAIN_URL,
  DEFAULT_LIST_SERVER,
  PASSPHRASE_WALLET_DEFAULT,
  TEST_URL,
  MASTER_NODE_ADDRESS,
  BEP2_URL,
  DEX_BINANCE_TOKEN_URL,
  BUILD_VERSION,
} ;

export default {
  ...DATA_EXPORT
};
// export default {
//   CRYPTO_ICON_URL,
//   INCOGNITO_TOKEN_ICON_URL,
//   API_BASE_URL,
//   PASSWORD_SECRET_KEY,
//   SHARD_ID: SHARD_ID || -1,
//   EXPLORER_CONSTANT_CHAIN_URL,
//   DEFAULT_LIST_SERVER,
//   PASSPHRASE_WALLET_DEFAULT,
//   TEST_URL,
//   MASTER_NODE_ADDRESS,
//   BEP2_URL,
//   DEX_BINANCE_TOKEN_URL,
//   BUILD_VERSION
// };
