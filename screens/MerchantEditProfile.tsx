import {Button, Searchbar, Avatar} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackActions} from '@react-navigation/native';
//user session security
import {ImageBackground, ScrollView} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
//navigation bar

export default function MerchantEditProfile({navigation}: {navigation: any}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const user = firebase.auth().currentUser;

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  useEffect(() => {
    if (user != null) {
      if (user.email != null) {
        setEmail(user.email);
      } else {
        console.log('Error in retrieving user email');
      }
    } else {
      console.log('Error in retrieving user data');
    }
  }, [user, email]);

  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    setIsLoggedIn(false);
    navigation.dispatch(StackActions.replace('MerchantSignin'));
  };
  return (
    <View>
      <ScrollView>
        {/* Banner */}
        <ImageBackground
          source={require('../assets/banner.png')}
          style={styles.banner}
          resizeMode="cover">
          <Searchbar
            style={styles.search}
            placeholder="Today's Agenda..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            inputStyle={styles.searchInput}
          />
          <Avatar.Icon size={40} icon="menu" theme={icons} />
        </ImageBackground>

        {/* Main Content */}
        <View style={styles.container}>
          {/* Profile */}
          <Text style={styles.Subheading}>Profile:</Text>
          <TextInput style={styles.input} placeholder="Change username..." />
          <TextInput
            style={styles.input}
            placeholder="Change E-Mail address..."
          />
          <Button
            style={styles.button}
            textColor="black"
            mode="contained"
            onPress={() => {
              console.log('confirm');
            }}>
            Confirm
          </Button>

          {/* Password */}
          <Text style={styles.Subheading}>Change Password:</Text>
          <TextInput style={styles.input} placeholder="Enter New Password..." />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password..."
          />
          <Button style={styles.button} textColor="black" mode="contained">
            Confirm
          </Button>

          {/* Details */}
          <Text style={styles.Subheading}>Restaurant Details:</Text>
          <TextInput style={styles.input} placeholder="Restaurant Name..." />
          <TextInput
            style={styles.input}
            placeholder="Restaurant Category..."
          />
          <TextInput style={styles.input} placeholder="Price Range..." />
          <TextInput style={styles.input} placeholder="Address..." />
          <TextInput style={styles.input} placeholder="Operating Hours..." />

          <Button style={styles.button} textColor="black" mode="contained">
            Confirm
          </Button>
        </View>
        <View style={styles.container}>
          <Text>Want to log out?</Text>
          <Button
            style={styles.logoutButton}
            textColor="black"
            mode="contained"
            onPress={handleLogout}>
            Log Out
          </Button>
        </View>
        {/* Bottom Navigation Bar */}
        <View style={styles.bottomSomething}>
          {/*
          <Image
            source={require('../assets/Home.png')}
            style={{width: 37, height: 46}}
            onPress={() => {
              navigation.dispatch(StackActions.replace('MerchantHomepage'));
            }}
          />

          <Image
            source={require('../assets/News.png')}
            style={{width: 37, height: 46}}
            onPress={() => {
              navigation.dispatch(StackActions.replace());
            }}
          />

          <Image
            source={require('../assets/Search.png')}
            style={{flexwidth: 37, height: 46}}
            onPress={() => {
              navigation.dispatch(StackActions.replace());
            }}
          />

          <Image
            source={require('../assets/Profile.png')}
            style={{width: 37, height: 46}}
            onPress={() => {
              navigation.dispatch(StackActions.replace('MerchantEditProfile'));
            }}
          />

          <Image
            source={require('../assets/Settings.png')}
            style={{width: 37, height: 46}}
            onPress={() => {
              navigation.dispatch(StackActions.replace());
            }}
          /> */}
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.dispatch(StackActions.replace('MerchantHomepage'));
              }}>
              Home
            </Text>
          </TouchableOpacity>

          <Text
            onPress={() => {
              //navigation.dispatch(StackActions.replace(''));
            }}>
            News
          </Text>
          <Text
            onPress={() => {
              //navigation.dispatch(StackActions.replace());
            }}>
            Search
          </Text>
          <Text
            onPress={() => {
              navigation.dispatch(StackActions.replace('MerchantEditProfile'));
            }}>
            Profile
          </Text>
          <Text
            onPress={() => {
              //navigation.dispatch(StackActions.replace());
            }}>
            Setting
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const icons = {
  roundness: 40,
  colors: {
    primary: '#ffffff',
    accent: '#f1c40f',
  },
};

const styles = StyleSheet.create({
  bottomSomething: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 30,
  },
  searchInput: {
    height: 40,
    margin: 0,
    padding: 0,
    paddingBottom: 4,
  },
  banner: {
    height: 119,
    width: 420,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  search: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 12,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: -10,
  },
  Subheading: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'black',
    marginTop: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#A9FDAC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 20,
    width: 300,
    height: 40,
  },
  logoutButton: {
    backgroundColor: '#A9FDAC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 10,
    width: 300,
    height: 40,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'column',
  },
});
