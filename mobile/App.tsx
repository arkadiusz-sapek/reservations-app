import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginPage from '@mobile/features/Login/LoginPage';
import ReservationsPage from '@mobile/features/Reservations/ReservationsPage';
import RegisterPage from '@mobile/features/Register/RegisterPage';


const Stack = createNativeStackNavigator();


const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={RegisterPage}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
        />
        <Stack.Screen name="Profile" component={ReservationsPage} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default App;


