const request = require("supertest");
const express = require('express')

const app = express()

// Mock user data
const mockUser = { 
  _id: '68000aa1252ea1aabdaf0727',
  email: 'ramon.altair9@gmail.com' 
};

// Mock pet data
const mockPets = [
  {
    _id: '64d789d6b0323a4a5c8c1001',
    name: 'Fluffy',
    species: 'Cat',
    breed: 'Maine Coon',
    birthDate: '2020-01-15T00:00:00.000Z',
    color: 'Brown Tabby',
    userId: mockUser._id
  },
  {
    _id: '64d789d6b0323a4a5c8c1002',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    birthDate: '2019-05-10T00:00:00.000Z',
    color: 'Golden',
    userId: mockUser._id
  }
];

// Set up mock routes that we want to test
app.get('/api/pets', (req, res) => {
  res.json({
    success: true,
    count: mockPets.length,
    data: mockPets
  });
});


describe("get user pets by user ID", () => {
  it("should respond with a 200 status code", async () => {
    const response = await request(app)
    .get("/api/pets")
    .expect('Content-Type', /json/)
    .expect(200);

     // Check response structure
     expect(response.body.success).toBe(true);
     expect(Array.isArray(response.body.data)).toBe(true);
     expect(response.body.data.length).toBe(2);

     // Verify pet data
    const pets = response.body.data;
    expect(pets[0].name).toBeDefined();
    expect(pets[0].species).toBeDefined();
    expect(pets[0].userId).toBe(mockUser._id);
  });
});

// Tests for GET /api/pets/:id
describe('GET /api/pets/:id', () => {
  it('should return a specific pet by ID', async () => {
    const petId = '64d789d6b0323a4a5c8c1001';
    
    const res = await request(app)
      .get(`/api/pets/${petId}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Check response structure
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data._id).toBe(petId);
    expect(res.body.data.name).toBe('Fluffy');
  });
  
  it('should return 404 for non-existent pet', async () => {
    const nonExistentId = '64d789d6b0323a4a5c8c9999';
    
    const res = await request(app)
      .get(`/api/pets/${nonExistentId}`)
      .expect('Content-Type', /json/)
      .expect(404);
    
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Pet not found');
  });
});