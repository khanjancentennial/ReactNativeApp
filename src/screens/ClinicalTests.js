import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ClinicalTests({ navigation }) {
  const patients = [
    { name: 'Patient 1', caseNumber: 'Case No: 12345', testDate: 'Last Test: 12/12/2020' },
    { name: 'Patient 2', caseNumber: 'Case No: 23456', testDate: 'Last Test: 12/12/2020' },
    { name: 'Patient 3', caseNumber: 'Case No: 34567', testDate: 'Last Test: 12/12/2020' },
  ];

  // Handle the "eye" button press to navigate to Clinical Test Details
  const handleViewDetails = (patient) => {
    navigation.navigate('ClinicalTestDetails', {
      name: patient.name,
      caseNumber: patient.caseNumber,
      testDate: patient.testDate,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.pageHeading}>Clinical Tests</Text> */}
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {patients.map((patient, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{patient.name}</Text>
              <Text style={styles.cardInfo}>{patient.caseNumber}</Text>
              <Text style={styles.cardInfo}>{patient.testDate}</Text>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { /* Handle delete user action */ }}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { navigation.navigate('Edit Clinical Test') }}>
                  <Icon name="pencil" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { handleViewDetails(patient)/* Handle view details*/ }}>
                  <Icon name="eye" size={17} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { navigation.navigate('Add Clinical Test') }}>
                  <Icon name="plus" size={17} color="white" />
                </TouchableOpacity>
              </View>
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
  pageHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ED1703',
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
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  cardInfo: {
    fontSize: 16,
    paddingTop: 5,
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

export default ClinicalTests;
