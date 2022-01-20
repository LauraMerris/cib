import React, {useEffect, useState} from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';

import ThemeProvider from './src/ThemeProvider.js';


import HomeScreen from './src/Home.js';
import {auth} from './src/firebaseConnect.js';
import { onAuthStateChanged } from 'firebase/auth';
import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GameDetailsScreen from './src/Details.js';
import Login from './src/LoginScreen.js';
import RegisterScreen from './src/RegisterScreen.js';
import Welcome from './src/WelcomeScreen.js';
import SplashScreen from './src/SplashScreen.js';

export default function App() {

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const completeDark = {
    dark: true,
    colors: {
      primary: 'rgb(192, 239, 224)',
      background: 'rgb(43, 43, 43)',
      card: 'rgb(43, 43, 43)',
      text: 'rgb(255, 255, 255)',
      border: 'transparent',
      notification: '#c0efe0',
    }, 
  };
  const completeLight = {
    dark:false,
    primary: 'rgb(192, 239, 224)',
      background: 'rgb(43, 43, 43)',
      card: 'rgb(43, 43, 43)',
      text: 'rgb(255, 255, 255)',
      border: 'transparent',
      notification: '#c0efe0',
  };

  const colorScheme = useColorScheme();
  const currentTheme =
    (colorScheme == 'dark') ? completeDark : DefaultTheme;
  const safeAreaScheme =
    (colorScheme == 'dark') ? styles.darkBackgroundColor : styles.lightBackgroundColor;
  const statusBarScheme =
    (colorScheme == 'dark') ? 'light' : 'dark';

  const Stack = createStackNavigator();
  const TabStack = createBottomTabNavigator();
  const AddGameStack = createStackNavigator();

  const AddGameStackScreen = () => {
    return (
      <AddGameStack.Navigator>
            <AddGameStack.Screen name="Add Game"component={HomeScreen} />
            <AddGameStack.Screen name="Details" component={GameDetailsScreen} />
      </AddGameStack.Navigator>
    )
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      try{
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setIsLoading(false);
      } catch(error){
        console.log(error);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // protected routes 
 if (isLoading){
   return <SafeAreaView><SplashScreen /></SafeAreaView>
 }

  return (  
    <ThemeProvider>
      <NavigationContainer theme={currentTheme}>
        { user ? (
          // user is logged in
          <SafeAreaView style={[{flex:1}, safeAreaScheme]}>
            <TabStack.Navigator
            >
              <TabStack.Screen name="Add" 
                component={AddGameStackScreen} 
                options={{
                  tabBarLabel: 'Add Game', 
                  headerShown: false, 
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
                  ), 
                }} 
              />
              <TabStack.Screen 
                name="Account" 
                component={Welcome} 
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                  ),
                }} 
              />
            </TabStack.Navigator>
            <StatusBar style={statusBarScheme}/>
          </SafeAreaView>
        ) : (
          // user is not logged in
          <SafeAreaView style={{flex:1}}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        )}
      </NavigationContainer>
    </ThemeProvider>
  );

}

const styles = StyleSheet.create({
  darkBackgroundColor: {
    backgroundColor:'#2b2b2b'
  },
  lightBackgroundColor: {
    backgroundColor:'#ffffff'
  },
});



