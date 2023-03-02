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
          <Stack.Screen name="MerchantSignin" component={MerchantSignin} />
          <Stack.Screen name="MerchantSignup" component={MerchantSignup} />
          <Stack.Screen name="MerchantDetails" component={MerchantDetails} />
          <Stack.Screen name="MerchantHomepage" component={MerchantHomepage} />
          <Stack.Screen name="MerchantMenu" component={MerchantMenu} />
          <Stack.Screen name="MerchantEditProfile" component={MerchantEditProfile} />
          <Stack.Screen name="MerchantTodayPromo" component={MerchantTodayPromo} />
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
