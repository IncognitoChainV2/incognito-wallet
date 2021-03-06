import { Text, TouchableOpacity } from '@src/components/core';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  createForm,
  InputField,
  InputQRField,
} from '@src/components/core/reduxForm';
import React from 'react';
import { View } from 'react-native';
import { ButtonBasic } from '@src/components/Button';
import MainLayout from '@components/MainLayout/index';
import styleSheet from './ImportAccount.styled';
// eslint-disable-next-line import/no-cycle
import withImportAccount from './ImportAccount.enhance';

export const formImportAccount = {
  formName: 'formImportAccount',
  privateKey: 'privateKey',
  accountName: 'accountName',
};

const Form = createForm(formImportAccount.formName);

const ImportAccount = (props) => {
  const {
    getAccountValidator,
    getPrivateKeyValidator,
    handleImportAccount,
    handleImportMasterKey,
    toggle,
    randomName,
    handleChangeRandomName,
    disabledForm,
    wantImport,
    onConfirm,
    importing,
    checking,
  } = props;

  const renderForm = () => {
    return (
      <Form>
        {({ handleSubmit, submitting }) => (
          <View>
            {toggle && randomName ? (
              <View style={styleSheet.randomNameField}>
                <Text style={styleSheet.randomNameLabel}>Keychain name</Text>
                <View style={styleSheet.randomNameValue}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styleSheet.randomNameText}
                  >
                    {randomName}
                  </Text>
                  <TouchableOpacity
                    onPress={handleChangeRandomName}
                    style={styleSheet.randomNameChangeBtn}
                  >
                    <Text style={styleSheet.randomNameChangeBtnText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Field
                component={InputField}
                componentProps={{ autoFocus: true, style: { marginTop: 0 } }}
                name="accountName"
                placeholder="Keychain name"
                label="Keychain name"
                validate={getAccountValidator()}
              />
            )}
            <Field
              component={InputQRField}
              name="privateKey"
              placeholder="Enter private key"
              label="Private Key"
              validate={getPrivateKeyValidator()}
            />
            <ButtonBasic
              title={(checking || submitting) ? 'Importing...' : 'Import'}
              btnStyle={styleSheet.submitBtn}
              onPress={checking ? undefined : handleSubmit(handleImportAccount)}
              disabled={disabledForm || submitting || checking}
            />
          </View>
        )}
      </Form>
    );
  };

  const renderConfirm = () => {
    return (
      <View>
        <Text style={styleSheet.actionText}>
          This keychain is not linked to any of your current master keys. Import its master key to restore all associated keychains, or import this keychain only.
        </Text>
        <View style={styleSheet.actions}>
          <ButtonBasic
            title="Import master key"
            btnStyle={[styleSheet.submitBtn, styleSheet.action]}
            onPress={importing ? undefined : handleImportMasterKey}
            disabled={importing}
          />
          <ButtonBasic
            title={importing ? 'Importing...' : 'Import keychain only'}
            btnStyle={[styleSheet.submitBtn, styleSheet.action]}
            onPress={importing ? undefined : onConfirm}
            disabled={importing}
          />
        </View>
      </View>
    );
  };

  return (
    <MainLayout header="Import keychain" scrollable keyboardAware>
      {wantImport ? renderConfirm() : renderForm()}
    </MainLayout>
  );
};

ImportAccount.defaultProps = {};

ImportAccount.propTypes = {
  disabledForm: PropTypes.bool.isRequired,
  getAccountValidator: PropTypes.func.isRequired,
  getPrivateKeyValidator: PropTypes.func.isRequired,
  handleImportAccount: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  randomName: PropTypes.string.isRequired,
  handleChangeRandomName: PropTypes.func.isRequired,
  handleImportMasterKey: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  importing: PropTypes.bool.isRequired,
  wantImport: PropTypes.bool.isRequired,
  checking: PropTypes.bool.isRequired,
};

export default withImportAccount(ImportAccount);
