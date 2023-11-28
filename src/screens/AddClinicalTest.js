import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import RadioButtonGroup from './../components/RadioButtonGroup';

function AddClinicalTestScreen({ navigation, route }) {
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState('');
  const [heartbeatRate, setHeartbeatRate] = useState('');
  const [chiefcomplaint, setChiefcomplaint] = useState('');
  const [pastMedicalHistory, setPastMedicalHistory] = useState('');
  const [medicalDiagnosis, setMedicalDiagnosis] = useState('');
  const [medicalPrescription, setMedicalPrescription] = useState('');
  const [patientName, setPatientName] = useState('');
  const { firstName, lastName } = route.params ?? {};
  // Use effect to set initial values when the component mounts
  useEffect(() => {
    // Get patientId, firstName, and lastName from navigation parameters
    const { patientId, firstName, lastName } = route.params ?? {};
    
    // Assuming you have a function to fetch patient details by ID
    const fetchPatientDetails = async (id, firstName, lastName) => {
      try {
        // Example API call to get patient details
        const response = await fetch(`https://group3-mapd713.onrender.com/clinicalTest/clinical-tests?patientId=${id}`);
        const data = await response.json();
    
        // Filter clinical tests for the specific patient ID
        const patientTests = data.data.filter((test) => test.patient?._id === id);
    
        if (patientTests.length > 0) {
          // Set the patient details to state
          setPatientName(`${firstName} ${lastName}`);
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };
  
    // Fetch patient details when patientId changes
    if (patientId) {
      fetchPatientDetails(patientId);
    }
  }, [route.params?.patientId, route.params?.firstName, route.params?.lastName]);
  
  

  const handleRegister = async () => {
    try {
      // Create a new clinical test object based on the provided JSON structure
      const newClinicalTest = {
        bloodPressure: parseInt(bloodPressure),
        respiratoryRate: parseInt(respiratoryRate),
        bloodOxygenLevel: parseInt(bloodOxygenLevel),
        heartbeatRate: parseInt(heartbeatRate),
        chiefComplaint: chiefcomplaint,
        pastMedicalHistory: pastMedicalHistory,
        medicalDiagnosis: medicalDiagnosis,
        medicalPrescription: medicalPrescription,
        creationDateTime: new Date().toISOString(),
        patientId: route.params?.patientId,
      };
  
      // Make a POST request to add the new clinical test
      const response = await fetch('https://group3-mapd713.onrender.com/clinicalTest/clinical-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClinicalTest),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Clinical test added successfully!');
        Alert.alert('Success', 'Clinical test added successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ClinicalTests'),
          },
        ]);
      } else {
        console.error('Failed to add clinical test:', response.statusText);
        Alert.alert('Error', 'Failed to add clinical test. Please try again.', [
          {
            text: 'OK',
          },
        ]);
      }
    } catch (error) {
      console.error('Error adding clinical test:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.', [
        {
          text: 'OK',
        },
      ]);
    }
  };
  
  

  return (
   
    <ScrollView style={styles.scrollView}>
     <SafeAreaView  style={styles.container}>
        
      {/* <Text style={styles.heading}></Text> */}
      <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailInfo}>{firstName} {lastName}</Text>
        </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Blood Pressure (X/Y mmHg)"
        value={bloodPressure}
        onChangeText={(text) => setBloodPressure(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Respiratory Rate (X/min)"
        value={respiratoryRate}
        onChangeText={(text) => setRespiratoryRate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Blood Oxygen Level (X%)"
        value={bloodOxygenLevel}
        onChangeText={(text) => setBloodOxygenLevel(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Heartbeat Rate (X/min)"
        value={heartbeatRate}
        onChangeText={(text) => setHeartbeatRate(text)}
      />

      <TextInput
        style={styles.inputForMultilines}
        placeholder="Patient’s chief complaint"
        value={chiefcomplaint}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setChiefcomplaint(text)}
      />
      <TextInput
        style={styles.inputForMultilines}
        placeholder="Patient’s past medical history"
        value={pastMedicalHistory}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setPastMedicalHistory(text)}
      />

      <TextInput
        style={styles.inputForMultilines}
        placeholder="medical diagnosis"
        value={medicalDiagnosis}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setMedicalDiagnosis(text)}
      />

      <TextInput
        style={styles.inputForMultilines}
        placeholder="medical prescription"
        value={medicalPrescription}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setMedicalPrescription(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Add Details</Text>
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
    marginBottom: 10,
    marginTop : 10,
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

  labelContainer: {
    width : 300,
    flexDirection: 'Column',
    alignItems: 'left', // Center the labels
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
    marginBottom : 30
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },

  scrollView: {
    backgroundColor: '#EFE1E1',
  },

  detailRow: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop : 20
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
  },

  detailInfo: {
    fontSize: 16,
    width: '50%',
  },

});

export default AddClinicalTestScreen;