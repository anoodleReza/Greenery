/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PartnerHeader} from '../PageHeader';
import {styles} from '../Style';
import {PartnerNavigation} from '../NavigationBar';
import MapView, {Marker} from 'react-native-maps';
import {Button, Card, IconButton, List} from 'react-native-paper';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function PartnerMap({navigation}: {navigation: any}) {
  const [state, setState] = useState<string>('available');
  const curUser = firebase.auth().currentUser;

  //make a function to get the status o the driver in firebase
  const fetchStatus = async () => {
    if (curUser?.uid) {
      await firestore()
        .collection('driver')
        .doc(curUser?.uid)
        .get()
        .then(documentSnapshot => {
          const userDetails = documentSnapshot.data();
          //check if the user Status exists
          if (userDetails?.Status) {
            //if it does, set the state to the status else create status in firebase
            setState(userDetails?.Status);
          } else {
            firestore().collection('driver').doc(curUser?.uid).set(
              {
                Status: 'available',
              },
              {merge: true},
            );
          }
        });
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <SafeAreaView style={styles.containerUncentered}>
      {/* Banner */}
      <PartnerHeader navigation={navigation} />
      {/* Content */}
      <View style={styles.contentBox}>
        {/* Map */}
        <MapView
          style={MapStyles.flex}
          initialRegion={{
            latitude: -3.722,
            longitude: -38.515,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}>
          {/* WAITING ORDER STATE */}
          {state === 'available' ? (
            <>
              <Marker
                description="Driver Location"
                coordinate={{
                  latitude: -3.723,
                  longitude: -38.515,
                }}>
                <Image
                  source={require('../../assets/driverMarker.png')}
                  style={MapStyles.driverMarker}
                />
              </Marker>
            </>
          ) : null}
          {state === 'pending' ||
          state === 'picking' ||
          state === 'delivering' ? (
            <>
              <Marker
                description="Driver Location"
                coordinate={{
                  latitude: -3.723,
                  longitude: -38.515,
                }}>
                <Image
                  source={require('../../assets/driverMarker.png')}
                  style={MapStyles.driverMarker}
                />
              </Marker>

              <Marker
                description="User Location"
                coordinate={{
                  latitude: -3.719,
                  longitude: -38.511,
                }}>
                <Image
                  source={require('../../assets/destination.png')}
                  style={MapStyles.pinPoint}
                />
              </Marker>

              <Marker
                description="Merchant Location"
                coordinate={{
                  latitude: -3.727,
                  longitude: -38.514,
                }}>
                <Image
                  source={require('../../assets/restaurant.png')}
                  style={MapStyles.pinPoint}
                />
              </Marker>
            </>
          ) : null}
        </MapView>

        {state === 'available' ? (
          <>
            <Card mode="elevated" style={{marginBottom: 20}}>
              <Card.Content>
                <List.Item
                  title="Waiting for order..."
                  description="Tips: You can go offline to stop receiving orders"
                  left={() => <IconButton icon="bike" size={30} />}
                />
              </Card.Content>
            </Card>
          </>
        ) : null}
        {/* CONFIRMING ORDER STATE */}

        {state === 'pending' ? (
          <>
            <Card mode="elevated" style={{marginBottom: 20}}>
              <Card.Content>
                <List.Item
                  title="Confirm Delivery Order"
                  description="800m from you                  Price: $ 20.00 "
                  descriptionNumberOfLines={3}
                  left={() => <IconButton icon="bike" size={30} />}
                  right={() => (
                    <View>
                      <Button>Cancel</Button>
                      <Button
                        mode="contained"
                        style={MapStyles.button}
                        onPress={() => setState(state + 1)}>
                        Confirm
                      </Button>
                    </View>
                  )}
                />
              </Card.Content>
            </Card>
          </>
        ) : null}

        {/* WORKING ON ORDER STATE */}

        {state === 'picking' ? (
          <>
            <Card mode="elevated" style={{marginBottom: 20}}>
              <Card.Content>
                <List.Item
                  title="Restaurant Name"
                  description="Restaurant Address Price: $ 20.00 "
                  descriptionNumberOfLines={3}
                  left={() => (
                    <Image
                      source={require('../../assets/person.png')}
                      style={{width: 50, height: 50, marginTop: 20}}
                    />
                  )}
                  right={() => (
                    <View style={{justifyContent: 'space-evenly'}}>
                      <Button mode="contained" style={MapStyles.button}>
                        Message
                      </Button>
                      <Button
                        mode="contained"
                        style={MapStyles.button}
                        onPress={() => setState(state + 1)}>
                        Finish
                      </Button>
                    </View>
                  )}
                />
              </Card.Content>
            </Card>
          </>
        ) : null}
        {/* DELIVERING ORDER STATE */}
        {state === 'delivering' ? (
          <>
            <Card mode="elevated" style={{marginBottom: 20}}>
              <Card.Content>
                <List.Item
                  title="Customer Name"
                  description="Customer Address"
                  left={() => (
                    <Image
                      source={require('../../assets/person.png')}
                      style={{width: 50, height: 50, marginTop: 20}}
                    />
                  )}
                  right={() => (
                    <View style={{justifyContent: 'space-evenly'}}>
                      <Button mode="contained" style={MapStyles.button}>
                        Message
                      </Button>
                      <Button
                        mode="contained"
                        style={MapStyles.button}
                        onPress={() => setState('available')}>
                        Finish
                      </Button>
                    </View>
                  )}
                />
              </Card.Content>
            </Card>
          </>
        ) : null}
      </View>
      {/* Navigation */}
      <PartnerNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const MapStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  driverMarker: {
    width: 60,
    height: 60,
  },
  pinPoint: {
    width: 15,
    height: 15,
  },
  button: {
    backgroundColor: '#00BF63',
    marginBottom: 5,
  },
});
