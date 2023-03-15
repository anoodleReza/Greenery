/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Divider} from 'react-native-paper';
import {PartnerHeader} from '../PageHeader';
import {PartnerNavigation} from '../NavigationBar';
import {styles} from '../Style';
//firebase
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';

export default function PartnerProfile({navigation}: {navigation: any}) {
  const curUser = firebase.auth().currentUser;
  const fullpath = '/profile/' + 'ProfilePicture:' + curUser?.uid;
  const [imageUrl, setImageUrl] = useState('');
  const [isPfp, setisPfp] = React.useState(false);

  useEffect(() => {
    storage()
      .ref(fullpath) //name in storage in firebase console
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
        setisPfp(true);
      })
      .catch(e => console.log('Errors while downloading => ', e));
  }, [fullpath]);
  return (
    <View style={styles.containerUncentered}>
      {/* <PartnerSidebar /> */}
      {/* Screen Header */}
      <PartnerHeader navigation={navigation} />
      {/* Page Content */}
      <View style={styles.profilePage}>
        <View
          style={{
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.picture}>
            {isPfp ? (
              <View>
                <Image
                  style={{height: 200, width: 200, borderRadius: 100}}
                  source={{uri: imageUrl}}
                />
              </View>
            ) : (
              <Image source={require('../../assets/scooter.png')} />
            )}
          </View>
          <Text style={styles.text}>Driver Name</Text>
          <Text>+62 821 12345678</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.box}>
            <Text style={styles.textBasic}>Reviews</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.textBasic}>Activity</Text>
          </View>

          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(StackActions.replace('PartnerEditProfile'));
              }}>
              <Text style={styles.textBasic}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider />
      {/* Screen Navigation */}
      <PartnerNavigation navigation={navigation} />
    </View>
  );
}
