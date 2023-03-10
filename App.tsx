//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//basic react
import * as React from 'react';
import 'react-native-gesture-handler';
//merchant
import MerchantSignup from './screens/merchant/MerchantSignup';
import MerchantDetails from './screens/merchant/MerchantDetails';
import MerchantSignin from './screens/merchant/MerchantSignin';
import MerchantHomepage from './screens/merchant/MerchantHomepage';
import MerchantMenu from './screens/merchant/MerchantMenu';
import MerchantEditProfile from './screens/merchant/MerchantEditProfile';
import MerchantTodayPromo from './screens/merchant/MerchantTodayPromo';
import MerchantNavigation from './screens/NavigationBar';
import MerchantProfile from './screens/merchant/MerchantProfile';

//main homepage
import Homepage from './screens/Homepage';

//partner
import PartnerSignin from './screens/partner/PartnerSignin';
import PartnerSignup from './screens/partner/PartnerSignup';
import PartnerHomepage from './screens/partner/PartnerHomepage';
import PartnerProfile from './screens/partner/PartnerProfile';
import PartnerEditProfile from './screens/partner/PartnerEditProfile';
import PartnerSignupDetails from './screens/partner/PartnerSignupDetails';

//paper meterial ui
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Homepage of entire app */}
          <Stack.Screen
            name="Homepage"
            component={Homepage}
            options={{headerShown: false}}
          />
          {/* merchant stuff */}
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
          <Stack.Screen
            name="MerchantMenu"
            component={MerchantMenu}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MerchantProfile"
            component={MerchantProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MerchantEditProfile"
            component={MerchantEditProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MerchantTodayPromo"
            component={MerchantTodayPromo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MerchantNavigation"
            component={MerchantNavigation}
            options={{headerShown: false}}
          />
          {/* Partner */}
          <Stack.Screen
            name="PartnerSignin"
            component={PartnerSignin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PartnerSignup"
            component={PartnerSignup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PartnerHomepage"
            component={PartnerHomepage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PartnerProfile"
            component={PartnerProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PartnerEditProfile"
            component={PartnerEditProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PartnerSignupDetails"
            component={PartnerSignupDetails}
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
