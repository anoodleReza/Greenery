import {Button} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { ScrollView } from 'react-native';

import React, {useEffect, useState, Component} from 'react';
import {StackActions} from '@react-navigation/native';
//user session security
import * as Keychain from 'react-native-keychain';
import {ImageBackground} from 'react-native';

export default function MerchantTodayPromo({navigation}: {navigation: any}) {
    return(
        <View style={{flex: 1}}>
            <ScrollView>

                <View style={{flexDirection:'row'}}>
                    <ImageBackground source={require('../assets/banner.png')} style={{height:119,width:420}}
                    resizeMode='cover'>
                    <TextInput style={styles.input} placeholder="Today's agenda..."/>
                    </ImageBackground>
                </View>

                <Text style={{fontSize:28, marginTop: 15, marginLeft: 15, color:'black',fontWeight: 'bold'}}>Today's Promo:</Text>
                

            </ScrollView>

            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop: 80, paddingBottom:100,
            borderWidth:1,borderColor:'black',padding:30}}>
       

        {/* <Image source={require('../assets/Home.png')}  style={{width:37,height:46 }} 
          onPress={()=> { navigation.dispatch(StackActions.replace());

        }}/>

        <Image source={require('../assets/News.png')}  style={{width:37,height:46 }} 
          onPress={()=> { navigation.dispatch(StackActions.replace());

        }}/>

        <Image source={require('../assets/Search.png')}  style={{flexwidth:37,height:46 }} 
          onPress={()=> { navigation.dispatch(StackActions.replace());

        }}/>

        <Image source={require('../assets/Profile.png')} style={{width:37,height:46 }} 
          onPress={()=> { navigation.dispatch(StackActions.replace());

        }}/>

        <Image source={require('../assets/Settings.png')}  style={{width:37,height:46}} 
          onPress={()=> { navigation.dispatch(StackActions.replace());

        }}/> */}
        
            <Text onPress={() => {
                navigation.dispatch(StackActions.replace('MerchantHomepage'));
              }}>Home</Text>
            <Text onPress={() => {
                navigation.dispatch(StackActions.replace());
              }}>News</Text>
            <Text onPress={() => {
                navigation.dispatch(StackActions.replace());
              }}>Search</Text>
             <Text onPress={() => {
                navigation.dispatch(StackActions.replace());
              }}>Profile</Text>
            <Text onPress={() => {
                navigation.dispatch(StackActions.replace());
              }}>Setting</Text>
        
            </View>   
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15, 
        fontSize: 16,
        justifyContent:'center',
        alignItems: 'center',
        marginLeft:45,
        marginTop:20
    },

})