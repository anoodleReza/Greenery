import {Button} from 'react-native-paper';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import {StackActions} from '@react-navigation/native';
//user session security
import * as Keychain from 'react-native-keychain';
import ImageButton from 'library/components/ImageButton';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native';

export default function MerchantEditProfile({navigation}: {navigation: any}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setIsLoggedIn(true);
          setUsername(credentials.username);
          console.log('Logged in as ', username);
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  });

  const handleLogout = async () => {
    const logout = await Keychain.resetGenericPassword();
    console.log({logout});
    if (logout) {
      setIsLoggedIn(false);
      setUsername('');
    }
    navigation.dispatch(StackActions.replace('MerchantSignin'));
  };
    return(
        <View style={{flex: 1}}>
        <ScrollView>
             <View style={{flexDirection:'row'}}>
                <ImageBackground source={require('../assets/banner.png')} style={{height:119,width:420}}
                    resizeMode='cover'>
                        <TextInput style={styles.input} placeholder="Today's agenda..."/>
                 </ImageBackground>
             </View>

            <View>
                <Text style={styles.Subheading}>Profile:</Text>
                <TextInput style={styles.input} placeholder="Change username..."/>
                <TextInput style={styles.input} placeholder="Change E-Mail address..."/>

                <TouchableOpacity >
                    <View style={styles.button}  onPress={() => {/* do this */}}>
                    <Text style={{ color: 'black',fontWeight: 'bold' }}>Confirm</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.Subheading}>Change Password:</Text>
                <TextInput style={styles.input} placeholder="Enter New Password..."/>
                <TextInput style={styles.input} placeholder="Confirm New Password..."/>

                <TouchableOpacity >
                    <View style={styles.button}  onPress={() => {/* do this */}}>
                    <Text style={{ color: 'black',fontWeight: 'bold' }}>Confirm</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.Subheading}>Restaurant Details:</Text>
                <TextInput style={styles.input} placeholder="Restaurant Name..."/>
                <TextInput style={styles.input} placeholder="Restaurant Category..."/>
                <TextInput style={styles.input} placeholder="Price Range..."/>
                <TextInput style={styles.input} placeholder="Address..."/>
                <TextInput style={styles.input} placeholder="Operating Hours..."/>


                <TouchableOpacity >
                    <View style={styles.button}  onPress={() => {/* do this */}}>
                    <Text style={{ color: 'black',fontWeight: 'bold' }}>Confirm</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text>Want to log out? {username}</Text>
                <Button textColor="black" mode="contained" onPress={handleLogout}>Log Out</Button>
            </View>
        </ScrollView>

        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop: 10, borderWidth:1,borderColor:'black',padding:30}}>
 

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
  
         <TouchableOpacity>
            <Text onPress={() => {
             navigation.dispatch(StackActions.replace('MerchantHomepage'));
             }}>Home</Text>
        </TouchableOpacity>

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
    Subheading: {
        fontWeight: 'bold',
        fontSize:26,
        color: 'black',
        marginTop: 20,
        marginLeft:30

    },
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

    button: {
        backgroundColor: '#A9FDAC',
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 20,
        width: 300,
        height: 40,
                   

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
})