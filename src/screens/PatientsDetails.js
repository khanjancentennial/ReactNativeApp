import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';  // Import Image from react-native
import editIcon from '../../assets/icons/user-avatar.png';
import deleteIcon from '../../assets/icons/delete.png';
import axios from 'axios';

function PatientsDetailsScreen({ navigation, route }) {
  // Get the patient's information from the route parameter
  const { patient, setPatients } = route.params;

  // Define a function to display gender as 'Male' or 'Female'
  const getGenderText = (gender) => {
    return gender === 0 ? 'Male' : gender === 1 ? 'Female' : 'Unknown';
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
                axios
                  .get('https://group3-mapd713.onrender.com/patient/list')
                  .then((response) => {
                    if (Array.isArray(response.data.data)) {
                      // Check critical condition for each patient
                      response.data.data.forEach((patient) =>
                        isCriticalPatient(patient._id)
                      );
  
                      // Pass the updated patients list back to the previous screen
                      navigation.goBack({ patients: response.data.data });
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
  

  const handleEdit = (patientId) => {
    navigation.navigate('EditPatientDetails', { patientId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nameLabel}>{patient.firstName} {patient.lastName}</Text>

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
        <Text style={styles.detailInfo}>{getGenderText(patient.gender)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Phone Number:</Text>
        <Text style={styles.detailInfo}>{patient.phoneNumber}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Email Id:</Text>
        <Text style={styles.detailInfo}>{patient.email}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Address:</Text>
        <Text style={styles.detailInfo}>{patient.address}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.buttonFilled}
          onPress={() => handleEdit(patient._id)}
        >
          <Image source={editIcon} style={styles.iconImage} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
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
    marginTop: 20,
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
