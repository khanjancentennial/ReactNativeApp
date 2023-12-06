import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import CardButton from '../components/CardButton';

function MainPage({ navigation, route }) {
  const { userId } = route.params;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [healthcareProviderRole, setHealthcareProviderRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://group3-mapd713.onrender.com/auth/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        const { firstName, lastName, healthcareProvider } = data;

        setUserName(`${firstName} ${lastName}`);
        setHealthcareProviderRole(healthcareProvider);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserName('User');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleCardClick = (destination) => {
    navigation.navigate(destination, { userId });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            Alert.alert('Logout', 'Logged out successfully');
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Hello, {userName}</Text>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Image source={require('../../assets/icons/profile-user.png')} style={styles.profileImage} />
          {isDropdownOpen && (
            <View style={styles.dropdownContent}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  if (userId) {
                    navigation.navigate('EditUserProfile', { userId });
                    console.log('main', userId);
                  } else {
                    console.error('userId is not available');
                  }
                }}
              >
                <Text>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <CardButton
        style={styles.card}
        imageSource={require('../../assets/allPatients.jpg')}
        title="All Patients"
        onPress={() => handleCardClick('AllPatients')}
      />
      <CardButton
        style={styles.card}
        imageSource={require('../../assets/critical.jpg')}
        title="Critical Patients"
        onPress={() => handleCardClick('CriticalPatients')}
      />

      {healthcareProviderRole === 0 && (
        // Only show the "Clinical Tests" card if the healthcare provider is a doctor (role === 0)
        <CardButton
          style={styles.card}
          imageSource={require('../../assets/addTest.jpg')}
          title="Clinical Tests"
          onPress={() => handleCardClick('ClinicalTests')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFE1E1',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    zIndex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  dropdownContent: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 30,
    right: 0,
    width: 100,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    height: 900,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainPage;
