/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PartnerNavigation} from '../NavigationBar';
import { PartnerHeader } from '../PageHeader';

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

const styles = StyleSheet.create({
  contentBox: {
    height: '70%',
    marginTop: 20,
  },
  flexContainer: {
    flex: 1,
  },
  cover: {
    height: 119,
    width: 420,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    width: 300,
    height: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 40,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 45,
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
    marginTop: 24,
    marginLeft: 15,
    color: 'black',
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    fontSize: 16,
  },
  buttonBox: {
    borderWidth: 3,
    width: 108,
    height: 107,
    backgroundColor: '#E9BA8B',
    borderRadius: 8,
  },
  flexButton: {
    borderColor: 'black',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 80,
  },
  touchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImgPlacement: {
    width: 88,
    height: 88,
  },
});
