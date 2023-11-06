import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';

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
    gender: '', // Will store 'Male' or 'Female'
  });

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:3000/patient/view/${patientId}`)
      .then((response) => {
        const patientData = response.data.data;
        setPatient({
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          phoneNumber: patientData.phoneNumber,
          email: patientData.email,
          height: patientData.height,
          weight: patientData.weight,
          address: patientData.address,
          gender: patientData.gender, // Assuming gender is provided in the response
        });
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, [patientId]);
  

  const handleUpdate = () => {
    // Send a PUT request to update the patient details
    axios
      .put(`http://10.0.2.2:3000/patient/update/${patientId}`, patient)
      .then((response) => {
        console.log('Patient details updated successfully:', response.data);
        // Optionally, navigate back to the patient list screen or another screen
        navigation.navigate('AllPatients');
      })
      .catch((error) => {
        console.error('Error updating patient details:', error);
      });
  };

  const handleChange = (field, value) => {
    // Update the patient state when any field changes
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
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Gender (Male/Female)"
          value={patient.gender}
          onChangeText={(text) => handleChange('gender', text)}
        />
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
