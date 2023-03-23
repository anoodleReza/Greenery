/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Text} from 'react-native-paper';
import {UserNavigation} from '../NavigationBar';
import {UserHeader} from '../PageHeader';
//firebase
import firestore from '@react-native-firebase/firestore';

let nextId = 0;
interface RestoData {
  key: number;
  restoID: string;
  Name: string;
  Category: string;
  image: string;
  Address: string;
}
// Restaurant cards
const Restaurant = (props: {
  navigation: any;
  RestaurantName: string;
  FoodCategory: string;
  eta: number;
  distance: number;
  image: string;
}) => {
  return (
    <View style={{flexDirection: 'row', marginLeft: 15, marginBottom: 25}}>
      <TouchableOpacity style={styles.touchButton} onPress={props.navigation}>
        {props.image !== null ? (
          <View style={styles.RestaurantBoxOutside}>
            <Image
              style={styles.RestaurantBoxInside}
              source={{
                uri: props.image,
              }}
            />
          </View>
        ) : (
          <View style={styles.RestaurantBoxOutside}>
            <View style={styles.RestaurantBoxInside} />
          </View>
        )}
      </TouchableOpacity>
      <View style={{justifyContent: 'center', marginLeft: 15}}>
        <Text style={styles.buttonTitle}>{props.RestaurantName}</Text>
        <Text>{props.FoodCategory}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{props.eta} mins - </Text>
          <Text>{props.distance} km </Text>
        </View>
      </View>
    </View>
  );
};

//main
export default function BestSeller({navigation}: {navigation: any}) {
  const [resto, setResto] = useState<RestoData[]>([]);

  //retrieve restaurant information
  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await firestore().collection('merchant').get();
      const fetchedRestaurants = querySnapshot.docs.map(
        doc => doc.data() as RestoData,
      );
      setResto(fetchedRestaurants);
    };
    fetchRestaurants();
  }, []);

  // Map restaurant array into the components
  const RestoList = () => {
    return resto.map(element => {
      return (
        <View key={element.key}>
          <Restaurant
            navigation={() => {
              navigation.dispatch(
                navigation.push('RestaurantPage', {
                  restoName: element.Name,
                  restoAddress: element.Address,
                  restoCategory: element.Category,
                  restoImage: element.image,
                }),
              );
            }}
            RestaurantName={element.Name}
            FoodCategory={element.Category}
            eta={30}
            distance={1.5}
            image={element.image}
          />
        </View>
      );
    });
  };

  //Main Function
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.containerUncentered}>
          {/* Banner */}
          <UserHeader navigation={navigation} />
          {/* Content */}
          <View>
            <View>
              <Text style={styles.homepagetext}>Bestsellers</Text>
              <Text style={{marginLeft: 30}}>
                Try the best we have to offer:
              </Text>
            </View>
            {/* Testing Database */}
            <View>{RestoList()}</View>
          </View>

          {/* Navigation */}
          <UserNavigation navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
