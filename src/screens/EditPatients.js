import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RadioButtonGroup from './../components/RadioButtonGroup'; // Import the RadioButtonGroup component

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
    axios
      .get(`http://10.0.2.2:3000/patient/view/${patientId}`)
      .then((response) => {
        const patientData = response.data.data;
        console.log('Received gender value:', patientData.gender);
        // Map the gender value to 'Male' or 'Female'
        const genderValue = patientData.gender === 1 ? 'Female' : 'Male';
        console.log('Setting gender value:', genderValue);
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
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, [patientId]);

  const handleUpdate = () => {
    // Send a PUT request to update the patient details
    // Map the gender value back to '0' or '1'
    const genderValue = patient.gender === 'Female' ? 1 : 0;
    const updatedPatient = { ...patient, gender: genderValue };

    axios
      .put(`http://10.0.2.2:3000/patient/update/${patientId}`, updatedPatient)
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
    // Update the patient state with the selected option (either 'Male' or 'Female')
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
            options={['Male', 'Female']} // Options for the gender
            selectedOption={patient.gender} // Selected gender
            onOptionSelect={(value) => handleChange('gender', value)} // Update gender
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
