// jest.config.js
module.exports = {
    // Use Node.js as the test environment
    testEnvironment: 'node',
    
    // Look for test files with .test.js extension
    testMatch: ['**/tests/**/*.test.js'],
    
    // Ignore node_modules
    testPathIgnorePatterns: ['/node_modules/'],
    
    // Clear mocks between tests
    clearMocks: true,
    
    // Set test timeout (10 seconds)
    testTimeout: 20000,
    
    // Display detailed information during tests
    verbose: true
  };