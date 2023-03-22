/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Divider, Text} from 'react-native-paper';
import {UserNavigation} from '../NavigationBar';
import {UserHeader} from '../PageHeader';
//firebase
import firestore from '@react-native-firebase/firestore';

let nextId = 0;
interface FoodData {
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
export default function RestaurantPage({navigation}: {navigation: any}) {
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

  //Menu Item Component
  const Menu = (props: {
    MenuName: string;
    CalorieIntake: number;
    Price: number;
    Image: string;
  }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 15,
          justifyContent: 'space-around',
          marginTop: 10,
        }}>
        <View>
          <Text>{props.MenuName}</Text>
          <Text>Nutritional details:</Text>
          <Text>{props.CalorieIntake} kcal</Text>
        </View>

        <View>
          <Text>IDR {props.Price}</Text>
        </View>

        <View>
          <Image
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 8,
              backgroundColor: '#A9FDAC',
              width: 60,
              height: 60,
            }}
            source={{uri: props.Image}}
          />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: 'black',
              borderRadius: 50,
              backgroundColor: 'white',
              width: 65,
              height: 18,
              alignItems: 'center',
              marginTop: 5,
            }}>
            <TouchableOpacity>
              {/* add button */}
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const RestoList = () => {
    return item.map(element => {
      return (
        <View key={element.key}>
          <Menu
            MenuName={element.name}
            CalorieIntake={element.calorie}
            Price={element.price}
            Image={element.image}
          />
        </View>
      );
    });
  };

  const RestaurantBlock = (props: {
    RestaurantName: string;
    FoodCategory: string;
    Rating: number;
    Distance: number;
  }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 25,
          marginBottom: 15,
          marginTop: 25,
        }}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 8,
            borderColor: 'black',
            backgroundColor: '#A9FDAC',
            width: 112,
            height: 90,
          }}
        />

        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            {props.RestaurantName}
          </Text>
          <Text>{props.FoodCategory}</Text>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFF5F5',
              borderWidth: 1,
              borderColor: 'black',
              flex: 1,
              justifyContent: 'space-around',
            }}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../assets/Star.png')} />
                <Text>{props.Rating}</Text>
              </View>
              <Text>Rating</Text>
            </View>
            <View>
              <Text>{props.Distance}</Text>
              <Text>Distance</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.containerUncentered}>
          {/* Banner */}
          <UserHeader navigation={navigation} />
          {/* Content */}
          <RestaurantBlock
            RestaurantName="Restaurant Name"
            FoodCategory="Italian, Spaghetti, Pasta"
            Rating="4.5"
            Distance="3.0 km"
          />

          <View>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 40,
                justifyContent: 'space-around',
              }}>
              Promo
            </Text>
            <Divider style={{width: '80%', marginTop: 10}} />
          </View>

          <Menu
            MenuName="Nasi Goreng w/ Seafood"
            CalorieIntake={318}
            Price={5}
            Image="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
          />

          <View>
            <Text style={{fontSize: 30, marginLeft: 40}}>Recommended</Text>
            <Divider style={{width: '80%', marginTop: 10}} />
          </View>
          <View style={{marginBottom: 25}}>{RestoList()}</View>

          {/* Navigation */}
          <UserNavigation navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
