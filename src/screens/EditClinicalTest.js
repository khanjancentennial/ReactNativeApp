import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';

function EditClinicalTestScreen({ route, navigation }) {
  const { clinicalTestId } = route.params;

  const [clinicalTestDetails, setClinicalTestDetails] = useState({
    bloodPressure: '',
    respiratoryRate: '',
    bloodOxygenLevel: '',
    heartbeatRate: '',
    chiefcomplaint: '',
    pastMedicalHistory: '',
    medicalDiagnosis: '',
    medicalPrescription: '',
  });

  useEffect(() => {
    const fetchClinicalTestDetails = async () => {
      try {
        console.log('1', clinicalTestId);
        const response = await axios.get(`https://group3-mapd713.onrender.com/clinicalTest/clinical-tests/${clinicalTestId}`);
        console.log('2', clinicalTestId, response.data);
  
        if (response.data.success) {
          const testDataArray = response.data.data;
  
          if (testDataArray.length > 0) {
            const testData = testDataArray[0]; // Assuming the data is an array with a single item
  
            setClinicalTestDetails({
              bloodPressure: testData.bloodPressure,
              respiratoryRate: testData.respiratoryRate,
              bloodOxygenLevel: testData.bloodOxygenLevel,
              heartbeatRate: testData.heartbeatRate,
              chiefcomplaint: testData.chiefComplaint,
              pastMedicalHistory: testData.pastMedicalHistory,
              medicalDiagnosis: testData.medicalDiagnosis,
              medicalPrescription: testData.medicalPrescription,
            });
          } else {
            // Handle the case where no data is found for the given clinical test ID
            console.warn('No clinical test data found for the provided ID.');
          }
        } else {
          throw new Error('Failed to fetch clinical test details');
        }
      } catch (error) {
        console.error('Error fetching clinical test details:', error);
        Alert.alert('Error', 'Failed to fetch clinical test details. Please try again later.');
      }
    };
  
    fetchClinicalTestDetails();
  }, [clinicalTestId]);  
  

  const handleUpdate = async () => {
    try {
      // Validate the clinicalTestDetails before sending the request
      if (!isValidClinicalTestDetails(clinicalTestDetails)) {
        throw new Error('Invalid clinical test details. Please check your input.');
      }
  
      // Send the update request
      const response = await axios.put(
        `https://group3-mapd713.onrender.com/clinicalTest/clinical-tests/${clinicalTestId}`,
        clinicalTestDetails
      );
  
      if (response.data.success) {
        // Navigate to the ClinicalTests screen after successful update
        navigation.navigate('ClinicalTests');
      } else {
        throw new Error('Failed to update clinical test details.');
      }
    } catch (error) {
      console.error('Error updating clinical test details:', error.message);
      Alert.alert('Error', 'Failed to update clinical test details. Please check your input and try again.');
    }
  };
  
  // Validate clinical test details function
  const isValidClinicalTestDetails = (details) => {
    // Add your validation logic here
    // For example, check if required fields are present and have valid values
    return (
      details.bloodPressure.trim() !== '' &&
      details.respiratoryRate.trim() !== '' &&
      details.bloodOxygenLevel.trim() !== '' &&
      details.heartbeatRate.trim() !== '' &&
      details.chiefcomplaint.trim() !== '' &&
      details.pastMedicalHistory.trim() !== '' &&
      details.medicalDiagnosis.trim() !== '' &&
      details.medicalPrescription.trim() !== ''
      // Add validation for other fields as needed
    );
  };
  

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Blood Pressure (X/Y mmHg)"
          value={clinicalTestDetails.bloodPressure}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, bloodPressure: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Respiratory Rate (X/min)"
          value={clinicalTestDetails.respiratoryRate}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, respiratoryRate: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Blood Oxygen Level (X%)"
          value={clinicalTestDetails.bloodOxygenLevel}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, bloodOxygenLevel: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Heartbeat Rate (X/min)"
          value={clinicalTestDetails.heartbeatRate}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, heartbeatRate: text })}
        />

        <TextInput
          style={styles.inputForMultilines}
          placeholder="Patient’s chief complaint"
          value={clinicalTestDetails.chiefcomplaint}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, chiefcomplaint: text })}
        />
        <TextInput
          style={styles.inputForMultilines}
          placeholder="Patient’s past medical history"
          value={clinicalTestDetails.pastMedicalHistory}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, pastMedicalHistory: text })}
        />

        <TextInput
          style={styles.inputForMultilines}
          placeholder="Medical diagnosis"
          value={clinicalTestDetails.medicalDiagnosis}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, medicalDiagnosis: text })}
        />

        <TextInput
          style={styles.inputForMultilines}
          placeholder="Medical prescription"
          value={clinicalTestDetails.medicalPrescription}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setClinicalTestDetails({ ...clinicalTestDetails, medicalPrescription: text })}
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
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },

  inputForMultilines: {
    width: 300,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },

  loginButton: {
    backgroundColor: '#ED1703',
    padding: 10,
    borderRadius: 10,
    width: 300,
    marginBottom: 30
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  scrollView: {
    backgroundColor: '#EFE1E1',
  },
});

export default EditClinicalTestScreen;
