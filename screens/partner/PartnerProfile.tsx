import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {StackActions} from '@react-navigation/native';
//material ui + form
import {Button, Text, TextInput} from 'react-native-paper';

export default function PartnerProfile({navigation}: {navigation: any}) {
  return (
    <View>
      <View style={{flexDirection:'row'}}>
            <ImageBackground source={require('../../assets/banner.png')} style={{height:119,width:420}}
            resizeMode='cover'>
                <TextInput style={styles.input} placeholder="Today's agenda..."/>
            </ImageBackground>
        </View>

        <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.picture}>
            <Image source={require('../../assets/scooter.png')} />
          </View>
          <Text style={styles.text}>Driver Name</Text>
          <Text>+62 821 12345678</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.box}>
            <Text style={styles.text}>Reviews</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.text}>Activity</Text>
          </View>

          <View style={styles.box}>
            <TouchableOpacity onPress={() => {
                navigation.dispatch(StackActions.replace('PartnerEditProfile'));
                }}>
                  <Text style={styles.text}>Edit Profile</Text>
            </TouchableOpacity>
            
          </View>
        </View>
        <Text onPress={()=>{navigation.dispatch(StackActions.replace('PartnerHomepage'));}}>return</Text>

    </View> 
  )
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 40,
    fontSize: 16,
    justifyContent:'center',
    alignItems: 'center',
    marginLeft:45,
    marginTop:30,
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#E9BA8B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  box: {
    width: 300,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#E9BA8B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,

  }
})