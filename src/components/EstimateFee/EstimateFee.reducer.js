import { CONSTANT_COMMONS } from '@src/constants';
import format from '@src/utils/format';
import convert from '@src/utils/convert';
import { floor, isNull, isEmpty } from 'lodash';
import {
  ACTION_FETCHING_FEE,
  ACTION_FETCHED_FEE,
  ACTION_FETCH_FAIL_FEE,
  ACTION_ADD_FEE_TYPE,
  ACTION_CHANGE_FEE_TYPE,
  ACTION_FETCHED_PTOKEN_FEE,
  ACTION_FETCHED_MIN_PTOKEN_FEE,
  ACTION_CHANGE_FEE,
  ACTION_INIT,
  ACTION_INIT_FETCHED,
  ACTION_FETCHED_MAX_FEE_PRV,
  ACTION_FETCHED_MAX_FEE_PTOKEN,
  ACTION_FETCHED_VALID_ADDR,
  ACTION_FETCHED_USER_FEES,
  ACTION_FETCHING_USER_FEES,
  ACTION_TOGGLE_FAST_FEE,
} from './EstimateFee.constant';
import { MAX_FEE_PER_TX, hasMultiLevelUsersFee } from './EstimateFee.utils';

const initialState = {
  isFetching: false,
  isFetched: false,
  minFeePrv: null,
  minFeePrvText: null,
  feePrv: null,
  feePrvText: '',
  maxFeePrv: null,
  maxFeePrvText: null,
  feePToken: null,
  feePTokenText: '',
  feeBurnPToken: null,
  feeBurnPTokenText: '',
  minFeePToken: null,
  minFeePTokenText: '',
  maxFeePToken: null,
  maxFeePTokenText: '',
  amount: null,
  amountText: '',
  minAmount: null,
  minAmountText: '',
  init: false,
  screen: '',
  types: [
    {
      tokenId: CONSTANT_COMMONS.PRV.id,
      symbol: CONSTANT_COMMONS.PRV.symbol,
    },
  ],
  actived: CONSTANT_COMMONS.PRV.id,
  rate: 1,
  isAddressValidated: true,
  isValidETHAddress: true,
  userFees: {
    isFetching: false,
    isFetched: false,
    data: null,
    hasMultiLevel: false,
  },
  isValidating: false,
  fast2x: false,
  totalFeePrv: null,
  totalFeePrvText: '',
  userFeePrv: null,
  totalFeePToken: null,
  totalFeePTokenText: '',
  userFeePToken: null,
  isFetchedMinMaxWithdraw: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_INIT: {
    return {
      ...initialState,
    };
  }
  case ACTION_INIT_FETCHED: {
    return {
      ...state,
      ...action.payload,
      init: true,
    };
  }
  case ACTION_FETCHED_MIN_PTOKEN_FEE: {
    return {
      ...state,
      ...action.payload,
    };
  }
  case ACTION_FETCHING_FEE: {
    return {
      ...state,
      isFetching: true,
    };
  }
  case ACTION_FETCHED_FEE: {
    return {
      ...state,
      isFetching: false,
      isFetched: true,
      ...action.payload,
    };
  }
  case ACTION_FETCH_FAIL_FEE: {
    return {
      ...state,
      isFetched: false,
      isFetching: false,
      feePrv: MAX_FEE_PER_TX,
    };
  }
  case ACTION_ADD_FEE_TYPE: {
    const { tokenId } = action.payload;
    if (tokenId === CONSTANT_COMMONS.PRV.id) {
      return state;
    }
    return {
      ...state,
      types: [...initialState.types, action.payload],
    };
  }
  case ACTION_CHANGE_FEE_TYPE: {
    return {
      ...state,
      actived: action.payload,
    };
  }
  case ACTION_FETCHED_PTOKEN_FEE: {
    return {
      ...state,
      ...action.payload,
    };
  }
  case ACTION_CHANGE_FEE: {
    const { value, isUseTokenFee, feePDecimals } = action.payload;
    const field = isUseTokenFee ? 'feePTokenText' : 'feePrvText';
    const fieldOriginal = isUseTokenFee ? 'feePToken' : 'feePrv';
    const valueToNumber = convert.toNumber(value, true);
    const valueOriginal = convert.toOriginalAmount(
      valueToNumber,
      feePDecimals,
      false,
    );
    const _valueOriginal = floor(valueOriginal);
    return {
      ...state,
      [field]: value,
      [fieldOriginal]: _valueOriginal,
    };
  }
  case ACTION_FETCHED_MAX_FEE_PRV: {
    const accountBalance = action.payload;
    const maxFeePrv = accountBalance;
    const maxFeePrvText = format.toFixed(
      convert.toHumanAmount(maxFeePrv, CONSTANT_COMMONS.PRV.pDecimals),
      CONSTANT_COMMONS.PRV.pDecimals,
    );
    return {
      ...state,
      maxFeePrv,
      maxFeePrvText,
    };
  }
  case ACTION_FETCHED_MAX_FEE_PTOKEN: {
    const { amount, pDecimals } = action.payload;
    const amountText = format.toFixed(
      convert.toHumanAmount(amount, pDecimals),
      pDecimals,
    );
    return {
      ...state,
      amount,
      amountText,
      maxFeePToken: amount,
      maxFeePTokenText: amountText,
    };
  }
  case ACTION_FETCHED_VALID_ADDR: {
    const { isAddressValidated, isValidETHAddress } = action.payload;
    return {
      ...state,
      isAddressValidated,
      isValidETHAddress,
    };
  }
  case ACTION_FETCHED_USER_FEES: {
    const data = action.payload;
    console.debug('DATA_USER_FEES', data, isEmpty(data));
    if (isEmpty(data)) {
      return state;
    }
    const hasMultiLevel = hasMultiLevelUsersFee(data);
    return {
      ...state,
      userFees: {
        ...state.userFees,
        isFetched: true,
        isFetching: false,
        data: { ...data },
        hasMultiLevel,
      },
    };
  }
  case ACTION_FETCHING_USER_FEES: {
    return {
      ...state,
      userFees: {
        ...state.userFees,
        isFetching: true,
      },
    };
  }
  case ACTION_TOGGLE_FAST_FEE: {
    const {
      fast2x,
      totalFee,
      totalFeeText,
      userFee,
      isUsedPRVFee,
    } = action.payload;
    const totalFeeField = isUsedPRVFee ? 'totalFeePrv' : 'totalFeePToken';
    const totalFeeTextField = isUsedPRVFee
      ? 'totalFeePrvText'
      : 'totalFeePTokenText';
    const userFeeField = isUsedPRVFee ? 'userFeePrv' : 'userFeePToken';

    return {
      ...state,
      fast2x,
      [totalFeeField]: totalFee,
      [totalFeeTextField]: totalFeeText,
      [userFeeField]: userFee,
    };
  }
  default:
    return state;
  }
};
