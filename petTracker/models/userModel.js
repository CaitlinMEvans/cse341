const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Using Google OAuth so we need their ID
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  
  // User's email
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // User's display name
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  // Role for access control
  // 'user' can only see their own pets
  // 'superuser' can see everything
  role: {
    type: String,
    enum: ['user', 'superuser'],
    default: 'user'
  },
  
  // When the account was created
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Last login time
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Update lastLogin time
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = Date.now();
  return this.save();
};

// Method to check if user is a superuser
userSchema.methods.isSuperUser = function() {
  return this.role === 'superuser';
};

module.exports = mongoose.model('User', userSchema);