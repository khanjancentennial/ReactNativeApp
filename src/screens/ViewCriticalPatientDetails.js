import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ViewCriticalPatientDetails({ route }) {
  const {
    clinicalTest: {
      patientInfo: {
        firstName,
        lastName,
        email, // Add any other properties you want to display
      },
      caseNumber,
      bloodPressure,
      respiratoryRate,
      bloodOxygenLevel,
      heartbeatRate,
      gender,
      chiefComplaint,
      pastMedicalHistory,
      medicalDiagnosis,
      medicalPrescription,
    },
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Patient's Name:</Text>
          <Text style={styles.detailInfo}>{`${firstName} ${lastName}`}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailInfo}>{email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Case Number:</Text>
          <Text style={styles.detailInfo}>{caseNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Pressure:</Text>
          <Text style={styles.detailInfo}>{bloodPressure}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Respiratory Rate:</Text>
          <Text style={styles.detailInfo}>{respiratoryRate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Oxygen Level:</Text>
          <Text style={styles.detailInfo}>{bloodOxygenLevel}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Heart Rate:</Text>
          <Text style={styles.detailInfo}>{heartbeatRate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailInfo}>{gender === 0 ? 'Male' : 'Female'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Chief Complaint:</Text>
          <Text style={styles.detailInfo}>{chiefComplaint}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Past Medical History:</Text>
          <Text style={styles.detailInfo}>{pastMedicalHistory}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Medical Diagnosis:</Text>
          <Text style={styles.detailInfo}>{medicalDiagnosis}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Medical Prescription:</Text>
          <Text style={styles.detailInfo}>{medicalPrescription}</Text>
        </View>
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
});

export default ViewCriticalPatientDetails;
