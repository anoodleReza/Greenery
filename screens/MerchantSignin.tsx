//basic
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
//user session security
import auth, {firebase} from '@react-native-firebase/auth';

export default function MerchantSignin({navigation}: {navigation: any}) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('user already signed in');
        navigation.dispatch(StackActions.replace('MerchantHomepage'));
      }
    });
  }, [navigation]);

  //formik validation
  const SignupSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });
  //what is displayed
  return (
    //form setup
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      //activate validation
      validationSchema={SignupSchema}
      //submit form values
      onSubmit={values => {
        //login
        auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(userCredential => {
            console.log('signed in as ', userCredential.user.email);
            //next page
            navigation.dispatch(StackActions.replace('MerchantHomepage'));
          })
          .catch(error => {
            const errorCode = error.code;
            console.log(errorCode);
            //wrong credentials
          });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={styles.container}>
          {/* Image section */}
          <Image style={styles.Image} source={require('../assets/logo.png')} />
          {/* Input section */}
          <TextInput
            mode="outlined"
            placeholder="Enter Email..."
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
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
