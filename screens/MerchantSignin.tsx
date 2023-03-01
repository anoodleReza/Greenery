//basic
import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Axios from 'axios';
//user session security
import * as Keychain from 'react-native-keychain';

export default function MerchantSignin({navigation}: {navigation: any}) {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={values => {
        //send to server
        //not sure about the link, maybe we need to make it cloud based? but it works
        //login
        Axios.post('http://10.0.2.2:3001/login', {
          username: values.username,
          password: values.password,
        }).then(response => {
          if (!response.data.message) {
            //correct user information
            //set session to data from here
            handleLogin(response.data[0].username, response.data[0].password);
          } else {
            //wrong credentials
            console.log(response.data.message);
          }
        });
        //next page
        navigation.dispatch(StackActions.replace('MerchantHomepage'));
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.container}>
          {/* Image section */}
          <Image style={styles.Image} source={require('../assets/logo.png')} />
          {/* Input section */}
          <TextInput
            mode="outlined"
            placeholder="Enter Username..."
            style={styles.input}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          <TextInput
            mode="outlined"
            placeholder="Enter password..."
            style={styles.input}
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {/* Bottom Buttons */}
          <Button
            style={styles.buttonDefault}
            textColor="black"
            mode="contained"
            onPress={handleSubmit}>
            Sign In
          </Button>

          <Text>
            <Text>Don't have an Accoount? Sign Up </Text>
            <Text
              style={styles.Highlight}
              onPress={() => {
                navigation.dispatch(StackActions.replace('MerchantSignup'));
              }}>
              Here
            </Text>
          </Text>
        </View>
      )}
    </Formik>
  );
}
const handleLogin = async (usernameSes: string, passwordSes: string) => {
  console.log('storing credentials');
  await Keychain.setGenericPassword(usernameSes, passwordSes);
};

//we need to make a separate stylesheet file and import it here instead to kkeep the styling normalized for all pages
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Highlight: {
    color: '#0066FF',
    textDecorationLine: 'underline',
  },
  input: {
    width: 280,
    margin: 4,
  },
  buttonDefault: {
    margin: 10,
  },
  surface: {
    padding: 8,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  Image: {
    width: 200,
    height: 200,
  },
});
