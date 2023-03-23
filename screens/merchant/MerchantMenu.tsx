import {Button} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';

import React, {useEffect, useState, Component} from 'react';
import {StackActions} from '@react-navigation/native';
//user session security
import * as Keychain from 'react-native-keychain';
import {ImageBackground} from 'react-native';
import {styles} from '../Style';
import MerchantNavigation from '../NavigationBar';
import MerchantHeader from '../PageHeader';

export default function MerchantMenu({navigation}: {navigation: any}) {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //   const [username, setUsername] = useState('');

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
      <ScrollView>
      
    {/* Banner */}
    <MerchantHeader navigation={navigation} />
    {/* Content */}
    

    
    <View style={styles.contentBox}>
      <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
      <Text style={styles.homepagetext}>
        Menu:
      </Text>

      <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
        <Text style={{fontWeight:'bold',color:'black',marginTop:30,marginRight:5}}
        onPress={() => {
          navigation.dispatch(StackActions.replace('MerchantAddMenu'));
        }}>
        Add New Menu
        </Text>
        <Image source={require('../../assets/Add.png')}
        style={{marginTop:32,marginRight:50}}/>
      </View>

      </View>
      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <ButtonBox
          image={require('../../assets/TodayPromo.png')}
          name="Today's Promo"
          navigation={() => {
            navigation.dispatch(StackActions.replace('MerchantMenu'));
          }}
        />

        <ButtonBox
          image={require('../../assets/BestSeller.png')}
          name="Bestselling"
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
          image={require('../../assets/Appetizer.png')}
          name="Appetizer"
          navigation={() => {
            navigation.dispatch(StackActions.replace('MerchantAppetizer'));
          }}
        />
        <ButtonBox
          image={require('../../assets/MainCourse.png')}
          name="Main Course"
          navigation={() => {
            navigation.dispatch(StackActions.replace('MerchantMainCourse'));
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 80,
          marginBottom: 80,
        }}>
        <ButtonBox
          image={require('../../assets/Dessert.png')}
          name="Dessert"
          navigation={() => {
            navigation.dispatch(StackActions.replace('MerchantDessert'));
          }}
        />
        <ButtonBox
          image={require('../../assets/Extra.png')}
          name="Extras"
        />
      </View>
    </View>
    
    {/* Navigation */}
    <MerchantNavigation navigation={navigation} />
    </ScrollView>
  </View>
  );
}


