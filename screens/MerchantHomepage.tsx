import {Button} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
//user session security
import auth, {firebase} from '@react-native-firebase/auth';

export default function MerchantHomepage({navigation}: {navigation: any}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (user != null) {
      if (user.email != null) {
        setEmail(user.email);
      } else {
        console.log('Error in retrieving user email');
      }
    } else {
      console.log('Error in retrieving user data');
    }
  }, [user]);

  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
        setEmail('');
      });
    navigation.dispatch(StackActions.replace('MerchantSignin'));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome {email}</Text>
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
