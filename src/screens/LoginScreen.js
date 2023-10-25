import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Logging in with email:', email, 'and password:', password);
  
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    } else {
      fetch('http://10.0.2.2:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Parse the response JSON
          } else {
            throw new Error('Login failed');
          }
        })
        .then((data) => {
          if (data.success) {
            // Handle a successful login response
            console.log('Login successful!');
            navigation.navigate('Main'); // Redirect to the Home screen
          } else {
            // Handle authentication error (data.success is false)
            Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
          }
        })
        .catch((error) => {
          if (error instanceof TypeError && error.message === 'Network request failed') {
            Alert.alert('Network Error', 'Please check your internet connection and try again.');
          } else {
            console.error('Server Error:', error); // Log the detailed server error
            Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
          }
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
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
    width: 300, // Reduced the width to accommodate the icon
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
