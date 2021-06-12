/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Colors from './src/shared/colors/Colors'
import LoginScreen from "./src/auth/screens/login/LoginScreen";
import RegisterScreen from "./src/auth/screens/register/RegisterScreen";
import PropertiesScreen from "./src/properties/screens/properties/PropertiesScreen";
import PropertyScreen from "./src/properties/screens/property/PropertyScreen";
import ProfileScreen from "./src/auth/screens/profile/components/ProfileScreen";
import RentingScreen from "./src/renting/screens/renting/RentingScreen";
import MyBookings from "./src/auth/screens/bookings/MyBookings";
import MyProperties from "./src/properties/screens/properties/MyProperties";
import NewPropertyScreen from "./src/properties/screens/property/NewPropertyScreen";
import EditProperty from "./src/properties/screens/property/EditProperty";
import EditProfile from "./src/auth/screens/profile/EditProfile";
import EditBooking from "./src/auth/screens/bookings/EditBooking";

const Stack = createStackNavigator();

const App: () => Node = ( { navigation } ) => {
  return <NavigationContainer>
        <Stack.Navigator initialRouteName={ "Login" } mode={ "modal" }>
            <Stack.Screen name="Login" component={ LoginScreen } options={ {
              title: "Home",
              headerShown: false,
            } } />
            <Stack.Screen name="Register" component={ RegisterScreen } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="Properties" component={ PropertiesScreen } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="PropertyDetail" component={ PropertyScreen } />
            <Stack.Screen name="Profile" component={ ProfileScreen } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="Renting" component={ RentingScreen } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="MyBookings" component={ MyBookings } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="MyProperties" component={ MyProperties } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="NewProperty" component={ NewPropertyScreen } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="EditProperty" component={ EditProperty } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="EditProfile" component={ EditProfile } options={ {
              headerShown: false,
            } } />
            <Stack.Screen name="EditBooking" component={ EditBooking } options={ {
              headerShown: false,
            } } />
        </Stack.Navigator>
    </NavigationContainer>;
};

export default App;
