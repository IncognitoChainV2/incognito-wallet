import {Text, View} from '@src/components/core';
import React from 'react';
import {isIOS} from '@utils/platform';
import {Icon} from 'react-native-elements';
import {COLORS} from '@src/styles';
import styles from '../../styles';

const Guide = () => (
  <View style={styles.guide}>
    {isIOS() ? (
      <View style={[styles.row, styles.center]}>
        <Text>Settings</Text>
        <Icon
          containerStyle={styles.icon}
          color={COLORS.lightGrey2}
          name="chevron-right"
        />
        <Text>Cellular/Mobile data</Text>
        <Icon
          containerStyle={styles.icon}
          color={COLORS.lightGrey2}
          name="chevron-right"
        />
        <Text>Off</Text>
      </View>
    ) : (
      <View style={{marginTop: 10}}>
        <View style={[styles.row, styles.guideLine]}>
          <Text style={styles.bold}>Step 1:</Text>
          <Text>&nbsp;Swipe down from the top of your screen</Text>
        </View>
        <View style={[styles.row, styles.guideLine]}>
          <Text style={styles.bold}>Step 2:</Text>
          <Text>&nbsp;Turn off your mobile data</Text>
        </View>
      </View>
    )}
  </View>
);

export default Guide;