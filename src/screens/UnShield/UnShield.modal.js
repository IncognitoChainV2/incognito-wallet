import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { withLayout_2 } from '@components/Layout';
import Header, { useSearchBox } from '@src/components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { availableTokensSelector } from '@src/redux/selectors/shared';
import {
  handleFilterTokenByKeySearch,
  TokenBasic as Token,
} from '@src/components/Token';
import PropTypes from 'prop-types';
import { setSelectedPrivacy } from '@src/redux/actions/selectedPrivacy';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import { compose } from 'recompose';
import withTokenSelect from '@src/components/TokenSelect/TokenSelect.enhance';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
});

const ListToken = props => {
  const { data, handleUnShieldToken } = props;
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styled.flatList}
      data={[...data]}
      renderItem={({ item }) => (
        <Token
          onPress={() => handleUnShieldToken(item)}
          tokenId={item?.tokenId}
          name="displayName"
          symbol="pSymbol"
          showBalance
          showSymbol={false}
        />
      )}
      keyExtractor={token => token?.tokenId}
      extraData={[...data]}
    />
  );
};

const Modal = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tokens = props?.allTokens || [];
  const [result, keySearch] = useSearchBox({
    data: tokens,
    handleFilter: () => handleFilterTokenByKeySearch({ tokens, keySearch }),
  });
  const handleUnShieldToken = async token => {
    const tokenId = token?.tokenId || null;
    if (!tokenId) return;
    await dispatch(setSelectedPrivacy(tokenId));
    navigation.navigate(routeNames.UnShield);
  };
  return (
    <View style={styled.container}>
      <Header title="Search coins" canSearch />
      <ListToken data={result} handleUnShieldToken={handleUnShieldToken} />
    </View>
  );
};

ListToken.propTypes = {
  data: PropTypes.array.isRequired,
  handleUnShieldToken: PropTypes.func.isRequired,
};

Modal.propTypes = {};

export default compose(
  withLayout_2,
  Comp => props => <Comp {...{ ...props, onlyPToken: true }} />,
  withTokenSelect,
)(Modal);
