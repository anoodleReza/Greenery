/* eslint-disable prettier/prettier */
import {Button, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export default function MerchantDetails({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <Button
        title="Register"
        onPress={() => {
          navigation.dispatch(StackActions.replace('MerchantSignin'));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
