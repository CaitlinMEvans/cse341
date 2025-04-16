// tests/appointments.test.js
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

// Mock appointment data
const mockAppointments = [
  {
    _id: '64d789d6b0323a4a5c8c3001',
    petId: mockPet._id,
    userId: mockUser._id,
    date: '2023-06-15T00:00:00.000Z',
    time: '14:30',
    appointmentType: 'Checkup',
    status: 'Scheduled',
    location: {
      name: 'Pet Clinic',
      phone: '555-123-4567'
    },
    description: 'Annual wellness exam'
  },
  {
    _id: '64d789d6b0323a4a5c8c3002',
    petId: mockPet._id,
    userId: mockUser._id,
    date: '2023-07-20T00:00:00.000Z',
    time: '10:00',
    appointmentType: 'Grooming',
    status: 'Scheduled',
    location: {
      name: 'Pet Grooming Palace',
      phone: '555-987-6543'
    },
    description: 'Summer fur trim'
  }
];

// Set up mock routes that we want to test
app.get('/api/appointments', (req, res) => {
  // This route returns all appointments for all of the user's pets
  let appointments = [...mockAppointments];
  
  // Filter by status if provided
  if (req.query.status) {
    appointments = appointments.filter(appt => appt.status === req.query.status);
  }
  
  res.json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

app.get('/api/appointments/:petId', (req, res) => {
  // This route returns all appointments for a specific pet
  if (req.params.petId !== mockPet._id) {
    return res.status(404).json({
      success: false,
      message: 'Pet not found'
    });
  }
  
  let appointments = mockAppointments.filter(appt => appt.petId === req.params.petId);
  
  // Filter by status if provided
  if (req.query.status) {
    appointments = appointments.filter(appt => appt.status === req.query.status);
  }
  
  res.json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

app.get('/api/appointments/appointment/:id', (req, res) => {
  // This route returns a specific appointment by ID
  const appointment = mockAppointments.find(appt => appt._id === req.params.id);
  
  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }
  
  res.json({
    success: true,
    data: appointment
  });
});

// Tests for GET /api/appointments (all user's pet appointments)
describe('GET /api/appointments', () => {
  it('should return all appointments for all of the user\'s pets', async () => {
    const res = await request(app)
      .get('/api/appointments')
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
    
    // Verify appointment data
    const appointments = res.body.data;
    expect(appointments[0].petId).toBe(mockPet._id);
    expect(appointments[0].appointmentType).toBeDefined();
    expect(appointments[0].status).toBeDefined();
  });
  
  it('should filter appointments by status if specified', async () => {
    const res = await request(app)
      .get('/api/appointments?status=Scheduled')
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Should return appointments with 'Scheduled' status
    expect(res.body.data.length).toBe(2);
    expect(res.body.data.every(appt => appt.status === 'Scheduled')).toBe(true);
  });
});

// Tests for GET /api/appointments/:petId
describe('GET /api/appointments/:petId', () => {
  it('should return all appointments for a specific pet', async () => {
    const res = await request(app)
      .get(`/api/appointments/${mockPet._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBe(res.body.data.length);
    
    // Verify all appointments belong to the specified pet
    const allForPet = res.body.data.every(appt => appt.petId === mockPet._id);
    expect(allForPet).toBe(true);
  });
  
  it('should return 404 for non-existent pet', async () => {
    const nonExistentId = '64d789d6b0323a4a5c8c9999';
    
    const res = await request(app)
      .get(`/api/appointments/${nonExistentId}`)
      .expect('Content-Type', /json/)
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Pet not found');
  });
});

// Tests for GET /api/appointments/appointment/:id
describe('GET /api/appointments/appointment/:id', () => {
  it('should return a specific appointment by ID', async () => {
    const appointmentId = '64d789d6b0323a4a5c8c3001';
    
    const res = await request(app)
      .get(`/api/appointments/appointment/${appointmentId}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data._id).toBe(appointmentId);
    expect(res.body.data.appointmentType).toBe('Checkup');
  });
  
  it('should return 404 for non-existent appointment', async () => {
    const nonExistentId = '64d789d6b0323a4a5c8c9999';
    
    const res = await request(app)
      .get(`/api/appointments/appointment/${nonExistentId}`)
      .expect('Content-Type', /json/)
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Appointment not found');
  });
});