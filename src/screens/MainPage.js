import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardButton from '../components/CardButton';

function MainPage({ navigation, route }) {
  const { userId } = route.params;
  console.log('userId', userId);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    
  }, [userId]);
  

  const handleCardClick = (destination) => {
    navigation.navigate(destination, { userId });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>Hello {userName}</Text>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <Icon name="user" size={24} color="black" />
          {isDropdownOpen && (
            <View style={styles.dropdownContent}>
              <TouchableOpacity
  style={styles.dropdownItem}
  onPress={() => {
    // Check if userId has a value before navigating
    if (userId) {
      navigation.navigate('EditUserProfile', { userId });
      console.log('main', userId);
    } else {
      // Handle the case where userId is not available
      console.error('userId is not available');
    }
  }}
>
  <Text>Profile</Text>
</TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
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
      <CardButton
        style={styles.card}
        imageSource={require('../../assets/addTest.jpg')}
        title="Clinical Tests"
        onPress={() => handleCardClick('ClinicalTests')}
      />
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
