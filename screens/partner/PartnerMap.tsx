/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {PartnerHeader} from '../PageHeader';
import {styles} from '../Style';
import {PartnerNavigation} from '../NavigationBar';
import MapView, {Marker} from 'react-native-maps';
import {Button, Card, IconButton, List} from 'react-native-paper';

export default function PartnerMap({navigation}: {navigation: any}) {
  const [state, setState] = useState<number>(1);

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
          {state === 1 ? (
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
        </MapView>

        {/* add some mechanism to automatically increment state when receiving new order ??? */}
        {state === 1 ? (
          <>
            <Card mode="elevated" style={{marginBottom: 20}}>
              <Card.Content>
                <List.Item
                  title="Waiting for order..."
                  description="Tips: You can go offline to stop receiving orders"
                />
              </Card.Content>
            </Card>
          </>
        ) : null}

        {/* CONFIRMING ORDER STATE */}
        {state === 2 ? (
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

            <Card mode="elevated" style={{marginBottom: 20}}>
              <Card.Content>
                <List.Item
                  title="Confirm Delivery Order"
                  description="Restaurant located 800m from you"
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
        {state === 3 ? (
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

            <Card mode="elevated" style={{marginBottom: 20}}>
              <Card.Content>
                <List.Item
                  title="Restaurant Name"
                  description="Restaurant Address"
                  left={() => (
                    <Image
                      source={require('../../assets/person.png')}
                      style={{width: 50, height: 50, marginTop: 20}}
                    />
                  )}
                  right={() => (
                    <View style={{justifyContent: 'space-evenly'}}>
                      <Button mode="contained" style={MapStyles.button}>
                        Message Cust.
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
        {state === 4 ? (
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
                        onPress={() => setState(state - 3)}>
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
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#00BF63',
    marginBottom: 5,
  },
});
