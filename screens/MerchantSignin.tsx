//basic
import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import Axios from 'axios';

export default function MerchantSignin({navigation}: {navigation: any}) {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={values => {
        console.log(values);
        //send to server
        //not sure about the link, maybe we need to make it cloud based? but it works
        //login
        Axios.post('http://10.0.2.2:3001/login', {
          username: values.username,
          password: values.password,
        }).then(response => {
          //console.log(response);
          console.log('credentials sent');
        });
        //next page
        //navigation.dispatch(StackActions.replace('MerchantHomepage'));
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
