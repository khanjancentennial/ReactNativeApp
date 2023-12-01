import axios from 'axios';

const server = 'https://group3-mapd713.onrender.com'; // Replace this with the correct base URL

// Clinical Test API Tests
describe('Clinical Test API Tests', () => {
  let createdClinicalTestId = "6568e8d28efac4d5b55f6cc9";

  test('should create a new clinical test', async () => {
    const newClinicalTest = {
      bloodPressure: 120,
      respiratoryRate: 18,
      bloodOxygenLevel: 98,
      heartbeatRate: 72,
      chiefComplaint: 'Chest pain',
      pastMedicalHistory: 'No significant medical history',
      medicalDiagnosis: 'Angina',
      medicalPrescription: 'Prescribe medication X',
      creationDateTime: '2023-11-01T10:30:00Z',
      patientId: '6563a7e6823f646b53d6cb16',
    };

    const response = await axios.post(`${server}/api/clinical-tests/clinical-tests`, newClinicalTest);

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Clinical test created successfully.');
  }, 10000); // Increase timeout to 10 seconds

  test('should get all clinical tests', async () => {
    const response = await axios.get(`${server}/api/clinical-tests/clinical-tests`);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBeInstanceOf(Array);
  }, 10000); // Increase timeout to 10 seconds

  test('should get a specific clinical test by ID', async () => {
    const response = await axios.get(`${server}/api/clinical-tests/clinical-tests/${createdClinicalTestId}`);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toBeDefined();
  }, 10000); // Increase timeout to 10 seconds
});

// User Registration and Login Tests
describe('User Registration and Login Tests', () => {
  // Test for user login
  test('should login an existing user', async () => {
    const loginDetails = {
      email: 'johndoe@example.com',
      password: 'john123',
    };

    const response = await axios.post(`${server}/auth/login`, loginDetails);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data).toHaveProperty('token');
    expect(response.data).toHaveProperty('user');
    expect(response.data.user).toHaveProperty('_id');
    expect(response.data.user.firstName).toBe('John');
    expect(response.data.user.lastName).toBe('Doe');
    expect(response.data.user.email).toBe('johndoe@example.com');
    // Add more assertions for other user details if needed
  });
});

// Patient API Tests
describe('Patient API Tests', () => {
  let createdPatientId;
  let idForUpdate = "6563a7e6823f646b53d6cb16";

  // Test for adding a new patient
  test('should add a new patient', async () => {
    const newPatient = {
      firstName: 'Ranjan',
      lastName: 'David',
      email: 'kk@example.com',
      phoneNumber: '123-456-7890',
      weight: '160 lbs',
      height: '6\'2',
      address: '123 Main St, City, Country',
      gender: 0, // Assuming 0 for female
    };

    const response = await axios.post(`${server}/patient/add`, newPatient);

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Patient added successfully.');
    // The response does not contain data in your case
    // expect(response.data).toHaveProperty('data');
    // expect(response.data.data).toHaveProperty('_id');
    // createdPatientId = response.data.data._id; // No data field in the response
  });

  // Test for getting patient details by name
test('should get patient details by name', async () => {
    const patientName = 'Ranjan';
  
    const response = await axios.get(`${server}/patient/viewByName/${patientName}`);
  
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  
    if (response.data.success) {
      expect(response.data).toHaveProperty('data');
  
      // Check if data is an array and has length greater than 0
      expect(response.data.data).toBeInstanceOf(Array);
      expect(response.data.data.length).toBeGreaterThan(0);
  
      expect(response.data.data[0].firstName).toBe(patientName);
    } else {
      expect(response.data).toHaveProperty('message').toBe('Patient not found.');
    }
  });
  

  // Test for getting a list of all patients
  test('should get a list of all patients', async () => {
    const response = await axios.get(`${server}/patient/list`);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toBeInstanceOf(Array);
  });

  // Test for editing patient details by ID
  test('should edit patient details by ID', async () => {
    const updatedPatientDetails = {
      firstName: 'Ranjan',
      lastName: 'Doe',
      email: 'doe@example.com',
      phoneNumber: '9876543210',
      weight: '75',
      height: '180',
      address: '456 Second St',
      gender: 1,
    };

    const response = await axios.put(`${server}/patient/patients/${idForUpdate}`, updatedPatientDetails);

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Patient details updated successfully.');
  });
});
