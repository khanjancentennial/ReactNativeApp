import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';
import axios from 'axios';

// Import your images
import searchIcon from '../../assets/icons/magnifying-glass.png';
import addUserIcon from '../../assets/icons/add-user.png';
import deleteIcon from '../../assets/icons/delete.png';
import editUserIcon from '../../assets/icons/user-avatar.png';
import viewDetailsIcon from '../../assets/icons/info.png';
import addClinicalTestIcon from '../../assets/icons/add-event.png';
import crossIcon from '../../assets/icons/close.png';

function AllPatients({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [patientsFound, setPatientsFound] = useState(true);

  useEffect(() => {
    // Fetch patients data on component mount
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get('https://group3-mapd713.onrender.com/patient/list')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setPatients(response.data.data);
          // Check critical condition for each patient
          response.data.data.forEach((patient) => isCriticalPatient(patient._id));
        } else {
          console.error('Invalid data format - expected an array of patients');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  };

  const filterPatients = () => {
    // Filter patients based on search input
    const filteredPatients = patients.filter((patient) => {
      const patientInfo = patient.firstName.toLowerCase() + ' ' + patient.email.toLowerCase() + ' ' + patient.lastName.toLowerCase();
      return patientInfo.includes(searchText.toLowerCase());
    });
    setSearchResults(filteredPatients);
  };

  const handleSearch = () => {
    filterPatients();
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  // Function to check if a patient is critical
  const isCriticalPatient = (patientId) => {
    const criticalPatientsUrl = 'https://group3-mapd713.onrender.com/api/clinical-tests/critical-patients';

    // Fetch the list of critical patients
    axios.get(criticalPatientsUrl)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          // Check if the current patient is in the list of critical patients
          const isCritical = response.data.data.some((criticalPatient) => criticalPatient.patient._id === patientId);

          // Set the critical condition for the patient
          setPatientCriticalCondition(patientId, isCritical);
        } else {
          console.error('Invalid data format - expected an array of critical patients');
        }
      })
      .catch((error) => {
        console.error('Error fetching critical patients:', error);
      });
  };

  // Function to set the critical condition for a patient
  const setPatientCriticalCondition = (patientId, isCritical) => {
    // Update the state to reflect the critical condition
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient._id === patientId ? { ...patient, isCritical } : patient
      )
    );
  };

  const handleEdit = (patientId) => {
    navigation.navigate('EditPatientDetails', { patientId });
  };

  const handleTestButton = (patientId, firstName, lastName) => {
    navigation.navigate('AddClinicalTest', { patientId, firstName, lastName });
  };

  const handleDelete = (patientId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this patient?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            axios
              .delete(`https://group3-mapd713.onrender.com/patient/delete/${patientId}`)
              .then((response) => {
                console.log('Patient deleted successfully:', response.data);
                // Reload the patients list after deletion
                fetchPatients();
              })
              .catch((error) => {
                console.error('Error deleting patient:', error);
              });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Patients by name or email"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Image source={searchIcon} style={[styles.iconImage, { tintColor: 'black' }]} />
          </TouchableOpacity>
          {searchText.length > 0 && (
            <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
              <Image source={crossIcon} style={[styles.iconImage, { tintColor: 'black' }]} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('AddPatients')}>
          <Image source={addUserIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {(searchResults.length > 0 ? searchResults : patients).map((patient, index) => (
          <View style={[styles.card]} key={index}>
            <View style={styles.cardHead}>
              <Text style={styles.cardName}>{patient.firstName + ' ' + patient.lastName}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoHead}>Phone Number: {patient.phoneNumber}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoHead}>Email: {patient.email}</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={[styles.criticalConditionText]}>
                Condition:
              </Text>
              <Text style={[styles.criticalConditionText, { color: patient.isCritical ? 'red' : 'black' }]}>
                {patient.isCritical ? 'Critical' : 'Normal'}
              </Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.buttonFilled} onPress={() => handleDelete(patient._id)}>
                <Image source={deleteIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFilled} onPress={() => handleEdit(patient._id)}>
                <Image source={editUserIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('Patient Details', { patient })}>
                <Image source={viewDetailsIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonFilled} onPress={() => handleTestButton(patient._id, patient.firstName, patient.lastName)}>
                <Image source={addClinicalTestIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {!searchResults.length && !patientsFound && <Text>No users found</Text>}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  criticalConditionText: {
    fontSize: 16,
    marginTop: 10, // Add spacing on top
    fontStyle: 'italic',
    fontWeight: 'bold',
    // marginBottom: 10, // Add spacing on bottom
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    padding: 5,
  },
  searchButton: {
    padding: 10,
  },
  clearSearchButton: {
    padding: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ED1703',
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHead: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoHead: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardInfoText: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  buttonFilled: {
    backgroundColor: '#ED1703',
    width: 40,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AllPatients;
