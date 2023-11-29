import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import RadioButtonGroup from './../components/RadioButtonGroup';

function EditUserProfileScreen({ route, navigation }) {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    email: '',
    gender: 0, // Default to Male
    healthcareProvider: 0, // Default to Doctor
  });

  const genders = ['Male', 'Female'];
  const healthcareProviders = ['Doctor', 'Nurse'];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('1', userId);
        const response = await axios.get(`https://group3-mapd713.onrender.com/auth/users/${userId}`);
        console.log('2', response);
  
        if (response.data.success) {
          const userData = response.data.user;
          // Map the gender value to numeric (0 for Male, 1 for Female)
          const genderValue = userData.gender === 'Female' ? 1 : 0;
          // Map the healthcare provider value to numeric (0 for Doctor, 1 for Nurse)
          const healthcareProviderValue = userData.healthcareProvider === 'Nurse' ? 1 : 0;
  
          setUserDetails({
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            gender: genderValue,
            healthcareProvider: healthcareProviderValue,
          });
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'Failed to fetch user details. Please try again later.');
      }
    };
  
    fetchUserDetails();
  }, [userId, navigation]);
  
  const handleUpdate = async () => {
    try {
      // Map the numeric gender value back to 'Male' or 'Female'
      const genderValue = userDetails.gender === 1 ? 'Female' : 'Male';
      // Map the numeric healthcare provider value back to 'Doctor' or 'Nurse'
      const healthcareProviderValue = userDetails.healthcareProvider === 1 ? 'Nurse' : 'Doctor';
  
      const updatedUserDetails = {
        ...userDetails,
        gender: genderValue,
        healthcareProvider: healthcareProviderValue,
      };
  
      const response = await axios.put(`https://group3-mapd713.onrender.com/auth/users/${userId}`, updatedUserDetails);
  
      if (response.data.success) {
        setUserDetails(response.data.user);
        console.log('User details updated successfully');
        Alert.alert('Success', 'User details updated successfully', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ]);
      } else {
        throw new Error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error.message);
      Alert.alert('Error', 'Failed to update user details. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={userDetails.firstName}
        onChangeText={(text) => setUserDetails({ ...userDetails, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={userDetails.lastName}
        onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={userDetails.password}
        onChangeText={(text) => setUserDetails({ ...userDetails, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userDetails.phoneNumber}
        onChangeText={(text) => setUserDetails({ ...userDetails, phoneNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userDetails.email}
        onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Gender</Text>
        <RadioButtonGroup
          options={genders}
          selectedOption={userDetails.gender}
          onOptionSelect={(value) => setUserDetails({ ...userDetails, gender: value })}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Healthcare Provider Type</Text>
        <RadioButtonGroup
          options={healthcareProviders}
          selectedOption={userDetails.healthcareProvider}
          onOptionSelect={(value) => setUserDetails({ ...userDetails, healthcareProvider: value })}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleUpdate}>
        <Text style={styles.loginButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#ED1703',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#ED1703',
    padding: 10,
    borderRadius: 10,
    width: 300,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditUserProfileScreen;
