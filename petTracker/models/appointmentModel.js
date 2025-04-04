const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // Which pet this appointment is for
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  
  // Who owns this pet/appointment - for security
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // When is the appointment
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  
  // Set a time - separate from date to make queries easier
  time: {
    type: String,
    // Can be null for all-day appointments
  },
  
  // What type of appointment
  appointmentType: {
    type: String,
    required: [true, 'Appointment type is required'],
    enum: [
      'Checkup',
      'Vaccination',
      'Grooming',
      'Surgery',
      'Dental',
      'Training',
      'Boarding',
      'Other'
    ]
  },
  
  // Where the appointment is taking place
  location: {
    name: String,
    address: String,
    phone: String,
    email: String
  },
  
  // Brief description of the appointment
  description: {
    type: String,
    trim: true
  },
  
  // Has this appointment happened yet?
  status: {
    type: String,
    enum: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Missed'],
    default: 'Scheduled'
  },
  
  // Reminders
  reminder: {
    enabled: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number, // Hours before appointment
      default: 24
    }
  },
  
  // Any special notes
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
appointmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Helper method to check if appointment is in the past
appointmentSchema.methods.isPast = function() {
  return new Date(this.date) < new Date();
};

// Helper method to check if appointment is today
appointmentSchema.methods.isToday = function() {
  const today = new Date();
  const apptDate = new Date(this.date);
  
  return apptDate.getDate() === today.getDate() &&
         apptDate.getMonth() === today.getMonth() &&
         apptDate.getFullYear() === today.getFullYear();
};

// Index for efficient queries
appointmentSchema.index({ petId: 1, userId: 1, date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);