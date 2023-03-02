import React from 'react';
import { View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MerchantEditProfile from './screens/MerchantEditProfile'; 

const Drawer = createDrawerNavigator();

const Sidebar = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen
                    key='MerchantEditProfile'
                    name='Profile'
                    component={MerchantEditProfile}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )

}

export default Sidebar;