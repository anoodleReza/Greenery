/* eslint-disable react-native/no-inline-styles */
//building the screen
import {Button, SegmentedButtons} from 'react-native-paper';
import {Text, View, TextInput, Image, Platform, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import NumericInput from 'react-native-numeric-input';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
const includeExtra = true;

//firebase stuff
import {ScrollView} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

//form
import {Formik} from 'formik';

//import other screens
import MerchantHeader from '../PageHeader';
import MerchantNavigation from '../NavigationBar';
import {styles} from '../Style';

const initialState = {
  Vegan: false,
  Keto: false,
  Mediterranean: false,
  LowSugar: false,
  LowCarb: false,
  LowCal: false,
};
interface FoodData {
  stock: number;
  name: string;
  category: string;
  description: string;
  price: number;
  calorie: number;
}

//Main funcion
export default function MerchantAddMenu({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const foodID = JSON.stringify(route.params.foodID).replace(/"/g, '');

  const curUser = firebase.auth().currentUser;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //checkbox
  const [state, setState] = React.useState(initialState);

  //fetch food information
  const initialArray: FoodData[] = [
    {
      stock: 0,
      name: 'Food Name...',
      category: 'Food Category...',
      description: 'Food Description...',
      price: 0,
      calorie: 0,
    },
  ];
  const [item, setItem] = useState<FoodData[]>(initialArray);
  useEffect(() => {
    if (foodID !== 'new') {
      const fetchRestaurants = async () => {
        const querySnapshot = await firestore()
          .collection('fooditems')
          .where('key', '==', foodID)
          .get();
        const fetchedFood = querySnapshot.docs.map(
          doc => doc.data() as FoodData,
        );
        setItem(fetchedFood);
      };
      fetchRestaurants();
    }
  }, [foodID]);

  //Fetch user data on start
  useEffect(() => {
    if (!isLoggedIn) {
      if (curUser) {
        setIsLoggedIn(true);
      } else {
        console.log('Error in retrieving user data');
      }
    }
  }, [curUser, isLoggedIn]);

  //Used for menu photo
  //used for profile picture
  const [response, setResponse] = React.useState<any>(null);
  const onImageSelect = React.useCallback((type: any, options: any) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  //upload to firebase
  const [pfpUri, setpfpUri] = useState(null);
  return (
    <View>
      <ScrollView>
        {/* Banner */}
        <MerchantHeader navigation={navigation} />

        {/* Main Content */}

        <View style={styles.container}>
          {/* Menu Information */}
          <Text style={styles.Subheading}>Menu Information</Text>
          <>
            <Text style={styles.Subheading}>Menu Picture:</Text>
            {/* Image Selection */}
            <View>
              {actions.map(({title, type, options}) => {
                return (
                  <Button
                    style={styles.button}
                    textColor="black"
                    mode="contained"
                    key={title}
                    onPress={() => {
                      onImageSelect(type, options);
                    }}>
                    {title}
                  </Button>
                );
              })}
            </View>
            {/* Show response */}
            {response?.assets &&
              response?.assets[0].uri &&
              response?.assets.map(({uri}: {uri: string}) => (
                <View style={styles.container} key={uri}>
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={{
                      height: 200,
                      width: 200,
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    source={{uri: uri}}
                  />
                  <Button
                    style={styles.button}
                    textColor="black"
                    mode="contained"
                    onPress={async () => {
                      //assign variable the uri
                      setpfpUri(response.assets[0].uri);
                      console.log('file: ', pfpUri);
                      const filename = 'ProfilePicture:' + curUser?.uid;
                      //change uri link if needed
                      if (pfpUri != null) {
                        const uploadUri =
                          Platform.OS === 'ios'
                            ? pfpUri.replace('file://', '')
                            : pfpUri;
                        //check if there is a pfp already (if there is an image url)
                        const fullpath = '/userProfile/' + filename;
                        if (storage().ref(fullpath).getDownloadURL() != null) {
                          storage().ref(fullpath).delete();
                        }
                        //put file on storage
                        const task = storage()
                          .ref('/userProfile/' + filename)
                          .putFile(uploadUri);
                        try {
                          await task;
                        } catch (e) {
                          console.error(e);
                        }
                        //success
                        Alert.alert(
                          'Photo uploaded!',
                          'Your photo has been uploaded to Firebase Cloud Storage!',
                        );
                        setpfpUri(null);
                      }
                    }}>
                    Upload image
                  </Button>
                </View>
              ))}
          </>

          {/* Details */}
          <Formik
            initialValues={{
              stock: 0,
              name: '',
              category: '',
              description: '',
              price: 0,
              calorie: 0,
            }}
            onSubmit={values => {
              if (firestore().collection('fooditems').doc(curUser?.uid)) {
                 //user data found found
                 console.log('user data found');
                 firestore()
                   .collection('fooditems')
                   .doc(curUser?.uid)
                   .set({
                     Stock: values.stock,
                     Name: values.name,
                     Category: values.category,
                     Price: values.price,
                     Description: values.description,
                     Calorie: values.calorie
                   })
                   .then(() => {
                     console.log('User updated!');
                   });
               }
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder={item[0].name}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                <TextInput
                  style={styles.input}
                  placeholder={item[0].description}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
                <Text style={styles.Subheading}>Details:</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Text style={{marginRight: 20, fontWeight: 'bold'}}>
                    Stocks
                  </Text>

                  <NumericInput
                    type="up-down"
                    onChange={value => console.log(value)}
                    totalWidth={200}
                    totalHeight={40}
                    iconSize={25}
                    step={1}
                    textColor="black"
                    valueType="integer"
                    minValue={0}
                    rightButtonBackgroundColor="#EA3788"
                    leftButtonBackgroundColor="#E56B70"
                    rounded
                    iconStyle={{color: 'black'}}
                  />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder={'Price: ' + item[0].price}
                  value={values.price}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                />

                <SegmentedButtons
                  style={styles.segmentButton}
                  value={values.Type}
                  onValueChange={handleChange('Type')}
                  theme={buttons}
                  buttons={[
                    {
                      value: 'Appetizer',
                      label: 'Appetizer',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.Type === 'Appetizer'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                    {
                      value: 'Main',
                      label: 'Main',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.Type === 'Main'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                    {
                      value: 'Dessert',
                      label: 'Dessert',
                      style: {
                        borderWidth: 0,
                        borderRadius: 15,
                        backgroundColor:
                          values.Type === 'Dessert'
                            ? buttons.colors.primary
                            : buttons.colors.background,
                      },
                    },
                  ]}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={styles.checkboxWrapper}>
                      <CheckBox
                        value={state.Vegan}
                        onValueChange={value =>
                          setState({
                            ...state,
                            Vegan: value,
                          })
                        }
                      />
                      <Text>Vegan</Text>
                    </View>

                    <View style={styles.checkboxWrapper}>
                      <CheckBox
                        value={state.Keto}
                        onValueChange={value =>
                          setState({
                            ...state,
                            Keto: value,
                          })
                        }
                      />
                      <Text>Keto</Text>
                    </View>

                    <View style={styles.checkboxWrapper}>
                      <CheckBox
                        value={state.Mediterranean}
                        onValueChange={value =>
                          setState({
                            ...state,
                            Mediterranean: value,
                          })
                        }
                      />
                      <Text>Mediterranean</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View style={styles.checkboxWrapper}>
                      <CheckBox
                        value={state.LowSugar}
                        onValueChange={value =>
                          setState({
                            ...state,
                            LowSugar: value,
                          })
                        }
                      />
                      <Text>Low Sugar</Text>
                    </View>

                    <View style={styles.checkboxWrapper}>
                      <CheckBox
                        value={state.LowCarb}
                        onValueChange={value =>
                          setState({
                            ...state,
                            LowCarb: value,
                          })
                        }
                      />
                      <Text>Low Carb</Text>
                    </View>

                    <View style={styles.checkboxWrapper}>
                      <CheckBox
                        value={state.LowCal}
                        onValueChange={value =>
                          setState({
                            ...state,
                            LowCal: value,
                          })
                        }
                      />
                      <Text>Low Cal</Text>
                    </View>
                  </View>
                </View>

                {/* Confirm Button */}
                <Button
                  style={styles.button}
                  textColor="black"
                  mode="contained"
                  onPress={handleSubmit}>
                  Confirm
                </Button>
              </>
            )}
          </Formik>
        </View>

        {/* Navigation Bar */}
        <MerchantNavigation navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const buttons = {
  roundness: 5,
  colors: {
    primary: '#A9FDAC',
    accent: '#f1c40f',
    background: '#f2f2f2',
  },
};

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
];
