import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import RadioButtonGroup from './../components/RadioButtonGroup';

function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); // Will store 'Male' or 'Female'
  const [healthcareProvider, setHealthcareProvider] = useState(''); // Will store 'Doctor' or 'Nurse'

  const genders = ['Male', 'Female'];
  const healthcareProviders = ['Doctor', 'Nurse'];

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Registering with the following information:');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Gender:', gender);
    console.log('Healthcare Provider:', healthcareProvider);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Gender</Text>
        <RadioButtonGroup
          options={genders}
          selectedOption={gender}
          onOptionSelect={setGender}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Healthcare Provider Type</Text>
        <RadioButtonGroup
          options={healthcareProviders}
          selectedOption={healthcareProvider}
          onOptionSelect={setHealthcareProvider}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Login here</Text>
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
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'center', // Center the labels
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
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
  loginText: {
    marginTop: 20,
    color: 'black',
  },
  loginLink: {
    color: '#ED1703',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
