import {TextInput} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MerchantHomepage({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <Text>Hello there</Text>
      <TextInput label="Name" />
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
