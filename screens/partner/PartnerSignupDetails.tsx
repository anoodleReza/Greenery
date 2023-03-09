//basic
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {styles} from '../authStyles';

//firebase
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function PartnerSignupDetails({navigation}: {navigation: any}) {
  const curUser = firebase.auth().currentUser;
  //formik validation
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require('../../assets/logo.png')} />
      <Formik
        initialValues={{
          PhoneNumber: '',
          VehiclePlate: '',
          VehicleDescription: '',
          Name: '',
        }}
        onSubmit={values => {
          if (firestore().collection('driver').doc(curUser?.uid)) {
            //find driver data document from firestore
            console.log('user data found');
            //write a new document with the new information
            firestore()
              .collection('driver')
              .doc(curUser?.uid)
              .set({
                Name: values.Name,
                PhoneNumber: values.PhoneNumber,
                VehiclePlate: values.VehiclePlate,
                VehicleDescription: values.VehicleDescription,
              })
              .then(() => {
                //update successful
                console.log('User updated!');
                navigation.dispatch(StackActions.replace('PartnerHomepage'));
              });
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <Text style={styles.Subheading}>Driver Information:</Text>
            <TextInput
              style={styles.input}
              placeholder="Driver Name..."
              id="DriverName"
              mode="outlined"
              value={values.Name}
              onChangeText={handleChange('Name')}
              onBlur={handleBlur('Name')}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number..."
              mode="outlined"
              id="PhoneNumber"
              value={values.PhoneNumber}
              onChangeText={handleChange('PhoneNumber')}
              onBlur={handleBlur('PhoneNumber')}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              placeholder="Vehicle Plate Number..."
              id="VehiclePlate"
              value={values.VehiclePlate}
              onChangeText={handleChange('VehiclePlate')}
              onBlur={handleBlur('VehiclePlate')}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              placeholder="Vehicle Description..."
              id="VehicleDescription"
              value={values.VehicleDescription}
              onChangeText={handleChange('VehicleDescription')}
              onBlur={handleBlur('VehicleDescription')}
            />

            {/* Confirm Button */}
            <Button
              style={styles.buttonDefault}
              textColor="black"
              mode="contained"
              onPress={handleSubmit}>
              Confirm
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}
