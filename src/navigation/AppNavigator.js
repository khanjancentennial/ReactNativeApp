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
import AddPatientScreen from '../screens/AddPatients';
import EditPatientDeatails from '../screens/EditPatients';
import PatientsDetails from '../screens/PatientsDetails';
import AddClinicalTest from '../screens/AddClinicalTest';
import EditClinicalTest from '../screens/EditClinicalTest';
import ViewCritricalPatientDetails from '../screens/ViewCriticalPatientDetails';
import UserProfileScreen from '../screens/UserProfile';
import EditUserProfileScreen from '../screens/EditProfile';


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
        <Stack.Screen name="AddPatients" component={AddPatientScreen} />
        <Stack.Screen name="Edit Patient Details" component={EditPatientDeatails} />
        <Stack.Screen name="Patient Details" component={PatientsDetails} />
        <Stack.Screen name="Add Clinical Test" component={AddClinicalTest} />
        <Stack.Screen name="Edit Clinical Test" component={EditClinicalTest} />
        <Stack.Screen name="Critrical Patient Details" component={ViewCritricalPatientDetails} />
        <Stack.Screen name="User Profile" component={UserProfileScreen} />
        <Stack.Screen name="Edit User Profile" component={EditUserProfileScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
