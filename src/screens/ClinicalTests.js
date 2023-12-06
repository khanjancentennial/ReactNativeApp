import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';

// Import your images
import searchIcon from '../../assets/icons/magnifying-glass.png';
import deleteIcon from '../../assets/icons/delete.png';
import editIcon from '../../assets/icons/user-avatar.png';
import eyeIcon from '../../assets/icons/info.png';
import plusIcon from '../../assets/icons/add-event.png';
import cross from '../../assets/icons/close.png';

function ClinicalTests({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [clinicalTests, setClinicalTests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchClinicalTests = async () => {
      try {
        const response = await fetch('https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests');
        const data = await response.json();
        // Sort the clinical tests by creationDateTime in descending order
        const sortedClinicalTests = data.data.sort((a, b) => new Date(b.creationDateTime) - new Date(a.creationDateTime));
        setClinicalTests(sortedClinicalTests);
      } catch (error) {
        console.error('Error fetching clinical tests:', error);
      }
    };

    fetchClinicalTests();
  }, []);

  // Function to sort clinical tests by creationDateTime in descending order
  const sortClinicalTestsByDate = (tests) => {
    return tests.sort((a, b) => new Date(b.creationDateTime) - new Date(a.creationDateTime));
  };

  const handleViewDetails = (clinicalTest) => {
    navigation.navigate('ClinicalTestDetails', { clinicalTestId: clinicalTest._id });
  };

  const handleAddClinicalTest = (patientId, firstName, lastName) => {
    navigation.navigate('AddClinicalTest', { patientId, firstName, lastName });
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
            fetch(`https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests/${clinicalTestId}`, {
              method: 'DELETE',
            })
              .then((response) => {
                if (response.ok) {
                  // Handle the success, you may also want to remove the deleted clinical test from the state
                  console.log('Clinical test deleted successfully');
                  // Reload the clinical tests list after deletion (you can update this part)
                  fetch('https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests')
                    .then((response) => response.json())
                    .then((data) => setClinicalTests(sortClinicalTestsByDate(data.data)))
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
    const filteredResults = sortClinicalTestsByDate(
      clinicalTests.filter((clinicalTest) =>
        `${clinicalTest.patient?.firstName} ${clinicalTest.patient?.lastName}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
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
              <Image source={cross} style={[styles.iconImage, { tintColor: 'black' }]} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Image source={searchIcon} style={[styles.iconImage, { tintColor: 'black' }]} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {(searchResults.length > 0 ? searchResults : sortClinicalTestsByDate(clinicalTests)).map((clinicalTest, index) => (
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
                <Image source={deleteIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFilled}
                onPress={() => navigation.navigate('EditClinicalTest', { clinicalTestId: clinicalTest._id })}
              >
                <Image source={editIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFilled}
                onPress={() => handleViewDetails(clinicalTest)}
              >
                <Image source={eyeIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFilled}
                onPress={() =>
                  handleAddClinicalTest(
                    clinicalTest.patient?._id,
                    clinicalTest.patient?.firstName,
                    clinicalTest.patient?.lastName
                  )
                }
              >
                <Image source={plusIcon} style={[styles.iconImage, { tintColor: 'white' }]} />
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
  iconImage: {
    width: 20,
    height: 20,
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
