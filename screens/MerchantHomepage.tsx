import {Button} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackActions} from '@react-navigation/native';
//user session security
import * as Keychain from 'react-native-keychain';

export default function MerchantHomepage({navigation}: {navigation: any}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setIsLoggedIn(true);
          setUsername(credentials.username);
          console.log('Logged in as ', username);
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  });

  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout) {
      setIsLoggedIn(false);
      setUsername('');
    }
    navigation.dispatch(StackActions.replace('MerchantSignin'));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome {username}</Text>
      <Button textColor="black" mode="contained" onPress={handleLogout}>
        Log Out
      </Button>
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
