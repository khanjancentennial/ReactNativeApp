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
import EditPatientDetails from '../screens/EditPatients';
import PatientsDetails from '../screens/PatientsDetails';
import AddClinicalTest from '../screens/AddClinicalTest';
import EditClinicalTest from '../screens/EditClinicalTest';
import ViewCritricalPatientDetails from '../screens/ViewCriticalPatientDetails';
import UserProfileScreen from '../screens/UserProfile';
import EditUserProfileScreen from '../screens/EditProfile';
import AddClinicalTestScreen from '../screens/AddClinicalTest';


function AppNavigator() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerTitle:'Login'}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle:'Welcome'}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerTitle:'Register Here'}}/>
        <Stack.Screen name="Main" component={MainPage} options={{headerLeft: null, headerTitle: 'Main Page'}}/>
        <Stack.Screen name="AllPatients" component={AllPatients} options={{headerTitle:'All Patients'}} />
        <Stack.Screen name="CriticalPatients" component={CriticalPatients} options={{headerTitle:'Critical Patients'}}/>
        <Stack.Screen name="ClinicalTests" component={ClinicalTests} options={{headerTitle:'Clinical Tests'}}/>
        <Stack.Screen name="ClinicalTestDetails" component={ClinicalTestDetails} options={{headerTitle:'Clinical Test Data'}}/>
        <Stack.Screen name="AddPatients" component={AddPatientScreen} options={{headerTitle:'Add Patients'}}/>
        <Stack.Screen name="EditPatientDetails" component={EditPatientDetails} options={{headerTitle:'Edit Details'}}/>
        <Stack.Screen name="Patient Details" component={PatientsDetails} options={{headerTitle:'Patient Details'}}/>
        <Stack.Screen name="AddClinicalTest" component={AddClinicalTestScreen} options={{headerTitle:'Add Clinical Test'}} />
        <Stack.Screen name="EditClinicalTest" component={EditClinicalTest} options={{headerTitle:'Edit Test'}} />
        <Stack.Screen name="ViewCriticalPatientDetails" component={ViewCritricalPatientDetails} options={{headerTitle:'Critical Patients'}} />
        <Stack.Screen name="User Profile" component={UserProfileScreen} options={{headerTitle:'Profile'}}/>
        <Stack.Screen name="EditUserProfile" component={EditUserProfileScreen} options={{headerTitle:'Edit Profile'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
