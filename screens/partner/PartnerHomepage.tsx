/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Text} from 'react-native-paper';
import {PartnerNavigation} from '../NavigationBar';
import {PartnerHeader} from '../PageHeader';

export default function PartnerHomepage({navigation}: {navigation: any}) {
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
    <View style={styles.flexContainer}>
      {/* Banner */}
      <PartnerHeader />
      {/* Content */}
      <View style={styles.contentBox}>
        <View>
          <Text style={styles.text}>What would you like to do today?</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <ButtonBox
            image={require('../../assets/motorbike.png')}
            name="Go On Duty!"
          />

          <ButtonBox
            image={require('../../assets/photo.png')}
            name="Profile"
            navigation={() => {
              navigation.dispatch(StackActions.replace('PartnerProfile'));
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
          <ButtonBox image={require('../../assets/map.png')} name="Map" />
        </View>
      </View>
      {/* Navigation */}
      <PartnerNavigation navigation={navigation} />
    </View>
  );
}
