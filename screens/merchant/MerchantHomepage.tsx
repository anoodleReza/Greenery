/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Text} from 'react-native-paper';

//import other pages
import MerchantHeader from '../PageHeader';
import MerchantNavigation from '../NavigationBar';

export default function MerchantHomepage({navigation}: {navigation: any}) {
  // eslint-disable-next-line react/no-unstable-nested-components
  const ButtonBox = props => {
    return (
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.touchButton} onPress={props.navigation}>
          <Image source={props.image} style={styles.ImgPlacement} />
        </TouchableOpacity>
        <Text style={styles.buttonTitle}>{props.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.containerUncentered}>
      {/* Banner */}
      <MerchantHeader navigation={navigation} />
      {/* Content */}
      <View style={styles.contentBox}>
        <Text style={styles.homepagetext}>
          What would you like to do today?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <ButtonBox
            image={require('../../assets/editMenu.png')}
            name="Edit Menu"
            navigation={() => {
              navigation.dispatch(StackActions.replace('MerchantMenu'));
            }}
          />

          <ButtonBox
            image={require('../../assets/editMerchantProfile.png')}
            name="Edit Profile"
            navigation={() => {
              navigation.dispatch(StackActions.replace('MerchantProfile'));
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 80,
          }}>
          <ButtonBox
            image={require('../../assets/wallet.png')}
            name="MyWallet"
          />
          <ButtonBox
            image={require('../../assets/newspaper.png')}
            name="Check the News"
          />
        </View>
      </View>
      {/* Navigation */}
      <MerchantNavigation navigation={navigation} />
    </View>
  );
}
