/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import {styles} from '../Style';
//material ui + form
import {Divider, Text} from 'react-native-paper';

//import other pages
import MerchantHeader from '../PageHeader';
import MerchantNavigation from '../NavigationBar';

export default function MerchantOrdersProcessing({navigation}: {navigation: any}) {
  // eslint-disable-next-line react/no-unstable-nested-components
  const OrderProcessed = (props:{
    orderID: string,
    orderedMenu: any,
    notes: string,
  }) => {
    return (
      <View>
        
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>

          <View style={{marginTop:5}}>
            <Text style={{fontWeight:'bold'}}>Order {props.orderID}</Text>
            <Text>{props.orderedMenu}</Text>
            <Text>Notes: </Text>
            <Text>{props.notes}</Text>
          </View>

          <View style={{marginRight:40,justifyContent:'space-around'}}>
            <TouchableOpacity>
            <View style={{borderColor:'black',borderWidth:1,backgroundColor:'#7CFF81',padding:8,borderRadius:8}}>
              <Text style={{fontWeight:'bold'}}>Finish</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.push('MerchantOrdersDetail'); }}>
            <View style={{borderColor:'black',borderWidth:1,backgroundColor:'#A9FDAC',padding:8,borderRadius:8,alignItems:'center'}}>
              <Text style={{fontWeight:'bold'}}>Detail</Text>
            </View>
            </TouchableOpacity>
          </View>

        </View>

        <Divider style={{width:'90%',marginTop:5}}/>
      </View>
    );
  };
 
  return (
    <View style={styles.containerUncentered}>
      {/* Banner */}
      <MerchantHeader navigation={navigation} />
      {/* Orders Header  */}
      <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:50,backgroundColor:'#A9FDAC',padding:15,borderBottomLeftRadius: 20,borderBottomRightRadius:20}}>
        <TouchableOpacity onPress={() => {navigation.push('MerchantOrdersReceived'); }}>
          <Text>Received</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.push('MerchantOrdersProcessing'); }}>
          <Text style={{fontWeight:'bold'}}>Processing</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.push('MerchantOrdersOnDelivery'); }}>
          <Text>On Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.push('MerchantOrdersFinished'); }}>
          <Text>Finished</Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      
      <View style={styles.contentBox}>
        <Text style={styles.homepagetext}>
          Orders:
        </Text>

        <View style={{alignItems:'center'}}>
          <Divider style={{width:'85%'}}/>
        </View>

        <View style={{marginLeft: 30}}>
            <OrderProcessed
            orderID='K-B65939743' 
            orderedMenu={'Nasi Goreng Udang x2 \nNasi Goreng Ayam x1'}
            notes={'tidak pedas'}/>
        </View>
        
       
      </View>
      {/* Navigation */}
      <MerchantNavigation navigation={navigation} />
    </View>
   
  );
}
