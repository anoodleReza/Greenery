/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Text} from 'react-native-paper';
import {UserNavigation} from '../NavigationBar';
import {UserHeader} from '../PageHeader';

//main
export default function UserHomepage({navigation}: {navigation: any}) {
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
    <View style={{flex: 1}}>
      <View style={styles.containerUncentered}>
        {/* Banner */}
        <UserHeader navigation={navigation} />
        {/* Content */}
        <View style={styles.contentBox}>
          <View>
            <Text style={styles.homepagetext}>
              What would you like to do today?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <ButtonBox
              image={require('../../assets/BestSeller.png')}
              name="Bestsellers"
              navigation={() => {
                navigation.push('BestSeller');
              }}
            />

            <ButtonBox
              image={require('../../assets/Map2.png')}
              name="Near Me"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 80,
            }}>
            <ButtonBox
              image={require('../../assets/TodayPromo.png')}
              name="Promo"
            />
            <ButtonBox
              image={require('../../assets/stars.png')}
              name="Most Popular"
            />
          </View>
        </View>
        {/* Navigation */}
        <UserNavigation navigation={navigation} />
      </View>
    </View>
  );
}
