import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast } from '@src/components/core';
import LoadingContainer from '@src/components/LoadingContainer';
import { getBalance as getAccountBalance } from '@src/redux/actions/account';
import { setBulkToken, getBalance } from '@src/redux/actions/token';
import { setSelectedPrivacy, clearSelectedPrivacy } from '@src/redux/actions/selectedPrivacy';
import scheduleService from '@src/services/schedule';
import accountService from '@src/services/wallet/accountService';
import SelectedPrivacyModel from '@src/models/selectedPrivacy';
import routeNames from '@src/router/routeNames';
import { connect } from 'react-redux';
import Home from './Home';

class HomeContainer extends Component {
  componentDidMount() {
    const { account, navigation, clearSelectedPrivacy, getAccountBalance, accountList } = this.props;

    this.getFollowingToken();
    this.getAccountBalance(account);

    scheduleService.reloadAllAccountBalance({
      accounts: accountList,
      getBalance: getAccountBalance
    });


    navigation.addListener(
      'didFocus',
      () => {
        clearSelectedPrivacy();
      }
    );
  }

  componentDidUpdate(prevProps) {
    const { wallet } = this.props;

    // reload tokens list if wallet was changed
    if (prevProps.wallet !== wallet) {
      this.getFollowingToken();
    }
  }

  onAddTokenToFollow = () => {
    const { navigation } = this.props;
    navigation.navigate(routeNames.FollowToken, { isPrivacy: true });
  }

  getTokenBalance = token => {
    const { getBalance } = this.props;
    getBalance(token);
  }

  getAccountBalance = account => {
    const { getAccountBalance } = this.props;
    getAccountBalance(account);
  }

  getFollowingToken = async () => {
    try {
      const { account, wallet, setBulkToken } = this.props;
      const tokens = accountService.getFollowingTokens(account, wallet);
      tokens.forEach(this.getTokenBalance);
      setBulkToken(tokens);
    } catch {
      Toast.showError('Can not get list token for this account');
    }
  }

  handleSelectToken = (token) => {
    if (!token) return;

    const { account, tokens, setSelectedPrivacy, navigation } = this.props;
    const tokenData = tokens.find(t => t.symbol === token.symbol);

    const privacyToken = SelectedPrivacyModel.parse(account, tokenData);
    setSelectedPrivacy(privacyToken);

    navigation.navigate(routeNames.WalletDetail);
  }

  render() {
    const { wallet, account, tokens, isGettingBalanceList } = this.props;

    if (!wallet) return <LoadingContainer />;

    return (
      <Home
        account={account}
        tokens={tokens}
        handleAddFollowToken={this.onAddTokenToFollow}
        isGettingBalanceList={isGettingBalanceList}
        onSelectToken={this.handleSelectToken}
      />
    );
  }
}

const mapState = state => ({
  accountList: state.account.list,
  account: state.account.defaultAccount,
  wallet: state.wallet,
  tokens: state.token.followed || [],
  isGettingBalanceList: [...state.account.isGettingBalance, ...state.token.isGettingBalance]
});

const mapDispatch = { setBulkToken, getBalance, getAccountBalance, setSelectedPrivacy, clearSelectedPrivacy };

HomeContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
  tokens: PropTypes.array.isRequired,
  isGettingBalanceList: PropTypes.array.isRequired,
  wallet: PropTypes.object.isRequired,
  setBulkToken: PropTypes.func.isRequired,
  getAccountBalance: PropTypes.func.isRequired,
  getBalance: PropTypes.func.isRequired,
  setSelectedPrivacy: PropTypes.func.isRequired,
  clearSelectedPrivacy: PropTypes.func.isRequired,
};


export default connect(
  mapState,
  mapDispatch
)(HomeContainer);
