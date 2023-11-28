import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function UserProfileScreen({ route, navigation }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const patientId = route.params?.patientId;

        if (!patientId) {
          throw new Error('Patient ID not provided');
        }

        const response = await fetch(`https://group3-mapd713.onrender.com/auth/users/${patientId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found');
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }

        const data = await response.json();
        setUserDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
        setIsLoading(false);
        // Handle error (set error state or display error message)
      }
    };

    fetchUserDetails();
  }, [route.params?.patientId]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ED1703" />
      ) : (
        <>
          <Text style={styles.nameLabel}>{`${userDetails.firstName} ${userDetails.lastName}`}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender:</Text>
            <Text style={styles.detailInfo}>{userDetails.gender === 0 ? 'Male' : 'Female'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone Number:</Text>
            <Text style={styles.detailInfo}>{userDetails.phoneNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailInfo}>{userDetails.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Profession:</Text>
            <Text style={styles.detailInfo}>{userDetails.profession}</Text>
          </View>
          {/* Add other details */}
        </>
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonFilled} onPress={() => navigation.navigate('Edit User Profile')}>
          <Icon name="edit" size={20} color="white" />
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
    paddingTop: 20,
  },
  nameLabel: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default UserProfileScreen;
