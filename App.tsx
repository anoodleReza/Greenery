//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//basic react
import * as React from 'react';
import 'react-native-gesture-handler';
//pages
import MerchantSignup from './screens/MerchantSignup';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MerchantSignup" component={MerchantSignup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
