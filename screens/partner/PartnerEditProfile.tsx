/* eslint-disable @typescript-eslint/no-unused-vars */
//building the screen
import {Button, SegmentedButtons} from 'react-native-paper';
import {Text, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackActions} from '@react-navigation/native';

//firebase stuff
import {ScrollView} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//form
import {Formik} from 'formik';

//import other screens
import {PartnerNavigation} from '../NavigationBar';
import {PartnerHeader} from '../PageHeader';
import {styles} from '../Style';

//Main funcion
export default function PartnerEditProfile({navigation}: {navigation: any}) {
  const curUser = firebase.auth().currentUser;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //user data
  const [name, setname] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState('');
  const [address, setaddress] = useState('');
  const [opening, setopening] = useState('');
  const [closing, setclosing] = useState('');

  //Fetch data from firestore

  //Fetch user data on start
  useEffect(() => {
    if (!isLoggedIn) {
      if (curUser) {
        setIsLoggedIn(true);
      } else {
        console.log('Error in retrieving user data');
      }
    }
  }, [curUser, isLoggedIn]);

  //Used for logout
  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => navigation.dispatch(StackActions.replace('PartnerSignin')));
    setIsLoggedIn(false);
    //just in case
    navigation.dispatch(StackActions.replace('PartnerSignin'));
  };

  return (
    <View>
      <ScrollView>
        {/* Banner */}
        <PartnerHeader navigation={navigation} />
        {/* Main Content */}
        <View style={styles.centeredContainer}>
          {/* Profile */}
          <Text style={styles.Subheading}>Profile</Text>
          <TextInput style={styles.input} placeholder="Change username..." />
          <TextInput
            style={styles.input}
            placeholder="Change E-Mail address..."
          />
          <TextInput style={styles.input} placeholder="Phone number..." />
          <Button
            style={styles.button}
            textColor="black"
            mode="contained"
            onPress={() => {
              console.log('confirm');
            }}>
            Confirm
          </Button>

          {/* Password */}
          <Text style={styles.Subheading}>Change Password:</Text>
          <TextInput style={styles.input} placeholder="Enter New Password..." />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password..."
          />
          <Button style={styles.button} textColor="black" mode="contained">
            Confirm
          </Button>

          {/* Details */}
          <Formik
            initialValues={{
              VehicleType: '',
              VehicleDescription: '',
              VehiclePlateNumber: '',
            }}
            onSubmit={values => {
              console.log('new values: ', values);
              //**change this to send the form data to the partner database
              // if (firestore().collection('merchant').doc(curUser?.uid)) {
              //   //user data found found
              //   console.log('user data found');
              //   //change this to send the 'change vehicle detils'
              //   firestore()
              //     .collection('merchant')
              //     .doc(curUser?.uid)
              //     .set({
              //       Name: values.Name,
              //       Category: values.Category,
              //       Price: values.Price,
              //       Address: values.Address,
              //       Opening: values.Opening,
              //       Closing: values.Closing,
              //     })
              //     .then(() => {
              //       console.log('User updated!');
              //     });
              // }
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <Text style={styles.Subheading}>Change Vehicle Details:</Text>
                <SegmentedButtons
                  style={styles.segmentButton}
                  value={values.VehicleType}
                  onValueChange={handleChange('VehicleType')}
                  theme={buttons}
                  buttons={[
                    {
                      value: 'Motorcycle',
                      label: 'Motorcycle',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.VehicleType === 'Motorcycle'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                    {
                      value: 'Car',
                      label: 'Car',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.VehicleType === 'Car'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Description..."
                  value={values.VehicleDescription}
                  onChangeText={handleChange('VehicleDescription')}
                  onBlur={handleBlur('VehicleDescription')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Vehicle Plate Number..."
                  id="Price"
                  value={values.VehiclePlateNumber}
                  onChangeText={handleChange('VehiclePlateNumber')}
                  onBlur={handleBlur('VehiclePlateNumber')}
                />

                {/* Confirm Button */}
                <Button
                  style={styles.button}
                  textColor="black"
                  mode="contained"
                  onPress={handleSubmit}>
                  Confirm
                </Button>
                <Text style={styles.Subheading}>Driver Picture:</Text>
                <View style={styles.driverPic} />

                <Button
                  style={styles.button}
                  textColor="black"
                  mode="contained"
                  onPress={() => {
                    console.log('driver picture');
                  }}>
                  Confirm
                </Button>
              </>
            )}
          </Formik>
        </View>

        {/* Logout Button */}
        <View style={styles.container}>
          <Text>Want to log out?</Text>
          <Button
            style={styles.logoutButton}
            textColor="black"
            mode="contained"
            onPress={handleLogout}>
            Log Out
          </Button>
        </View>

        {/* Navigation Bar */}
        <PartnerNavigation navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const buttons = {
  roundness: 5,
  colors: {
    primary: '#A9FDAC',
    accent: '#f1c40f',
    background: '#f2f2f2',
  },
};
