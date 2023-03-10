import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Button} from 'react-native-paper';
//user session security

export default function Homepage({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require('../assets/logo.png')} />

      <View>
        <Button
          onPress={() => {
            navigation.dispatch(StackActions.replace('MerchantSignin'));
          }}
          style={styles.buttonDefault}
          textColor="black"
          mode="contained">
          Merchant Log In
        </Button>

        <Button
          onPress={() => {
            navigation.dispatch(StackActions.replace('PartnerSignin'));
          }}
          style={styles.buttonDefault}
          textColor="black"
          mode="contained">
          Partner Log In
        </Button>

        <Button
          onPress={() => {
            navigation.dispatch(StackActions.replace(''));
          }}
          style={styles.buttonDefault}
          textColor="black"
          mode="contained">
          User Log In
        </Button>
        <Button
          onPress={() => {
            navigation.dispatch(StackActions.replace('MerchantDetails'));
          }}
          style={styles.buttonDefault}
          textColor="black"
          mode="contained">
          Dev: Merchant Details
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Image: {
    width: 200,
    height: 200,
  },

  buttonDefault: {
    margin: 10,
  },
});
