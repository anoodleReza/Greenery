/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  GestureResponderEvent,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import {styles} from '../Style';
//material ui + form
import {Divider, Text} from 'react-native-paper';
import {UserNavigation} from '../NavigationBar';
import {UserHeader} from '../PageHeader';
import {StackActions} from '@react-navigation/native';
import {Rating,AirbnbRating} from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';

//main
export default function UserHomepage({navigation}: {navigation: any}) {
  // eslint-disable-next-line react/no-unstable-nested-components

  const OrderSummary = (props:{
    qty: number;
    image: ImageSourcePropType;
    name: string;
    price: number;
  }) => {
    return (
        <View style={{flexDirection:'row',marginVertical:10,alignItems:'center',justifyContent:'space-between',marginRight:50}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{width:50,height:50,borderRadius:10,borderWidth:1,borderColor:'black',marginLeft:30}}>
                    <Image source={props.image} style={{width:45,height:45}} resizeMode='contain'/>
                </View>

                <Text style={{fontWeight:'bold',marginHorizontal:10}}>{props.name}</Text>
                <Text>x{props.qty}</Text>
            </View>

            
            <Text>Rp {props.price * props.qty}</Text>
        </View>
    );
  };

  

  const DriverRating = (props) => {
    return(
        <View>
            <Divider width='80%' style={{marginHorizontal:33}}/>

            <View style={{marginTop:15,marginLeft:30,flexDirection:'row'}}>
                <Image source={props.driverImage} 
                style={{width:50,height:50}}/>

                <View style={{marginLeft:20}}>
                    <Text style={{fontWeight:'bold',fontSize:16}}>Driver Name</Text>
                    <Text>Plate Number</Text>
                </View>
            </View>
            
            <View>
            <Divider width='80%' style={{marginHorizontal:33,marginTop:15}}/>
                <Text style={{fontWeight:'bold',fontSize:18,marginLeft:30,marginTop:15}}>Give rating to the driver!</Text>

                <AirbnbRating
                count={5}
                defaultRating={5}
                size={30}
                />

            </View>

            

        </View>
    );
  };
  

  return (
    <ScrollView>
      <View style={{minHeight: '100%'}}>
        <View style={styles.containerUncentered}>
          {/* Banner */}
          <UserHeader navigation={navigation} />
          {/* Content */}
         
          <View style={styles.contentBox}>

            <View style={{alignItems:'center'}}>
                <Text style={{marginLeft:32,marginTop:20,marginRight:40,fontWeight:'bold',fontSize:26}}>Order Finished !</Text>
                <Image source={require('../../assets/check.png')} style={{width:100,height:100,marginVertical:15}}/>
            </View>

            <DriverRating
            driverImage={require('../../assets/person.png')}/>
            {/* Order Summary */}
            <Divider width='80%' style={{marginHorizontal:33,marginTop:15}}/>
            <Text style={{fontWeight:'bold',fontSize:18,marginLeft:30,marginTop:15}}>Order Summary</Text>
            
            <OrderSummary
            image={require('../../assets/Dessert.png')}
            name='Cookie'
            qty={3}
            price={2000}/>

           
           
          </View>
          {/* Navigation */}
          <UserNavigation navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
}
