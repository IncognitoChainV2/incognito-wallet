import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { withLayout_2 } from '@src/components/Layout';
import Header from '@src/components/Header';
import { COLORS, FONT } from '@src/styles';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    marginTop: 15,
  },
  text: {
    color: COLORS.colorGreyBold,
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 4,
    marginBottom: 15,
  },
  title: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 4,
    color: COLORS.black,
    marginBottom: 15,
  },
});

const WhyShield = props => {
  return (
    <View style={styled.container}>
      <Header title="Why Shield" />
      <ScrollView style={styled.scrollview}>
        <Text style={styled.text}>
          To transact anonymously, first you have to shield your crypto. When
          you send coins to be shielded, an identical – but 100% private –
          version is generated. If you withdraw your coins from the Incognito
          network, this privacy version will be burned, and the original will be
          returned. All original coins are stored safely using the methods
          below:
        </Text>
        <Text style={styled.title}>Trustless bridge for Ethereum</Text>
        <Text style={styled.text}>
          For ETH and all ERC20 tokens, your crypto is safely secured in a
          trustless smart contract.
        </Text>
        <Text style={styled.title}>Portal (Upcoming)</Text>
        <Text style={styled.text}>
          For other coins, your crypto is stored in one of the wallets
          maintained by the Incognito Core team. We’re working on a trustless
          solution for this too, called Portal.
        </Text>
      </ScrollView>
    </View>
  );
};

WhyShield.propTypes = {};

export default withLayout_2(WhyShield);