//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//basic react
import * as React from 'react';
import 'react-native-gesture-handler';
//pages
import MerchantSignup from './screens/MerchantSignup';
import MerchantDetails from './screens/MerchantDetails';
import MerchantSignin from './screens/MerchantSignin';
import MerchantHomepage from './screens/MerchantHomepage';
import MerchantMenu from './screens/MerchantMenu';
import MerchantEditProfile from './screens/MerchantEditProfile';
import MerchantTodayPromo from './screens/MerchantTodayPromo';
//paper meterial ui
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MerchantSignin"
            component={MerchantSignin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MerchantSignup"
            component={MerchantSignup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MerchantDetails"
            component={MerchantDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MerchantHomepage"
            component={MerchantHomepage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 40,
  colors: {
    ...DefaultTheme.colors,
    primary: '#A9FDAC',
    accent: '#f1c40f',
  },
};

export default App;
