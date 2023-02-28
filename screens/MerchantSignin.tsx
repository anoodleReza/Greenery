import {Button, StyleSheet, View} from 'react-native';
import * as React from 'react';

export default function MerchantSignin({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('MerchantHomepage')}
      />
      <Button
        title="Don't have an account? Sign up Here"
        onPress={() => navigation.navigate('MerchantSignup')}
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
