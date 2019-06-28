import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Text, Container, ScrollView, Button, View } from '@src/components/core';
import ROUTE_NAMES from '@src/router/routeNames';
import OptionMenu from '@src/components/OptionMenu';
import MdIcons from 'react-native-vector-icons/Octicons';
import MdCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FSIcons from 'react-native-vector-icons/FontAwesome5';

import formatUtil from '@src/utils/format';
import styles from './style';

class WalletDetail extends Component {
  constructor() {
    super();

    this.state = {      
      
    };    
    
  }

  componentDidMount() {
    
  }
  goHome = () => {
    const { navigation } = this.props;
    navigation.navigate(ROUTE_NAMES.RootApp);
  };


  getMenuData = () => {

    return [
      {
        id: 'deposit',
        label: 'Deposit',
        //handlePress: handleSendToken,
        icon: <FSIcons name='hand-holding-usd' size={20} />
      },
      {
        id: 'withdraw',
        label: 'Withdraw',
        //handlePress: () => onRemoveFollowToken(token.ID),
        icon: <MdCIcons name='cash-refund' size={20} />
      },
      {
        id: 'preferences',
        label: 'Preferences',
        //handlePress: handleShowHistory,
        icon: <MdIcons name='settings' size={22} />
      }
    ];
  }

  handleSendbtn = () => {
    const { navigation } = this.props;
    navigation.navigate(ROUTE_NAMES.SendCrypto);
  }
  handleReceivebtn = () => {
    const { navigation } = this.props;
    navigation.navigate(ROUTE_NAMES.ReceiveCrypto);
  }
  

  render() { 
    const { selectedPrivacy } = this.props;   
    return (
      <ScrollView>
        <Container style={styles.container}> 

          <View style={styles.boxHeader}> 
            <OptionMenu iconProps={{color: '#fff'}} data={this.getMenuData()} /> 

            <View style={styles.boxBalance}>
              <Text style={styles.balance}>
                {formatUtil.amount(selectedPrivacy?.amount, selectedPrivacy.symbol)} {selectedPrivacy.symbol}
              </Text>
              {/* <Text style={styles.getFree}>Get free coin</Text> */}

              <View style={styles.boxButton}>
                <Button title='Receive' onPress={this.handleReceivebtn} style={styles.btnStyle} />
                <Button title='Send' onPress={this.handleSendbtn} style={styles.btnStyle} />
              </View>

            </View>

          </View>
          <Text style={styles.title}>Send Constant</Text>
          
          <Text style={styles.noteText}>* Only send CONSTANT to a CONSTANT address.</Text>
          
        </Container>        
      </ScrollView>
    );
  }
}

WalletDetail.propTypes = {
  // navigation: PropTypes.object,
  // wallet: PropTypes.object,
  // account: PropTypes.object,
  // getBalance: PropTypes.func
};

export default WalletDetail;