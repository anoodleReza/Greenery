/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Divider, Text} from 'react-native-paper';
import MerchantNavigation, {UserNavigation} from '../NavigationBar';
import MerchantHeader, {UserHeader} from '../PageHeader';
//firebase
import firestore from '@react-native-firebase/firestore';

let nextId = 0;
interface FoodData {
  stock: number;
  key: number;
  restoID: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  calorie: number;
}

//main
export default function MerchantUserView({navigation}: {navigation: any}) {
  const [item, setItem] = useState<FoodData[]>([]);

  //retrieve restaurant information
  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await firestore()
        .collection('fooditems')
        .where('restoID', '==', 'nameAddress')
        .get();
      const fetchedRestaurants = querySnapshot.docs.map(
        doc => doc.data() as FoodData,
      );
      setItem(fetchedRestaurants);
    };
    fetchRestaurants();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.containerUncentered}>
          {/* Banner */}
          <MerchantHeader navigation={navigation} />
          {/* Content */}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 40,
                marginTop: 20,
                justifyContent: 'space-around',
              }}>
              Customer View
            </Text>
            <Divider style={{width: '80%', marginTop: 10}} />
          </View>

          {/* Navigation */}
          <MerchantNavigation navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
