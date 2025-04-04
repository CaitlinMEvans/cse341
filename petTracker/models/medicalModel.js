const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  // Which pet this record belongs to
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  
  // Which user owns this record - needed for security
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Date of the medical event
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  
  // Type of visit/treatment
  recordType: {
    type: String,
    required: [true, 'Record type is required'],
    enum: [
      'Checkup',
      'Vaccination',
      'Illness',
      'Injury',
      'Surgery',
      'Medication',
      'Dental',
      'Other'
    ]
  },
  
  // Treating vet or clinic
  provider: {
    name: String,
    phone: String,
    email: String,
    address: String
  },
  
  // Description of what happened/was done
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  
  // Medications prescribed
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    notes: String
  }],
  
  // Cost of treatment
  cost: {
    amount: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  
  // Additional notes
  notes: {
    type: String,
    trim: true
  },
  
  // Timestamps
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
medicalRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
medicalRecordSchema.index({ petId: 1, userId: 1, date: -1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);