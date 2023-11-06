import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

function AllPatients({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [patients, setPatients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [patientsFound, setPatientsFound] = useState(true); // State to track whether patients are found

  useEffect(() => {
    axios
      .get('http://10.0.2.2:3000/patient/list')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setPatients(response.data.data);
        } else {
          console.error('Invalid data format - expected an array of patients');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  // Function to filter patients based on search input
  const filterPatients = () => {
    const filteredPatients = patients.filter((patient) => {
      // Check if patient's name or email contains the search text
      const patientInfo = patient.firstName + ' ' + patient.email;
      return patientInfo.toLowerCase().includes(searchText.toLowerCase());
    });
    setSearchResults(filteredPatients);
  };

  const handleSearch = () => {
    filterPatients();
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]); // Clear the search results
  };

  const handleEdit = (patientId) => {
    // Navigate to the "EditPatient" screen and pass the patientId as a parameter
    navigation.navigate('EditPatientDetails', { patientId });
  };
  
  const handleDelete = (patientId) => {
    // Show a confirmation dialog before deleting
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
            // Send a DELETE request to your server to delete the patient
            axios
              .delete(`http://10.0.2.2:3000/patient/delete/${patientId}`)
              .then((response) => {
                // Handle the success, you may also want to remove the deleted patient from the state
                console.log('Patient deleted successfully:', response.data);
                // Reload the patients list after deletion (you can update this part)
                axios.get('http://10.0.2.2:3000/patient/list')
                  .then((response) => {
                    if (Array.isArray(response.data.data)) {
                      setPatients(response.data.data);
                    }
                  })
                  .catch((error) => {
                    console.error('Error fetching patients:', error);
                  });
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
            <Icon name="search" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
            <Icon name="times" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPatients')}>
          <Icon name="user-plus" size={17} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {(searchResults.length > 0 ? searchResults : patients).map((patient, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{patient.firstName}</Text>
              <Text style={styles.cardInfo}>Case Number: {patient._id}</Text>
              {/* Display other patient details as needed */}
            </View>
            <View style={styles.cardRight}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => handleDelete(patient._id)}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => handleEdit(patient._id)}>
                  <Icon name="pencil" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton} onPress={() => navigation.navigate('Patient Details')}>
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeft: {
    width: '60%',
    paddingTop: 15,
    paddingBottom: 10,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardName: {
    fontSize: 18,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  cardInfo: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonFilled: {
    backgroundColor: '#ED1703',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  viewDetailsButton: {
    backgroundColor: '#ED1703',
    borderRadius: 10,
    padding: 10,
  },
  viewDetailsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AllPatients;
