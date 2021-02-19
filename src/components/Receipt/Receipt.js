import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from '@src/components/core';
import linkingService from '@src/services/linking';
import IconOpenUrl from '@src/components/Icons/icon.openUrl';
import Header from '@src/components/Header';
import { generateTestId } from '@utils/misc';
import { styled } from './Receipt.styled';
import withReceipt from './Receipt.enhance';

const Hook = ({ label, desc, renderTx = false, testId = {} }) => {
  const handleOpenUrl = () => linkingService.openUrl(desc);
  let renderComponent = () => (
    <View accessible={false} style={styled.hook}>
      <Text style={styled.label} ellipsizeMode="middle" numberOfLines={1}>
        {`${label}:`}
      </Text>
      <Text
        style={styled.desc}
        ellipsizeMode="middle"
        numberOfLines={1}
        {...generateTestId(testId)}
      >
        {desc}
      </Text>
      {renderTx && <IconOpenUrl />}
    </View>
  );
  if (renderTx) {
    return (
      <TouchableOpacity
        accessible={false}
        onPress={handleOpenUrl}
      >
        {renderComponent()}
      </TouchableOpacity>
    );
  }
  return renderComponent();
};

const ReceiptModal = (props) => {
  const { infoFactories, onBack, btnSaveReceiver, title } = props;

  return (
    <View style={styled.container}>
      <Header onGoBack={onBack} />
      <Text style={styled.title}>{title}</Text>
      <View style={styled.infoContainer}>
        {infoFactories.map((item, key) =>
          item.disabled ? null : <Hook key={key} {...item} />,
        )}
      </View>
      {btnSaveReceiver}
    </View>
  );
};

Hook.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

ReceiptModal.defaultProps = {
  btnSaveReceiver: null,
};

ReceiptModal.propTypes = {
  infoFactories: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
  btnSaveReceiver: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default withReceipt(ReceiptModal);
