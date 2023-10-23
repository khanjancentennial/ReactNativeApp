import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainPage from '../screens/MainPage';
import AllPatients from '../screens/AllPatients';
import CriticalPatients from '../screens/CriticalPatients';
import ClinicalTests from '../screens/ClinicalTests';
import ClinicalTestDetails from '../screens/ClinicalTestDetails';

function AppNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="AllPatients" component={AllPatients} />
        <Stack.Screen name="CriticalPatients" component={CriticalPatients} />
        <Stack.Screen name="ClinicalTests" component={ClinicalTests} />
        <Stack.Screen name="ClinicalTestDetails" component={ClinicalTestDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
