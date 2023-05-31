import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { PartnerHeader } from '../PageHeader'
import { styles } from '../Style';
import { PartnerNavigation } from '../NavigationBar';
import MapView, { Marker } from 'react-native-maps';
import { Button, Card, IconButton, List } from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';

export default function UserMap ({navigation}: {navigation: any}) {

  const [state, setState] = useState<number>(3);
  // Coordinates
  const driver = {latitude: -3.723, longitude: -38.515,};
  const merchant = {latitude: -3.727,longitude: -38.514,};
  const user = {latitude: -3.719,longitude: -38.511,};
  // Google API Key
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDt3gq9B06vP0LuF24Zb2GmsARP3stipaw';

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
          }}
          >
            <Marker
            description="Driver Location"
            coordinate={driver}>

            <Image 
            source={require('../../assets/driverMarker.png')} 
            style={MapStyles.driverMarker}/>

            </Marker>

            <Marker
            description="User Location"
            coordinate={user}>
            <Image 
            source={require('../../assets/destination.png')} 
            style={MapStyles.pinPoint}/>

            </Marker>

            <Marker
            description="Merchant Location"
            coordinate={merchant}
            >
            <Image 
            source={require('../../assets/restaurant.png')} 
            style={MapStyles.pinPoint}/>

            </Marker>
          {/* DRIVER GOING TO RESTAURANT STATE */}
          
          {
            state == 1  ?
            <>
            {/* Directions */}
            <MapViewDirections
            origin={driver}
            destination={merchant}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#00BF63"/>
            </>
            :null
          }

          {/* DRIVER GOING TO USER HOME STATE */}

          {
            state == 3 ?
            <>
            <MapViewDirections
            origin={merchant}
            destination={user}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#00BF63"/>

            </>
            :null

          }
          
          </MapView>
            {/* DRIVER GO TO RESTAURANT State */}

       {
           state == 1 ?
           <>
           <Card mode='elevated' style={{marginBottom: 20}}>
           <Card.Content>
             <List.Item
             title="Driver is on the way to the restaurant"
             description="Driver Name Plate Number"
             descriptionNumberOfLines={3}
             titleNumberOfLines={3}
             left={() => <Image source={require('../../assets/person.png')} 
                  style={{width: 50, height: 50,marginTop:3}}/>}
             right={() =>
             <View>
               <Button>Cancel</Button>
               <TouchableOpacity>
                <Button mode="contained" style={MapStyles.button}>Message</Button>
               </TouchableOpacity>
             </View>
            }
             />
           </Card.Content>
           </Card>
           </>
           :null
          }
          {/* DRIVER WAITING AT RESTAURANT STATE */}
         
            {
            state == 2 ?
            <>
            <Card mode='elevated' style={{marginBottom: 20}}>
            <Card.Content>
              <List.Item
              title="Driver has arrived at the restaurant"
              description="Driver Name Plate Number"
              descriptionNumberOfLines={3}
              titleNumberOfLines={3}
              left={() => <Image source={require('../../assets/person.png')} 
                     style={{width: 50, height: 50,marginTop:3}}/>}
              right={() =>
              <View>
                <TouchableOpacity>
                  <Button mode="contained" style={MapStyles.button}>Message</Button>
               </TouchableOpacity>
              </View>
             }
              />
            </Card.Content>
            </Card>
            </>
            :null
          }

          {/* DRIVER GOING TO USER HOME */}

          {
            state == 3 ?
            <>
            <Card mode='elevated' style={{marginBottom: 20}}>
            <Card.Content>
              <List.Item
              title="Driver is on the way to your home"
              description="Driver Name Plate Number "
              descriptionNumberOfLines={3}
              titleNumberOfLines={3}
              left={() => <Image source={require('../../assets/person.png')} style={{width: 50, height: 50,marginTop:3}}/>}
              right={() =>
              <View style={{justifyContent:'space-evenly'}}>
               <TouchableOpacity>
                  <Button mode="contained" style={MapStyles.button}>Message</Button>
               </TouchableOpacity>
              </View>
             }
              />
            </Card.Content>
            </Card>
            </>
            :null
          }
          {/* DELIVERING ORDER STATE */}
          
        </View>
        {/* Navigation */}
        <PartnerNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const MapStyles = StyleSheet.create({
  flex:{
    flex:1
  },
  driverMarker:{
    width: 60,
    height: 60,
  },
  pinPoint:{
    width: 15,
    height: 15,
  },
  button: {
    backgroundColor: '#00BF63',
    marginBottom: 5
  }
});

