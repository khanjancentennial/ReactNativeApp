import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import RadioButtonGroup from './../components/RadioButtonGroup';

function EditPatientDetails({ route, navigation }) {
  const { patientId } = route.params;
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    height: '',
    weight: '',
    address: '',
    gender: 0, // '0' for Male, '1' for Female (as strings)
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`https://group3-mapd713.onrender.com/patient/view/${patientId}`);
  
        if (response.data.success) {
          const patientData = response.data.data;
  
          if (patientData) {
            console.log('Fetched Patient Data:', patientData);
  
            const genderValue = patientData.gender === 1 ? 1 : 0;
  
            setPatient({
              firstName: patientData.firstName,
              lastName: patientData.lastName,
              phoneNumber: patientData.phoneNumber,
              email: patientData.email,
              height: patientData.height,
              weight: patientData.weight,
              address: patientData.address,
              gender: genderValue,
            });
          } else {
            throw new Error('Patient data is undefined');
          }
        } else {
          throw new Error('Failed to fetch patient details');
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
        Alert.alert('Error', `Failed to fetch patient details. Error: ${error.message}`);
      }
    };
  
    fetchPatientDetails();
  }, [patientId]);
  
  useEffect(() => {
    console.log('Updated patient state:', patient);
  }, [patient]);
  

  const handleUpdate = async () => {
    try {
      // Remove the mapping of gender value back to '0' or '1'
      const updatedPatient = { ...patient };
  
      const response = await axios.put(`https://group3-mapd713.onrender.com/patient/patients/${patientId}`, updatedPatient);
  
      console.log('Update Response:', response.data);
  
      if (response.data.success) {
        setPatient({ ...patient, ...response.data.data });
  
        Alert.alert('Success', 'Patient details updated successfully', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('AllPatients'),
          },
        ]);
      } else {
        throw new Error('Failed to update patient details');
      }
    } catch (error) {
      console.error('Error updating patient details:', error.message);
      Alert.alert('Error', 'Failed to update patient details. Please try again.');
    }
  };
  

  const handleChange = (field, value) => {
    setPatient({ ...patient, [field]: value });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient First Name"
          value={patient.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Last Name"
          value={patient.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Phone Number"
          value={patient.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Email Address"
          value={patient.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Height in CM"
          value={patient.height}
          onChangeText={(text) => handleChange('height', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Weight in KG"
          value={patient.weight}
          onChangeText={(text) => handleChange('weight', text)}
        />
        <TextInput
          style={styles.inputForMultilines}
          placeholder="Enter Patient Home Address"
          value={patient.address}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => handleChange('address', text)}
        />
        
        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.labelContainer}>
          <RadioButtonGroup
            options={['Male', 'Female']}
            selectedOption={patient.gender}
            onOptionSelect={(value) => handleChange('gender', value)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleUpdate}>
          <Text style={styles.loginButtonText}>Update</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
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
    marginBottom: 20,
    color: '#ED1703',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputForMultilines: {
    width: 300,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: '#ED1703',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: 300,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    backgroundColor: '#EFE1E1',
  },
});

export default EditPatientDetails;
