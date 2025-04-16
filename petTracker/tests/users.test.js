// tests/users.test.js
const request = require('supertest');
const express = require('express');

// Create a mock Express app
const app = express();

// Mock user data
const mockUsers = [
  {
    _id: '64d789d6b0323a4a5c8c0001',
    googleId: '123456789',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user'
  },
  {
    _id: '64d789d6b0323a4a5c8c0002',
    googleId: '987654321',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'superuser'
  }
];

// Set up mock routes that we want to test
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    count: mockUsers.length,
    data: mockUsers
  });
});

app.get('/api/users/:id', (req, res) => {
  const user = mockUsers.find(user => user._id === req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// Tests for GET /api/users
describe('GET /api/users', () => {
  it('should return all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });
});

// Tests for GET /api/users/:id
describe('GET /api/users/:id', () => {
  it('should return a specific user by ID', async () => {
    const userId = '64d789d6b0323a4a5c8c0001';
    
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(userId);
  });
  
  it('should return 404 for non-existent user', async () => {
    const nonExistentId = '64d789d6b0323a4a5c8c9999';
    
    const res = await request(app)
      .get(`/api/users/${nonExistentId}`)
      .expect('Content-Type', /json/)
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('User not found');
  });
});