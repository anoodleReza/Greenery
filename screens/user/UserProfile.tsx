/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Divider} from 'react-native-paper';
import {PartnerHeader} from '../PageHeader';
import {PartnerNavigation, UserNavigation} from '../NavigationBar';
import {styles} from '../Style';

export default function UserProfile({navigation}: {navigation: any}) {
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
            <Image source={require('../../assets/person.png')} />
          </View>
          <Text style={styles.text}>Customer Name</Text>
          <Text>+62 821 12345678</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
         

          <View style={styles.box}>
            <Text style={styles.textBasic}>Activity</Text>
          </View>

          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(StackActions.replace('UserEditProfile'));
              }}>
              <Text style={styles.textBasic}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider />
      {/* Screen Navigation */}
      <UserNavigation navigation={navigation} />
    </View>
  );
}
