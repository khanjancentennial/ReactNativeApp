import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function PatientsDetailsScreen({ navigation, route }) {
  // Get the patient's information from the route parameter
  const { patient } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.nameLabel}>{patient.firstName}</Text>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Case Number:</Text>
        <Text style={styles.detailInfo}>{patient._id}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Height:</Text>
        <Text style={styles.detailInfo}>{patient.height}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Weight:</Text>
        <Text style={styles.detailInfo}>{patient.weight}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Gender:</Text>
        <Text style={styles.detailInfo}>{patient.gender}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Phone Number:</Text>
        <Text style={styles.detailInfo}>{patient.phoneNumber}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>email Id:</Text>
        <Text style={styles.detailInfo}>{patient.email}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Address:</Text>
        <Text style={styles.detailInfo}>{patient.address}</Text>
      </View>
      
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.buttonFilled}
          onPress={() => navigation.navigate('EditPatientDetails', { patient })}
        >
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonFilled}
          onPress={() => { /* Handle delete user action */ }}
        >
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
    paddingTop: 20  
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginTop: 20
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '40%',
  },
  nameLabel: {
    fontSize: 24,
    fontWeight: 'bold',  
  },
  detailInfo: {
    fontSize: 16,
    width: '50%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
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
});

export default PatientsDetailsScreen;
