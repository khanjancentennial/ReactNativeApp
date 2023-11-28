import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ClinicalTests({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [clinicalTests, setClinicalTests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchClinicalTests = async () => {
      try {
        const response = await fetch('https://group3-mapd713.onrender.com/clinicalTest/clinical-tests');
        const data = await response.json();
        setClinicalTests(data.data);
      } catch (error) {
        console.error('Error fetching clinical tests:', error);
      }
    };

    fetchClinicalTests();
  }, []);

  const handleViewDetails = (clinicalTest) => {
    navigation.navigate('ClinicalTestDetails', { clinicalTestId: clinicalTest._id });
  };

  const handleDelete = (clinicalTestId) => {
    // Show a confirmation dialog before deleting
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this clinical test?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Send a DELETE request to your server to delete the clinical test
            fetch(`https://group3-mapd713.onrender.com/clinicalTest/clinical-tests/${clinicalTestId}`, {
              method: 'DELETE',
            })
              .then((response) => {
                if (response.ok) {
                  // Handle the success, you may also want to remove the deleted clinical test from the state
                  console.log('Clinical test deleted successfully');
                  // Reload the clinical tests list after deletion (you can update this part)
                  fetch('https://group3-mapd713.onrender.com/clinicalTest/clinical-tests')
                    .then((response) => response.json())
                    .then((data) => setClinicalTests(data.data))
                    .catch((error) => console.error('Error fetching clinical tests:', error));
                } else {
                  console.error('Error deleting clinical test:', response.status);
                }
              })
              .catch((error) => {
                console.error('Error deleting clinical test:', error);
              });
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleSearch = () => {
    // Implement your search logic here
    // You can use the 'searchText' state to filter the list of clinical tests
    const filteredResults = clinicalTests.filter((clinicalTest) =>
      `${clinicalTest.patient?.firstName} ${clinicalTest.patient?.lastName}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Clinical Tests"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          {searchText.length > 0 && (
            <TouchableOpacity style={styles.clearSearchButton} onPress={handleClearSearch}>
              <Icon name="times" size={20} color="gray" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {(searchResults.length > 0 ? searchResults : clinicalTests).map((clinicalTest, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardTop}>
              <Text style={styles.cardName}>
                {clinicalTest.patient?.firstName} {clinicalTest.patient?.lastName}
              </Text>
              <Text style={styles.cardDate}>
                {new Date(clinicalTest.creationDateTime).toLocaleString()}
              </Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.buttonFilled} onPress={() => handleDelete(clinicalTest._id)}>
                <Icon name="trash" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFilled}
                onPress={() => navigation.navigate('Edit Clinical Test')}
              >
                <Icon name="pencil" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFilled}
                onPress={() => handleViewDetails(clinicalTest)}
              >
                <Icon name="eye" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFilled}
                onPress={() => navigation.navigate('AddClinicalTest')}
              >
                <Icon name="plus" size={17} color="white" />
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
  clearSearchButton: {
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 18,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  cardTop: {
    marginBottom: 10,
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 16,
    color: 'gray',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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

export default ClinicalTests;
