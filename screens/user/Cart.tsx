/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {styles} from '../Style';
//material ui + form
import {Divider, SegmentedButtons, Text} from 'react-native-paper';
import {UserNavigation} from '../NavigationBar';
import NumericInput from 'react-native-numeric-input';
import {Dropdown} from 'react-native-element-dropdown';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
const curUser = firebase.auth().currentUser;

const data = [
  {
    label: '30% Discount for Minimum 30K Purchase',
    value: '1',
    discount: 0.3,
    delivery: 0,
  },
  {
    label: '70% Special McDonalds Anniversary',
    value: '2',
    discount: 0.7,
    delivery: 0,
  },
  {label: 'Free Ongkir Discount', value: '3', discount: 0, delivery: 1},
];

const AddressPlace = (props: {
  restaurantAddress: string;
  restaurantDetailedAddress: string;
  customerLocationName: string;
  customerLocationAddress: string;
}) => {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 15,
        }}>
        <Image source={require('../../assets/BluePin.png')} />
        <View>
          <Text style={{fontWeight: 'bold'}}>{props.restaurantAddress}</Text>
          <Text>{props.restaurantDetailedAddress}</Text>
        </View>
        <Divider />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 8,
        }}>
        <Image source={require('../../assets/RedPin.png')} />
        <View>
          <Text style={{fontWeight: 'bold'}}>{props.customerLocationName}</Text>
          <Text>{props.customerLocationAddress}</Text>
        </View>
        <Divider />
      </View>
    </View>
  );
};

const OrderBar = (props: {total: number}) => {
  return (
    <View>
      <Divider style={{marginVertical: 15}} />
      <View style={styles2.cartContainer}>
        <View>
          <Text style={{fontSize: 15, marginLeft: 30}}>Total Cost</Text>
          <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 30}}>
            {props.total}
          </Text>
        </View>

        <TouchableOpacity>
          <View style={styles2.cartButton}>
            <Text style={{fontWeight: 'bold', padding: 8, marginLeft: 25}}>
              Order
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrderSummary = (props: {
  menuName: string;
  subtotalPrice: string;
  foodid: string;
}) => {
  const [qty, setqty] = useState(0);

  useEffect(() => {
    const fetchqty = async () => {
      const item = await firestore()
        .collection('user')
        .doc(curUser?.uid)
        .collection('cart')
        .where('foodid', '==', props.foodid)
        .limit(1)
        .get();
      try {
        setqty(item.docs[0].data().quantity);
      } catch (e) {}
    };
    fetchqty();
  });

  const handleChangeQty = async (value: number) => {
    setqty(value);
    const item = await firestore()
      .collection('user')
      .doc(curUser?.uid)
      .collection('cart')
      .where('foodid', '==', props.foodid)
      .limit(1)
      .get();
    try {
      if (!item.empty) {
        //GET THE CART ITEM ID
        const documentSnapshot = item.docs[0];
        const collectionId = documentSnapshot.id;
        //UPDATE THE CART ITEM QUANTITY
        await firestore()
          .collection('user')
          .doc(curUser?.uid)
          .collection('cart')
          .doc(collectionId)
          .update({quantity: value});
      } else {
        console.log('No collection found with the given name');
      }
    } catch (error) {
      console.error('Error getting collection by name:', error);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: 25,
          marginTop: 15,
        }}>
        {props.menuName}
      </Text>

      <View
        style={{
          marginTop: 15,
          marginRight: 36,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 14, marginRight: 15}}>
          {props.subtotalPrice}
        </Text>
        <NumericInput
          type="up-down"
          onChange={value => handleChangeQty(value)}
          initValue={qty}
          totalWidth={80}
          totalHeight={30}
          iconSize={25}
          step={1}
          textColor="black"
          valueType="integer"
          minValue={1}
          rightButtonBackgroundColor="#EA3788"
          leftButtonBackgroundColor="#E56B70"
          rounded
        />
      </View>
    </View>
  );
};

const FeeCalc = (props: {
  subtotal: number;
  deliveryFee: number;
  orderFee: number;
}) => {
  return (
    <View style={{marginVertical: 15}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 14, marginLeft: 25}}>Subtotal</Text>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 35}}>
          IDR.{props.subtotal}
        </Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 14, marginLeft: 25}}>Delivery Fee</Text>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 35}}>
          IDR.{props.deliveryFee}
        </Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 14, marginLeft: 25}}>Order Fee</Text>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 35}}>
          IDR.{props.orderFee}
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Divider style={{width: '90%'}} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <Text style={{marginLeft: 25, fontSize: 14}}>Grand Total</Text>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginRight: 35}}>
          IDR.{props.subtotal + props.deliveryFee + props.orderFee}
        </Text>
      </View>
    </View>
  );
  // export const GrandTotal = {props.subtotal+props.deliveryFee+props.orderFee}
};

const Payment = () => {
  const [value, setValue] = React.useState('');
  return (
    <View style={{marginVertical: 10}}>
      <Text
        style={{
          marginLeft: 25,
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 5,
        }}>
        Payment Method
      </Text>
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <SegmentedButtons
          style={styles.segmentButton}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'MyWallet',
              label: 'MyWallet',
            },
            {
              value: 'Cash',
              label: 'Cash',
            },
          ]}
        />
      </SafeAreaView>
    </View>
  );
};

interface CartItemData {
  foodid: string;
  quantity: number;
  restoid: string;
}
interface FoodData {
  key: string;
  restoID: string;
  name: string;
  price: string;
}

//main
export default function Cart({navigation}: {navigation: any}) {
  const [item, setItem] = useState<CartItemData[]>([]);
  const [cartItem, setCartItem] = useState<FoodData[]>([]);

  const [value, setValue] = useState();
  const [deliveryFee, setDeliveryFee] = useState<number>(5000);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [orderFee, setOrderFee] = useState<number>(5000);

  const [discSubtotal, setDiscSubtotal] = useState<number>(0);
  const [discDeliveryFee, setDiscDeliveryFee] = useState<number>(5000);

  const CartList = () => {
    return cartItem.map(element => {
      return (
        <View key={element.key}>
          {element.name !== undefined && (
            <OrderSummary
              menuName={element.name}
              subtotalPrice={'IDR. ' + parseInt(element.price, 10)}
              foodid={element.key}
            />
          )}
        </View>
      );
    });
  };

  //FETCH CART LIST
  useEffect(() => {
    const fetchCart = async () => {
      const querySnapshot = await firestore()
        .collection('user')
        .doc(curUser?.uid)
        .collection('cart')
        .get();
      const fetchedItems = querySnapshot.docs.map(
        doc => doc.data() as CartItemData,
      );
      setItem(fetchedItems);
    };
    //GET CART LIST CONTAINING FOODID
    fetchCart();
  }, []);

  //FETCH CART ITEM DETAILS
  const [uniqueItemID, setUniqueItemID] = useState<string[]>([]);
  useEffect(() => {
    const fetchCartItems = async (element: CartItemData) => {
      if (element === null || element === undefined || element.foodid === '') {
        return;
      }
      //check if the foodid is already in the uniqueItemID array
      if (!uniqueItemID.includes(element.foodid)) {
        setUniqueItemID(prevArray => [...prevArray, element.foodid]);
      } else {
        console.log('duplicate value');
        return;
      }
      const querySnapshot = await firestore()
        .collectionGroup('fooditems')
        .where('key', '==', element.foodid)
        .where('restoid', '==', element.restoid)
        .limit(1)
        .get();
      const fetchedItems = querySnapshot.docs.map(
        doc => doc.data() as FoodData,
      );
      setCartItem(prevArray => [...prevArray, fetchedItems[0]]);
    };
    //GET FOOD DATA FOR EACH CART ITEM
    item.forEach(element => {
      //check if element is null or undefined
      fetchCartItems(element);
    });
  }, [item]);

  //update subtotal when cartItem changes
  useEffect(() => {
    let tempSubtotal = 0;
    cartItem.forEach(c_item => {
      //convert price to number
      var temprice = parseInt(c_item.price, 10);
      tempSubtotal += temprice;
      console.log(tempSubtotal);
    });

    setSubtotal(tempSubtotal);
  }, [cartItem]);

  //update grand total when any of the subtotal, order fee, or delivery fee changes
  
  useEffect(() => {
    setDiscSubtotal(subtotal);
    setGrandTotal( discSubtotal + orderFee + discDeliveryFee);
  }, [subtotal, orderFee, deliveryFee]);

  

  const onApplyPromo = (disc: number, delDisc: number) => {
    setDiscSubtotal(subtotal-subtotal*disc);
    setDiscDeliveryFee(deliveryFee-deliveryFee*delDisc)
    console.log('promo applied');
    console.log(disc, delDisc);
    console.log('subtotal: ' + subtotal, 'discount: ' + disc*100 + '%');
    console.log('delivery fee: ' + deliveryFee, 'discount: ' + delDisc*100 + '%');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{minHeight: '100%'}}>
          <View style={styles.containerUncentered}>
            {/* Banner */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#00BF63',
                borderColor: 'black',
                borderBottomWidth: 1,
              }}>
              <View style={{padding: 20, alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  Restaurant Name
                </Text>
                <Text>Distance: 2.5 km</Text>
              </View>
            </View>
            {/* Content */}
            {/* Location Address */}
            <AddressPlace
              restaurantAddress="Restaurant Address"
              restaurantDetailedAddress="Restaurant Detailed Address"
              customerLocationName="Customer Location Name"
              customerLocationAddress="Customer Location Address"
            />

            {/* Order Summary */}
            <Divider />
            <View style={{marginVertical: 15}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 25}}>
                Order Summary
              </Text>
              <View>{CartList()}</View>
            </View>

            {/* Price and Fee Calculations */}
            <Divider />
           
            <FeeCalc
              subtotal={discSubtotal}
              deliveryFee={discDeliveryFee}
              orderFee={orderFee}
            />

            {/* Promo */}
            <Divider />
            <View style={{marginVertical: 15}}>
              <Text style={{marginLeft: 25, fontWeight: 'bold', fontSize: 16}}>
                Promo
              </Text>
              <Dropdown
                style={styles2.dropdown}
                placeholderStyle={styles2.placeholderStyle}
                selectedTextStyle={styles2.selectedTextStyle}
                inputSearchStyle={styles2.inputSearchStyle}
                iconStyle={styles2.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Voucher..."
                searchPlaceholder="Search..."
                value={value + ''}
                onChange={elem => {
                  onApplyPromo(elem.discount, elem.delivery);
                }}
              />
            </View>

            {/* Payment */}
            <Divider />
            <Payment />

            {/* Order Bar */}
            <OrderBar total={"IDR " + (discSubtotal+discDeliveryFee+orderFee)} />

            {/* Navigation */}
            <UserNavigation navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles2 = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cartButton: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    backgroundColor: '#A9FDAC',
    width: 112,
    height: 40,
    marginRight: 30,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
