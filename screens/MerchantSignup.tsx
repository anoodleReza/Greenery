//basic
import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';

//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

//firebase
import auth from '@react-native-firebase/auth';

export default function MerchantSignup({navigation}: {navigation: any}) {
  //formik validation
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Must match "password" field value'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      //activate validation
      validationSchema={SignupSchema}
      onSubmit={values => {
        //registering user
        auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error: ', errorCode, ' : ', errorMessage);
          });
        //next page
        navigation.dispatch(StackActions.replace('MerchantSignin'));
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
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
            error={touched.username && Boolean(errors.username)}
          />
          <TextInput
            mode="outlined"
            placeholder="Enter email address..."
            style={styles.input}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && Boolean(errors.email)}
          />
          <TextInput
            mode="outlined"
            placeholder="Enter password..."
            style={styles.input}
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password && Boolean(errors.password)}
          />
          <TextInput
            mode="outlined"
            placeholder="Confirm password..."
            style={styles.input}
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          />

          {/* Bottom Buttons */}
          <Button
            style={styles.buttonDefault}
            textColor="black"
            mode="contained"
            onPress={handleSubmit}>
            Next
          </Button>

          <Text>
            <Text>Already have an account? Sign In </Text>
            <Text
              style={styles.Highlight}
              onPress={() => {
                navigation.dispatch(StackActions.replace('MerchantSignin'));
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
