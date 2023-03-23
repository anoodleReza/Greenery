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
export default function MerchantDessert({navigation}: {navigation: any}) {
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
    Stock: number;
    Navigate: any;
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
          <View style={{flexDirection:'row'}}>
            <Text>Nutritional details:</Text>
            <Text> {props.CalorieIntake} kcal</Text>
          </View>
          
          <View style={{flexDirection:'row'}}>
            <Text>Stocks left: </Text>
            <Text>{props.Stock}</Text>
          </View>

          <Text style={styles.Highlight}>Customer Insights</Text>
          
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
            <TouchableOpacity onPress={props.Navigate}>
              {/* edit button */}
              <Text>Edit</Text>
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
            Stock={element.stock}
          />
        </View>
      );
    });
  };

  

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.containerUncentered}>
          {/* Banner */}
          <MerchantHeader navigation={navigation} />
          {/* Content */}

          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 40,
                marginTop: 20,
                justifyContent: 'space-around',
              }}>
              Appetizer Menu
            </Text>
            <Text  onPress={() => {navigation.dispatch(StackActions.replace('MerchantUserView'));}}
            style={{fontWeight: 'bold', fontSize: 16,marginTop: 20,marginLeft: 60}}>
                User View
            </Text>
            <Divider style={{width: '80%', marginTop: 10}} />
          </View>

          <Menu
            MenuName="Nasi Goreng w/ Seafood"
            CalorieIntake={318}
            Price={5}
            Image="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
            Stock={78}
            Navigate={() => {navigation.dispatch(StackActions.replace('MerchantAddMenu'));}}
          />
          
          

          <View style={{marginBottom: 25}}>{RestoList()}</View>

          {/* Navigation */}
          <MerchantNavigation navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
