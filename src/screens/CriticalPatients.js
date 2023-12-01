import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CriticalPatients({ navigation }) {
  const [searchText, setSearchText] = useState(''); // State to store the search text
  const [criticalPatients, setCriticalPatients] = useState([]);

  useEffect(() => {
    const fetchCriticalPatients = async () => {
      try {
        const response = await fetch('https://group3-mapd713.onrender.com/api/clinical-tests/critical-patients');
        const data = await response.json();
        setCriticalPatients(data.data);
      } catch (error) {
        console.error('Error fetching critical patients:', error);
      }
    };

    fetchCriticalPatients();
  }, []);

  const handleSearch = () => {
    // Implement your search logic here
    // You can use the 'searchText' state to filter the list of critical patients
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Critical Patients by name or email"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {criticalPatients.map((clinicalTest, index) => (
          <View style={styles.card} key={index}>
            <Text style={styles.cardName}>{clinicalTest.patientInfo.firstName} {clinicalTest.patientInfo.lastName}</Text>
            <Text style={styles.cardInfo}>{`Mail ID: ${clinicalTest.patientInfo.email}`}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
  style={styles.viewDetailsButton}
  onPress={() => {
    console.log('Selected Patient:', clinicalTest); // Log the selected patient details
    navigation.navigate('ViewCriticalPatientDetails', { clinicalTest });
  }}
>
  <Text style={styles.viewDetailsButtonText}>View Details</Text>
</TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10, // Spacing between name and email
  },
  cardInfo: {
    fontSize: 16,
    marginBottom: 10, // Spacing between email and button
  },
  buttonContainer: {
    width: '100%', // Make the button take the full width of the card
  },
  viewDetailsButton: {
    backgroundColor: '#ED1703',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CriticalPatients;
