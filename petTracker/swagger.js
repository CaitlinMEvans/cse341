const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

// Define output file and endpoint files
const outputFile = path.join(__dirname, 'swagger.json');
const endpointsFiles = [
  path.join(__dirname, 'routes/authRoutes.js'),
  path.join(__dirname, 'routes/petRoutes.js'),
  path.join(__dirname, 'routes/medicalRoutes.js'),
  path.join(__dirname, 'routes/appointmentRoutes.js')
];

// Define Swagger doc info
const doc = {
  info: {
    title: 'Pet Tracker API',
    description: 'API for tracking pet information, medical records, and appointments',
    version: '1.0.0',
    contact: {
      name: 'Pet Tracker Team'
    }
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local Development Server'
    },
    {
      url: 'https://cse341-6wo0.onrender.com',
      description: 'Production Server'
    }
  ],
  tags: [
    {
      name: 'Pets',
      description: 'Pet management endpoints'
    },
    {
      name: 'Medical Records',
      description: 'Pet medical record endpoints'
    },
    {
      name: 'Appointments',
      description: 'Pet appointment endpoints'
    },
    {
      name: 'Authentication',
      description: 'Authentication endpoints'
    }
  ],
  securityDefinitions: {
    oAuth2: {
      type: 'oauth2',
      description: 'Google OAuth 2.0',
      flow: 'implicit',
      authorizationUrl: '/auth/google',
      scopes: {}
    }
  },
  definitions: {
    Pet: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439011'
        },
        name: {
          type: 'string',
          example: 'Fluffy'
        },
        species: {
          type: 'string',
          example: 'Cat'
        },
        breed: {
          type: 'string',
          example: 'Maine Coon'
        },
        birthDate: {
          type: 'string',
          format: 'date-time',
          example: '2020-01-15T00:00:00.000Z'
        },
        color: {
          type: 'string',
          example: 'Brown Tabby'
        },
        weight: {
          type: 'object',
          properties: {
            amount: {
              type: 'number',
              example: 12.5
            },
            unit: {
              type: 'string',
              example: 'lb'
            },
            lastUpdated: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-05T00:00:00.000Z'
            }
          }
        },
        microchipNumber: {
          type: 'string',
          example: '985112345678909'
        },
        userId: {
          type: 'string',
          example: '507f1f77bcf86cd799439022'
        },
        photoUrl: {
          type: 'string',
          example: 'https://example.com/photos/fluffy.jpg'
        },
        notes: {
          type: 'string',
          example: 'Fluffy is very shy with strangers.'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-01T00:00:00.000Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-05T00:00:00.000Z'
        }
      }
    },
    PetInput: {
      type: 'object',
      required: ['name', 'species'],
      properties: {
        name: {
          type: 'string',
          example: 'Fluffy'
        },
        species: {
          type: 'string',
          example: 'Cat'
        },
        breed: {
          type: 'string',
          example: 'Maine Coon'
        },
        birthDate: {
          type: 'string',
          format: 'date-time',
          example: '2020-01-15T00:00:00.000Z'
        },
        color: {
          type: 'string',
          example: 'Brown Tabby'
        },
        weight: {
          type: 'object',
          properties: {
            amount: {
              type: 'number',
              example: 12.5
            },
            unit: {
              type: 'string',
              enum: ['lb', 'kg', 'g', 'oz'],
              example: 'lb'
            }
          }
        },
        microchipNumber: {
          type: 'string',
          example: '985112345678909'
        },
        photoUrl: {
          type: 'string',
          example: 'https://example.com/photos/fluffy.jpg'
        },
        notes: {
          type: 'string',
          example: 'Fluffy is very shy with strangers.'
        }
      }
    },
    MedicalRecord: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439033'
        },
        petId: {
          type: 'string',
          example: '507f1f77bcf86cd799439011'
        },
        userId: {
          type: 'string',
          example: '507f1f77bcf86cd799439022'
        },
        date: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-15T00:00:00.000Z'
        },
        recordType: {
          type: 'string',
          enum: ['Checkup', 'Vaccination', 'Illness', 'Injury', 'Surgery', 'Medication', 'Dental', 'Other'],
          example: 'Checkup'
        },
        provider: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Dr. Smith'
            },
            phone: {
              type: 'string',
              example: '555-123-4567'
            },
            email: {
              type: 'string',
              example: 'drsmith@example.com'
            },
            address: {
              type: 'string',
              example: '123 Vet St, City, State 12345'
            }
          }
        },
        description: {
          type: 'string',
          example: 'Annual wellness checkup. All looks good.'
        },
        medications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Amoxicillin'
              },
              dosage: {
                type: 'string',
                example: '50mg'
              },
              frequency: {
                type: 'string',
                example: 'Twice daily'
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                example: '2025-01-15T00:00:00.000Z'
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                example: '2025-01-25T00:00:00.000Z'
              },
              notes: {
                type: 'string',
                example: 'Give with food.'
              }
            }
          }
        },
        cost: {
          type: 'object',
          properties: {
            amount: {
              type: 'number',
              example: 150
            },
            currency: {
              type: 'string',
              example: 'USD'
            }
          }
        },
        notes: {
          type: 'string',
          example: 'Pet was anxious during exam.'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-15T00:00:00.000Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-15T00:00:00.000Z'
        }
      }
    },
    MedicalRecordInput: {
      type: 'object',
      required: ['date', 'recordType', 'description'],
      properties: {
        date: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-15T00:00:00.000Z'
        },
        recordType: {
          type: 'string',
          enum: ['Checkup', 'Vaccination', 'Illness', 'Injury', 'Surgery', 'Medication', 'Dental', 'Other'],
          example: 'Checkup'
        },
        provider: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Dr. Smith'
            },
            phone: {
              type: 'string',
              example: '555-123-4567'
            },
            email: {
              type: 'string',
              example: 'drsmith@example.com'
            },
            address: {
              type: 'string',
              example: '123 Vet St, City, State 12345'
            }
          }
        },
        description: {
          type: 'string',
          example: 'Annual wellness checkup. All looks good.'
        },
        medications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Amoxicillin'
              },
              dosage: {
                type: 'string',
                example: '50mg'
              },
              frequency: {
                type: 'string',
                example: 'Twice daily'
              },
              startDate: {
                type: 'string',
                format: 'date-time',
                example: '2025-01-15T00:00:00.000Z'
              },
              endDate: {
                type: 'string',
                format: 'date-time',
                example: '2025-01-25T00:00:00.000Z'
              },
              notes: {
                type: 'string',
                example: 'Give with food.'
              }
            }
          }
        },
        cost: {
          type: 'object',
          properties: {
            amount: {
              type: 'number',
              example: 150
            },
            currency: {
              type: 'string',
              example: 'USD'
            }
          }
        },
        notes: {
          type: 'string',
          example: 'Pet was anxious during exam.'
        }
      }
    },
    Appointment: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439044'
        },
        petId: {
          type: 'string',
          example: '507f1f77bcf86cd799439011'
        },
        userId: {
          type: 'string',
          example: '507f1f77bcf86cd799439022'
        },
        date: {
          type: 'string',
          format: 'date-time',
          example: '2025-02-15T00:00:00.000Z'
        },
        time: {
          type: 'string',
          example: '14:30'
        },
        appointmentType: {
          type: 'string',
          enum: ['Checkup', 'Vaccination', 'Grooming', 'Surgery', 'Dental', 'Training', 'Boarding', 'Other'],
          example: 'Checkup'
        },
        location: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'City Vet Clinic'
            },
            address: {
              type: 'string',
              example: '456 Clinic Ave, City, State 12345'
            },
            phone: {
              type: 'string',
              example: '555-987-6543'
            },
            email: {
              type: 'string',
              example: 'appointments@cityvet.com'
            }
          }
        },
        description: {
          type: 'string',
          example: 'Annual wellness exam and vaccines'
        },
        status: {
          type: 'string',
          enum: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Missed'],
          example: 'Scheduled'
        },
        reminder: {
          type: 'object',
          properties: {
            enabled: {
              type: 'boolean',
              example: true
            },
            time: {
              type: 'number',
              example: 24
            }
          }
        },
        notes: {
          type: 'string',
          example: 'Bring previous vaccination records.'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-20T00:00:00.000Z'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          example: '2025-01-20T00:00:00.000Z'
        }
      }
    },
    AppointmentInput: {
      type: 'object',
      required: ['date', 'appointmentType'],
      properties: {
        date: {
          type: 'string',
          format: 'date-time',
          example: '2025-02-15T00:00:00.000Z'
        },
        time: {
          type: 'string',
          example: '14:30'
        },
        appointmentType: {
          type: 'string',
          enum: ['Checkup', 'Vaccination', 'Grooming', 'Surgery', 'Dental', 'Training', 'Boarding', 'Other'],
          example: 'Checkup'
        },
        location: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'City Vet Clinic'
            },
            address: {
              type: 'string',
              example: '456 Clinic Ave, City, State 12345'
            },
            phone: {
              type: 'string',
              example: '555-987-6543'
            },
            email: {
              type: 'string',
              example: 'appointments@cityvet.com'
            }
          }
        },
        description: {
          type: 'string',
          example: 'Annual wellness exam and vaccines'
        },
        status: {
          type: 'string',
          enum: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Missed'],
          example: 'Scheduled'
        },
        reminder: {
          type: 'object',
          properties: {
            enabled: {
              type: 'boolean',
              example: true
            },
            time: {
              type: 'number',
              example: 24
            }
          }
        },
        notes: {
          type: 'string',
          example: 'Bring previous vaccination records.'
        }
      }
    },
    Error: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        message: {
          type: 'string',
          example: 'Error message'
        }
      }
    }
  }
};

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
}).catch(error => {
  console.error('Error generating Swagger documentation:', error);
});