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

import React, {useEffect, useState, Component} from 'react';
import {StackActions} from '@react-navigation/native';
//user session security
import * as Keychain from 'react-native-keychain';
import {ImageBackground} from 'react-native';


export default function MerchantMenu({navigation}: {navigation: any}) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');

  return(
    <View>
        <View style={{flexDirection:'row'}}>
            <ImageBackground source={require('../assets/banner.png')} style={{height:119,width:420}}
            resizeMode='cover'>
                <TextInput style={styles.input} placeholder="Today's agenda..."/>
            </ImageBackground>
        </View>

        <Text style={{fontSize:28, marginTop: 15, marginLeft: 15, color:'black',fontWeight: 'bold'}}>Menu:</Text>
        
        <View style={styles.flexButton}>
        
        <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
        <View style={styles.buttonBox}>
          <Image source={require('../assets/TodayPromo.png')} resizeMode='contain' style={{flex:1 }} />
          <Button onPress={()=> { navigation.dispatch(StackActions.replace('MerchantTodayPromo'));}}/>
        </View>
        </TouchableOpacity>

       

        <View style={styles.buttonBox}>
          <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../assets/BestSeller.png')} resizeMode='cover' style={{flex:1 }} 
            onPress={()=> { navigation.dispatch(StackActions.replace('MerchantMenu'));

            }}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent:'space-around',flexDirection:'row'}}>
        <Text style={styles.buttonTitle}>Today's Promo</Text>
        <Text style={styles.buttonTitle}>Bestselling</Text>
      </View>

      <View style={styles.flexButton}>
        <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.flexOpacity}>
            <Image source={require('../assets/Appetizer.png')} resizeMode='contain' style={{flex:1 }} 
            onPress={()=> { navigation.dispatch(StackActions.replace('MerchantMenu'));
            }}
            />
            </TouchableOpacity>
        </View>

        <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.flexOpacity}>
            <Image source={require('../assets/MainCourse.png')} resizeMode='contain' style={{flex:1 }} 
            onPress={()=> { navigation.dispatch(StackActions.replace('MerchantMenu'));
            }}
            />
            </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent:'space-around',flexDirection:'row'}}>
        <Text style={styles.buttonTitle}>Appetizer</Text>
        <Text style={styles.buttonTitle}>Main Course</Text>
      </View>

      <View style={styles.flexButton}>
        <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.flexOpacity}>
            <Image source={require('../assets/Dessert.png')} resizeMode='contain' style={{flex:1 }} 
            onPress={()=> { navigation.dispatch(StackActions.replace('MerchantMenu'));
            }}
            />
            </TouchableOpacity>
        </View>

        <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.flexOpacity}>
            <Image source={require('../assets/Extra.png')} resizeMode='contain' style={{flex:1 }} 
            onPress={()=> { navigation.dispatch(StackActions.replace('MerchantMenu'));
            }}
            />
            </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent:'space-around',flexDirection:'row'}}>
        <Text style={styles.buttonTitle}>Dessert</Text>
        <Text style={styles.buttonTitle}>Extra</Text>
      </View>







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
                navigation.dispatch(StackActions.replace('MerchantEditProfile'));
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

  buttonTitle : {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 3,
    fontSize: 14
  },

  flexButton: {
    borderColor:'black',
    justifyContent:'space-around',
    flexDirection:'row',
    marginTop:30,
  },

  buttonBox: {
    borderWidth:3,
    width:108,
    height:107,
    backgroundColor:'#E9BA8B',
    borderRadius:8,
  },

  flexOpacity: {
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center'

  }


  });
