import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // Added state for user details

  const handleLogin = () => {
    console.log('Logging in with email:', email, 'and password:', password);

    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    } else {
      setIsLoading(true);

      fetch('https://group3-mapd713.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Invalid email or password. Please try again.');
          }
        })
        .then((data) => {
          if (data.success) {
            setUserDetails(data.user); // Store user details in state
            navigation.navigate('Main', { userId: data.user._id }); // Pass user ID to 'Main' screen
            console.log('Login successful', `User ID: ${data.user._id}`);
          } else {
            Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
          }
        })        
        .catch((error) => {
          if (error instanceof TypeError && error.message === 'Network request failed') {
            Alert.alert('Network Error', 'Please check your internet connection and try again.');
          } else {
            console.error(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      {isLoading ? ( // Display loading indicator if isLoading is true
        <ActivityIndicator size="large" color="#ED1703" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.signupText}>Not an existing user?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupLink}>Register here</Text>
      </TouchableOpacity>
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
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ED1703',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  loginButton: {
    backgroundColor: '#ED1703',
    padding: 10,
    borderRadius: 10,
    width: 300,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  signupText: {
    marginTop: 20,
    color: 'black',
  },
  signupLink: {
    color: '#ED1703',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
