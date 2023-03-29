/* eslint-disable react-native/no-inline-styles */
import React, {Component, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {View, Image, TouchableOpacity, ScrollView, Button, Alert, StyleSheet} from 'react-native';
import {styles} from '../Style';
//material ui + form
import {Divider, Text, Modal, Provider, Portal} from 'react-native-paper';
import {UserNavigation} from '../NavigationBar';
import {UserHeader} from '../PageHeader';

//firebase
import firestore from '@react-native-firebase/firestore';

interface RestoData {
  key: number;
  Name: string;
  Category: string;
  image: string;
  Address: string;
}
// Restaurant cards
const Restaurant = (props: {
  navigation: any;
  RestaurantName: string;
  FoodCategory: string;
  eta: number;
  distance: number;
  image: string;
}) => {
  return (
    <View style={{flexDirection: 'row', marginLeft: 15, marginBottom: 25}}>
      <TouchableOpacity style={styles.touchButton} onPress={props.navigation}>
        {props.image !== null ? (
          <View style={styles.RestaurantBoxOutside}>
            <Image
              style={styles.RestaurantBoxInside}
              source={{
                uri: props.image,
              }}
            />
          </View>
        ) : (
          <View style={styles.RestaurantBoxOutside}>
            <View style={styles.RestaurantBoxInside} />
          </View>
        )}
      </TouchableOpacity>
      <View style={{justifyContent: 'center', marginLeft: 15}}>
        <Text style={styles.buttonTitle}>{props.RestaurantName}</Text>
        <Text>{props.FoodCategory}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>{props.eta} mins - </Text>
          <Text>{props.distance} km </Text>
        </View>
      </View>
    </View>
  );
};

const MyComponent = (props:{
  Image: any;
  MenuName: any;
  


}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View  >
      <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View>
            <Image source={{uri: props.Image}}/>
            <Text>{props.MenuName}</Text>
            <Text>{props.MenuDescription}</Text>
          </View>
          
        </Modal>
      </Portal>
      </Provider>
      <View
          style={{
            borderWidth: 0.5,
            borderColor: 'black',
            borderRadius: 50,
            backgroundColor: 'white',
            width: 65,
            height: 18,
            alignItems: 'center',
            marginTop: 5,
          }}
          >
          <TouchableOpacity onPress={showModal}>
            {/* add button */}
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};




//main
export default function Search({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [resto, setResto] = useState<RestoData[]>([]);
  const query = JSON.stringify(route.params.query).replace(/"/g, '');

  //retrieve restaurant information
  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await firestore()
        .collection('merchant')
        .where('Name', '==', query)
        .limit(20)
        .get();
      const fetchedRestaurants = querySnapshot.docs.map((doc, index) => ({
        ...(doc.data() as RestoData),
        key: index,
      }));
      setResto(fetchedRestaurants);
    };
    fetchRestaurants();
  }, [query]);

  // Map restaurant array into the components
  const RestoList = () => {
    return resto.map(element => {
      return (
        <View key={element.key}>
          <Restaurant
            navigation={() => {
              navigation.dispatch(
                navigation.push('RestaurantPage', {
                  restoName: element.Name,
                  restoAddress: element.Address,
                  restoCategory: element.Category,
                  restoImage: element.image,
                }),
              );
            }}
            RestaurantName={element.Name}
            FoodCategory={element.Category}
            eta={30}
            distance={1.5}
            image={element.image}
          />
        </View>
      );
    });
  };

  // const RestoList = () => {
  //   return resto.map(element => {
  //     return (
  //       <View key={element.key}>
  //         <Restaurant
  //           navigation={() => {
  //             navigation.dispatch(
  //               navigation.push('RestaurantPage', {
  //                 restoName: element.Name,
  //                 restoAddress: element.Address,
  //                 restoCategory: element.Category,
  //                 restoImage: element.image,
  //               }),
  //             );
  //           }}
  //           RestaurantName={element.Name}
  //           FoodCategory={element.Category}
  //           eta={30}
  //           distance={1.5}
  //           image={element.image}
  //         />
  //       </View>
  //     );
  //   });
  // };

  //  class modal extends Component {
  //   // initial state
  //   state = {
  //     isVisible: false
  //   };
  //   // hide show modal
  //   displayModal(show){
  //     this.setState({isVisible: show})
  //   }
  //   render() {
  //     return (
  //       <View style = { styles2.container }>
  //         <Modal
  //             animationType = {"slide"}
  //             transparent={false}
  //             visible={this.state.isVisible}
  //             onRequestClose={() => {
  //               Alert.alert('Modal has now been closed.');
  //             }}>
  //             {/* <Image 
  //               source={require('./assets/scooby.jpeg')}
  //               style = { styles2.image }/> */}
  //               <Text style = { styles2.text }>
  //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  //                   Maecenas eget tempus augue, a convallis velit.</Text>
  //           </Modal>
              
  //           <TouchableOpacity
  //               style={styles2.button}
  //               onPress={() => {
  //                 this.displayModal(true);
  //               }}>
  //               <Text style={styles2.buttonText}>Show Modal</Text>
  //           </TouchableOpacity>          
  //         </View>
  //       );
  //   }
  // };
 

  //Main Function
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.containerUncentered}>
          {/* Banner */}
          <UserHeader navigation={navigation} />
          {/* Content */}
          <View style={styles.basicContainer}>
            <View>
              <Text style={styles.homepagetext}>Search Results</Text>
              <Text style={{marginLeft: 30}}>
                Try the best we have to offer:
              </Text>
            </View>

            <Divider
            style={{marginTop: 15}}
            />
            {/* Testing Database */}
            <Text style={styles.homepagetext}>Restaurant</Text>
            <View>{RestoList()}</View>

            <Divider
            style={{marginTop: 15}}
            />
            <Text style={styles.homepagetext}>Menu</Text>

           
            

            


         


            

            
          </View>

          {/* Navigation */}
          <UserNavigation navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

