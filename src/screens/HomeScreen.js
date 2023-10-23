import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FontAwesome name="user-md" size={170} color="#ED1703" />
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
