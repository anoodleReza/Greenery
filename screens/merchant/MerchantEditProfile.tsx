//building the screen
import {Button, SegmentedButtons} from 'react-native-paper';
import {Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {StackActions} from '@react-navigation/native';

//firebase stuff
import {ScrollView} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//form
import {Formik} from 'formik';

//import other screens
import MerchantHeader from '../PageHeader';
import MerchantNavigation from '../NavigationBar';
import {styles} from '../Style';

//Main funcion
export default function MerchantEditProfile({navigation}: {navigation: any}) {
  const curUser = firebase.auth().currentUser;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Used for logout
  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => navigation.dispatch(StackActions.replace('MerchantSignin')));
    setIsLoggedIn(false);
    //just in case
    navigation.dispatch(StackActions.replace('MerchantSignin'));
  };

  return (
    <View>
      <ScrollView>
        {/* Banner */}
        <MerchantHeader navigation={navigation} />

        {/* Main Content */}
        <View style={styles.container}>
          {/* Profile */}
          <Text style={styles.Subheading}>Login Information:</Text>
          <TextInput style={styles.input} placeholder="Change username..." />
          <TextInput
            style={styles.input}
            placeholder="Change E-Mail address..."
          />
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
                <Text style={styles.Subheading}>Restaurant Details:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Restaurant Name..."
                  value={values.Name}
                  onChangeText={handleChange('Name')}
                  onBlur={handleBlur('Name')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Restaurant Category..."
                  value={values.Category}
                  onChangeText={handleChange('Category')}
                  onBlur={handleBlur('Category')}
                />
                <SegmentedButtons
                  style={styles.segmentButton}
                  value={values.Price}
                  onValueChange={handleChange('Price')}
                  theme={buttons}
                  buttons={[
                    {
                      value: 'Low',
                      label: 'Low',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.Price === 'Low'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                    {
                      value: 'Medium',
                      label: 'Medium',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.Price === 'Medium'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                    {
                      value: 'High',
                      label: 'High',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.Price === 'High'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                  ]}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address..."
                  value={values.Address}
                  onChangeText={handleChange('Address')}
                  onBlur={handleBlur('Address')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Opening Time..."
                  id="Opening"
                  value={values.Opening}
                  onChangeText={handleChange('Opening')}
                  onBlur={handleBlur('Opening')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Closing Time..."
                  value={values.Closing}
                  onChangeText={handleChange('Closing')}
                  onBlur={handleBlur('Closing')}
                />
                {/* Confirm Button */}
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
        <MerchantNavigation navigation={navigation} />
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
