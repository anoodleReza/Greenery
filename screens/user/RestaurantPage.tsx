/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {styles} from '../Style';
//material ui + form
import {Divider, Text} from 'react-native-paper';
import {PartnerNavigation, UserNavigation} from '../NavigationBar';
import {PartnerHeader} from '../PageHeader';

//main
export default function RestaurantPage({navigation}: {navigation: any}) {
  // eslint-disable-next-line react/no-unstable-nested-components
  const Menu = props => {
    return (
      <View style={{flexDirection: 'row',marginLeft:15,justifyContent:'space-around',marginTop:10}}>
        <View>
          <Text>{props.MenuName}</Text>
          <Text>Nutritional details:</Text>
          <Text>{props.CalorieIntake}</Text>
        </View>

        <View>
          <Text>{props.Price}</Text>
        </View>

        <View>
          <View style={{borderWidth:1, 
            borderColor:'black',
            borderRadius: 8, 
            backgroundColor:'#A9FDAC',
            width:60,
            height:60}}>
          </View>

          <View style={{
            borderWidth:0.5,
            borderColor: 'black',
            borderRadius: 50,
            backgroundColor: 'white',
            width: 65,
            height: 18,
            alignItems: 'center',
            marginTop: 5
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

  const RestaurantBlock = props => {
    return (
        <View style={{flexDirection: 'row',marginLeft:25,marginBottom:15}}>
            <View style={{
              borderWidth:2,
              borderRadius: 8,
              borderColor:'black',
              backgroundColor: '#A9FDAC',
              width: 112,
              height: 90
            }}>
            </View>

            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 14, fontWeight:'bold'}}>{props.RestaurantName}</Text>
              <Text>{props.FoodCategory}</Text>

              <View style={{flexDirection: 'row',backgroundColor: '#FFF5F5', borderWidth:1,borderColor:'black',flex:1,justifyContent:'space-around'}}>

                <View >
                <View style={{flexDirection: 'row'}}>
                  <Image source={require('../../assets/Star.png')} />
                  <Text>{props.Rating}</Text>
                </View>
                <Text>Rating</Text>
                </View>
                <View >
                  <Text>{props.Distance}</Text>
                  <Text>Distance</Text>
                </View>
               

              </View>
                
            </View>

        </View>
    )

  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.containerUncentered}>
        {/* Banner */}
        <PartnerHeader navigation={navigation} />
        {/* Content */}
        <RestaurantBlock
        RestaurantName='Restaurant Name'
        FoodCategory='Italian, Spaghetti, Pasta'
        Rating='4.5'
        Distance='3.0 km'
        />

        <View>
          <Text style={{fontSize:30,marginLeft:40}}>Promo</Text>
          <Divider
          style={{width:'80%',marginTop:10}}/>
        </View>

        <Menu
        MenuName='Nasi Goreng w/ Seafood'
        CalorieIntake='318 kcal'
        Price='$5'
        />

        <View>
          <Text style={{fontSize:30,marginLeft:40}}>Recommended</Text>
          <Divider
          style={{width:'80%',marginTop:10}}/>
        </View>

        <Menu
        MenuName='Nasi Goreng w/ Seafood'
        CalorieIntake='318 kcal'
        Price='$5'
        />

        <Menu
        MenuName='Nasi Goreng w/ Seafood'
        CalorieIntake='318 kcal'
        Price='$5'
        />

       
        
       
        

        
    
       
        {/* Navigation */}
        <UserNavigation navigation={navigation} />
      </View>
      
    </View>
  );
}

