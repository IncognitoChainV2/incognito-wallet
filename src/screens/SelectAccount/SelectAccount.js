import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { accountSeleclor } from '@src/redux/selectors';
import PropTypes from 'prop-types';
import { switchAccount } from '@src/redux/actions/account';
import Header from '@src/components/Header';
import { withLayout_2 } from '@src/components/Layout';
import { useNavigation } from 'react-navigation-hooks';
import {
  defaultAccountNameSelector,
} from '@src/redux/selectors/account';
import { Toast } from '@src/components/core';
import { ExHandler } from '@src/services/exception';
import { formValueSelector } from 'redux-form';
import { searchBoxConfig } from '@src/components/Header/Header.searchBox';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import { styled, itemStyled } from './SelectAccount.styled';

const AccountItem = ({ accountName, PaymentAddress }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const defaultAccountName = useSelector(defaultAccountNameSelector);
  if (!accountName) {
    return null;
  }
  const onSelectAccount = async () => {
    try {
      if (accountName === defaultAccountName) {
        Toast.showInfo(`Your current account is "${accountName}"`);
        return;
      }
      await dispatch(switchAccount(accountName));
      navigation.goBack();
      Toast.showInfo(`Switched to account "${accountName}"`);
    } catch (e) {
      new ExHandler(
        e,
        `Can not switch to account "${accountName}", please try again.`,
      ).showErrorToast();
    }
  };
  return (
    <TouchableOpacity onPress={onSelectAccount}>
      <View style={itemStyled.container}>
        <Text style={itemStyled.name} numberOfLines={1}>
          {accountName}
        </Text>
        <Text
          style={itemStyled.address}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {PaymentAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ListAccount = () => {
  const selector = formValueSelector(searchBoxConfig.form);
  const keySearch = (
    useSelector(state => selector(state, searchBoxConfig.searchBox)) || ''
  )
    .trim()
    .toLowerCase();
  const listAccount = useSelector(accountSeleclor.listAccountSelector);
  const [state, setState] = React.useState({
    data: [],
  });
  const handleSearchAccount = async () => {
    await setState({
      ...state,
      data: isEmpty(keySearch)
        ? listAccount
        : [
          ...listAccount.filter(
            account =>
              includes(account?.accountName.toLowerCase(), keySearch) ||
                includes(account?.name.toLowerCase(), keySearch),
          ),
        ],
    });
  };
  React.useEffect(() => {
    handleSearchAccount();
  }, [keySearch]);
  const { data } = state;
  return (
    <ScrollView style={{ marginTop: 30 }}>
      {data.map(item => (
        <AccountItem key={item?.accountName} {...item} />
      ))}
    </ScrollView>
  );
};

const SelectAccount = () => {
  return (
    <View style={styled.container}>
      <Header title="Select a key" titleStyled={styled.titleStyled} canSearch />
      <ListAccount />
    </View>
  );
};

AccountItem.propTypes = {
  accountName: PropTypes.string.isRequired,
  PaymentAddress: PropTypes.string.isRequired,
};

SelectAccount.propTypes = {};

export default withLayout_2(SelectAccount);
