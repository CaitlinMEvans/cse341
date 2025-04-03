const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  // Basic pet info
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  
  // Type of animal
  species: {
    type: String,
    required: [true, 'Species is required'],
    trim: true
  },
  
  // Specific breed
  breed: {
    type: String,
    default: 'Mixed/Unknown',
    trim: true
  },
  
  // Birth date
  birthDate: {
    type: Date
  },
  
  // Color/markings
  color: {
    type: String,
    trim: true
  },
  
  // Weight tracking
  weight: {
    amount: {
      type: Number,
      min: [0, 'Weight cannot be negative']
    },
    unit: {
      type: String,
      enum: ['lb', 'kg', 'g', 'oz'],
      default: 'lb'
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  
  // For lost pets or identification
  microchipNumber: {
    type: String,
    trim: true
  },
  
  // Who owns this pet - SUPER IMPORTANT FOR SECURITY
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Optional profile picture URL
  photoUrl: {
    type: String,
    validate: {
      validator: function(v) {
        // Basic URL validation - can be enhanced
        return !v || /^https?:\/\//.test(v);
      },
      message: props => `${props.value} is not a valid URL`
    }
  },
  
  // Special notes/comments
  notes: {
    type: String,
    trim: true
  },
  
  // Record keeping
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
petSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Helper method to format weight for display
petSchema.methods.formattedWeight = function() {
  if (!this.weight || !this.weight.amount) return 'Unknown';
  return `${this.weight.amount} ${this.weight.unit}`;
};

// Helper method to calculate age
petSchema.methods.getAge = function() {
  if (!this.birthDate) return 'Unknown';
  
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  
  // Adjust age if birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return `${age} years`;
};

module.exports = mongoose.model('Pet', petSchema);