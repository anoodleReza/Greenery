//basic
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';

//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {styles} from '../authStyles';

//user session security
import auth, {firebase} from '@react-native-firebase/auth';
const user = firebase.auth().currentUser;

export default function PartnerSignin({navigation}: {navigation: any}) {
  useEffect(() => {
    if (user?.uid) {
      //user is signed in already
      console.log('user already signed in');
      navigation.dispatch(StackActions.replace('PartnerHomepage'));
    }
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
          .then((userCredential: {user: {email: any}}) => {
            console.log('signed in as ', userCredential.user.email);
            //next page
            navigation.dispatch(StackActions.replace('PartnerHomepage'));
          })
          .catch((error: {code: any}) => {
            const errorCode = error.code;
            console.log(errorCode);
            //wrong credentials
          });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <View style={styles.container}>
          {/* Image section */}
          <Image
            style={styles.Image}
            source={require('../../assets/logo.png')}
          />
          {/* Input section */}
          <TextInput
            mode="outlined"
            placeholder="Enter Email..."
            style={styles.paperinput}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
          />
          <TextInput
            mode="outlined"
            placeholder="Enter password..."
            style={styles.paperinput}
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
                navigation.dispatch(StackActions.replace('PartnerSignup'));
              }}>
              Here
            </Text>
          </Text>
          <Text> Return to Homepage?</Text>
          <Text
            style={styles.Highlight}
            onPress={() => {
              navigation.dispatch(StackActions.replace('Homepage'));
            }}>
            Here
          </Text>
        </View>
      )}
    </Formik>
  );
}
