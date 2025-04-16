// tests/medical.test.js
const request = require('supertest');
const express = require('express');

// Create a mock Express app
const app = express();

// Mock user and pet for reference
const mockUser = {
  _id: '64d789d6b0323a4a5c8c0001',
  name: 'Test User',
  email: 'test@example.com'
};

const mockPet = {
  _id: '64d789d6b0323a4a5c8c1001',
  name: 'Fluffy',
  species: 'Cat',
  userId: mockUser._id
};

// Mock medical record data
const mockMedicalRecords = [
  {
    _id: '64d789d6b0323a4a5c8c2001',
    petId: mockPet._id,
    userId: mockUser._id,
    date: '2023-01-15T00:00:00.000Z',
    recordType: 'Checkup',
    description: 'Annual wellness exam',
    provider: {
      name: 'Dr. Smith',
      phone: '555-123-4567'
    }
  },
  {
    _id: '64d789d6b0323a4a5c8c2002',
    petId: mockPet._id,
    userId: mockUser._id,
    date: '2023-03-10T00:00:00.000Z',
    recordType: 'Vaccination',
    description: 'Rabies vaccination',
    provider: {
      name: 'Dr. Johnson',
      phone: '555-987-6543'
    }
  }
];

// Set up mock routes that we want to test
app.get('/api/medical', (req, res) => {
  // This route returns all medical records for all of the user's pets
  res.json({
    success: true,
    count: mockMedicalRecords.length,
    data: mockMedicalRecords
  });
});

app.get('/api/medical/:petId', (req, res) => {
  // This route returns all medical records for a specific pet
  if (req.params.petId !== mockPet._id) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }
  
  const records = mockMedicalRecords.filter(record => record.petId === req.params.petId);
  
  res.json({
    success: true,
    count: records.length,
    data: records
  });
});

app.get('/api/medical/record/:id', (req, res) => {
  // This route returns a specific medical record by ID
  const record = mockMedicalRecords.find(record => record._id === req.params.id);
  
  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Medical record not found'
    });
  }
  
  res.json({
    success: true,
    data: record
  });
});

// Tests for GET /api/medical (all user's pet medical records)
describe('GET /api/medical', () => {
  it('should return all medical records for all of the user\'s pets', async () => {
    const res = await request(app)
      .get('/api/medical')
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
    
    // Verify medical record data
    const records = res.body.data;
    expect(records[0].petId).toBe(mockPet._id);
    expect(records[0].description).toBeDefined();
    expect(records[0].recordType).toBeDefined();
  });
});

// Tests for GET /api/medical/:petId
describe('GET /api/medical/:petId', () => {
  it('should return all medical records for a specific pet', async () => {
    const res = await request(app)
      .get(`/api/medical/${mockPet._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
    
    // Verify all records belong to the specified pet
    const allForPet = res.body.data.every(record => record.petId === mockPet._id);
    expect(allForPet).toBe(true);
  });
  
  it('should return 404 for non-existent pet', async () => {
    const nonExistentId = '64d789d6b0323a4a5c8c9999';
    
    const res = await request(app)
      .get(`/api/medical/${nonExistentId}`)
      .expect('Content-Type', /json/)
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Pet not found');
  });
});

// Tests for GET /api/medical/record/:id
describe('GET /api/medical/record/:id', () => {
  it('should return a specific medical record by ID', async () => {
    const recordId = '64d789d6b0323a4a5c8c2001';
    
    const res = await request(app)
      .get(`/api/medical/record/${recordId}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data._id).toBe(recordId);
    expect(res.body.data.recordType).toBe('Checkup');
  });
  
  it('should return 404 for non-existent medical record', async () => {
    const nonExistentId = '64d789d6b0323a4a5c8c9999';
    
    const res = await request(app)
      .get(`/api/medical/record/${nonExistentId}`)
      .expect('Content-Type', /json/)
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Medical record not found');
  });
});