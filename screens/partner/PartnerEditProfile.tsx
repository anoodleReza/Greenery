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
import { PartnerHeader } from '../PageHeader';
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
    navigation.dispatch(StackActions.replace('MerchantSignin'));
  };

  return (
    <View>
      <ScrollView>
        {/* Banner */}
        <PartnerHeader />

        {/* Show profile */}
        <View style={styles.container}>
          <View style={styles.containerrow}>
            <Avatar.Icon size={100} icon="folder" />
            <Text style={styles.profileName}>{name}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.container}>
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

const styles = StyleSheet.create({
  profileName: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 32,
    color: 'black',
    marginHorizontal: 20,
  },
  profileText: {
    fontFamily: 'Inter',
    fontSize: 15,
    color: 'black',
  },
  sticky: {
    position: 'absolute',
  },
  bottomSomething: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 30,
  },
  Subheading: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
    marginTop: 20,
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#A9FDAC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 20,
    width: 300,
    height: 40,
  },
  logoutButton: {
    backgroundColor: '#A9FDAC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    width: 300,
    height: 40,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'column',
  },
  containerrow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
  },
  driverPic: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'gray',
    width: 125,
    height: 125,
    borderRadius: 8,
    marginTop: 10,
  },
});
