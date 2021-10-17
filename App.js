import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home.js';
import GameDetailsScreen from './src/GameDetails.js';


export default function App() {

  const Stack = createStackNavigator();
 
  return (  
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Add Game">
          <Stack.Screen name="Add Game" component={HomeScreen} />
          <Stack.Screen name="Details" component={GameDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );

}

