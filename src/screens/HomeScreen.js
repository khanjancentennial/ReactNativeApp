import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Replace FontAwesome with Image */}
      <Image source={require('../../assets/icons/consulting.png')} style={styles.image} />
      <Text style={styles.appName}>KB Clinic</Text>
      <Text style={styles.slogan}>We care for you</Text>
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
  // Style for the image
  image: {
    width: 170, // Set the width as needed
    height: 170, // Set the height as needed
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ED1703',
  },
  slogan: {
    fontSize: 30,
    color: '#ED1703',
  },
});

export default SplashScreen;
