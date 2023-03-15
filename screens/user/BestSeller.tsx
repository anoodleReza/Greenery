/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Text} from 'react-native-paper';
import {UserNavigation} from '../NavigationBar';
import {UserHeader} from '../PageHeader';

//main
export default function BestSeller({navigation}: {navigation: any}) {
  // eslint-disable-next-line react/no-unstable-nested-components
  const Restaurant = props => {
    return (
      <View style={{flexDirection: 'row', marginLeft: 15}}>
        <TouchableOpacity style={styles.touchButton} onPress={props.navigation}>
          <View style={styles.RestaurantBoxOutside}>
            <View style={styles.RestaurantBoxInside} />
          </View>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', marginLeft: 15}}>
          <Text style={styles.buttonTitle}>{props.RestaurantName}</Text>
          <Text>{props.FoodCategory}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>{props.eta}</Text>
            <Text>{props.distance}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.containerUncentered}>
        {/* Banner */}
        <UserHeader navigation={navigation} />
        {/* Content */}

        <View>
          <View>
            <Text style={styles.homepagetext}>Bestsellers</Text>
            <Text style={{marginLeft: 30}}>Try the best we have to offer:</Text>
          </View>

          <Restaurant
            navigation={() => {
              navigation.dispatch(StackActions.replace('RestaurantPage'));
            }}
            RestaurantName="Restaurant Name"
            FoodCategory="Italian, Spaghetti, Pasta"
            eta="30 mins"
            distance="1.5 km"
          />

          <Restaurant
            navigation={() => {
              navigation.dispatch(StackActions.replace(''));
            }}
            RestaurantName="Restaurant Name"
            FoodCategory="Italian, Spaghetti, Pasta"
            eta="30 mins"
            distance="1.5 km"
          />

          <Restaurant
            navigation={() => {
              navigation.dispatch(StackActions.replace(''));
            }}
            RestaurantName="Restaurant Name"
            FoodCategory="Italian, Spaghetti, Pasta"
            eta="30 mins"
            distance="1.5 km"
          />
        </View>

        {/* Navigation */}
        <UserNavigation navigation={navigation} />
      </View>
    </View>
  );
}
