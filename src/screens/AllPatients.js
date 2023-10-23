import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function AllPatients({ navigation }) {
  const patients = [
    { name: 'Patient 1', caseNumber: 'Case No: 12345' },
    { name: 'Patient 2', caseNumber: 'Case No: 23456' },
    { name: 'Patient 3', caseNumber: 'Case No: 34567' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageHeading}>Patients</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => { /* Handle the add user action */ }}>
          <Icon name="user-plus" size={17} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {patients.map((patient, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{patient.name}</Text>
              <Text style={styles.cardInfo}>{patient.caseNumber}</Text>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { /* Handle delete user action */ }}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFilled} onPress={() => { /* Handle edit user action */ }}>
                  <Icon name="pencil" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton} onPress={() => { /* Handle view details action */ }}>
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
