//building the screen
import {Button, Avatar} from 'react-native-paper';
import {StyleSheet, Text, View, TextInput} from 'react-native';
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
import { styles } from '../Style';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserInfo = async () => {
    if (curUser?.uid) {
      console.log('Accessing documents as ', curUser?.uid);
      firestore()
        .collection('merchant')
        .doc(curUser?.uid)
        .get()
        .then(documentSnapshot => {
          // Document fields
          const userDetails = documentSnapshot.data();
          // All the document related data
          setname(userDetails?.Name);
          setcategory(userDetails?.Category);
          setprice(userDetails?.Price);
          setaddress(userDetails?.Address);
          setopening(userDetails?.Opening);
          setclosing(userDetails?.Closing);
        });
    }
  };

  //Fetch user data on start
  useEffect(() => {
    if (!isLoggedIn) {
      if (curUser) {
        fetchUserInfo();
        setIsLoggedIn(true);
      } else {
        console.log('Error in retrieving user data');
      }
    }
  }, [curUser, fetchUserInfo, isLoggedIn]);

  //Used for logout
  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    setIsLoggedIn(false);
    navigation.dispatch(StackActions.replace('PartnerSignin'));
  };

  return (
    <View>
      <ScrollView>
        {/* Banner */}
        <PartnerHeader />
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
              Name: '',
              Category: '',
              Price: '',
              Address: '',
              Opening: '',
              Closing: '',
            }}
            onSubmit={values => {
              if (firestore().collection('merchant').doc(curUser?.uid)) {
                //user data found found
                console.log('user data found');
                firestore()
                  .collection('merchant')
                  .doc(curUser?.uid)
                  .set({
                    Name: values.Name,
                    Category: values.Category,
                    Price: values.Price,
                    Address: values.Address,
                    Opening: values.Opening,
                    Closing: values.Closing,
                  })
                  .then(() => {
                    console.log('User updated!');
                  });
              }
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <Text style={styles.Subheading}>Change Vehicle Details:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Type..."
                  id="RestoName"
                  value={values.Name}
                  onChangeText={handleChange('Name')}
                  onBlur={handleBlur('Name')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Description..."
                  id="Category"
                  value={values.Category}
                  onChangeText={handleChange('Category')}
                  onBlur={handleBlur('Category')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Type..."
                  id="Price"
                  value={values.Price}
                  onChangeText={handleChange('Price')}
                  onBlur={handleBlur('Price')}
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
                  onPress={handleSubmit}>
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
