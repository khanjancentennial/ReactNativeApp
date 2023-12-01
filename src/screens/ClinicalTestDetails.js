import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ClinicalTestDetails({ navigation, route }) {
  const { clinicalTestId } = route.params;
  const [clinicalTest, setClinicalTest] = useState(null);

  useEffect(() => {
    const fetchClinicalTestDetails = async () => {
      try {
        const response = await fetch(`https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests`);
        const data = await response.json();
        const test = data.data.find(test => test._id === clinicalTestId);

        if (test) {
          setClinicalTest(test);
        } else {
          console.error('Clinical test not found');
        }
      } catch (error) {
        console.error('Error fetching clinical test details:', error);
      }
    };

    fetchClinicalTestDetails();
  }, [clinicalTestId]);

  const handleEdit = () => {
    navigation.navigate('EditClinicalTest', { clinicalTestId });
  };

  const handleDelete = () => {
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
            fetch(`https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests/${clinicalTestId}`, {
              method: 'DELETE',
            })
              .then((response) => {
                if (response.ok) {
                  console.log('Clinical test deleted successfully');
                  navigation.goBack();
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

  if (!clinicalTest) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { patient, _id, __v, creationDateTime, ...testDetails } = clinicalTest;

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        {renderDetailRow('Patient\'s Name:', `${patient.firstName} ${patient.lastName}`)}
        {Object.entries(testDetails).map(([label, value]) => renderDetailRow(getCustomLabel(label), value))}
        {renderDateTimeRow('Test Date:', creationDateTime)}

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonFilled} onPress={handleEdit}>
            <Icon name="edit" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFilled} onPress={handleDelete}>
            <Icon name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Function to map the original labels to hardcoded labels
const getCustomLabel = (label) => {
  const labelMap = {
    bloodPressure: 'Blood Pressure',
    respiratoryRate: 'Respiratory Rate',
    bloodOxygenLevel: 'Blood Oxygen Level',
    heartbeatRate: 'Heart Rate',
    chiefComplaint: 'Chief Complaint',
    pastMedicalHistory: 'Past Medical History',
    medicalDiagnosis: 'Medical Diagnosis',
    medicalPrescription: 'Medical Prescription',
    creationDateTime: 'Test Date',
  };

  return labelMap[label] || label;
};

const renderDetailRow = (label, value) => {
  // Exclude specific fields from rendering
  const excludeFields = ['_id', '__v'];
  if (excludeFields.includes(label)) {
    return null;
  }

  return (
    <View style={styles.detailRow} key={label}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailInfo}>{value}</Text>
    </View>
  );
};

const renderDateTimeRow = (label, dateTime) => {
  const formattedDate = new Date(dateTime).toLocaleDateString();
  const formattedTime = new Date(dateTime).toLocaleTimeString();

  return (
    <>
      <View style={styles.detailRow} key={label}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailInfo}>{formattedDate}</Text>
      </View>
      <View style={styles.detailRow} key="Test Time:">
        <Text style={styles.detailLabel}>Test Time:</Text>
        <Text style={styles.detailInfo}>{formattedTime}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
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
  sectionHeading: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    width: '80%',
  },
  sectionHeadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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
});

export default ClinicalTestDetails;
