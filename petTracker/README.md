# Pet Tracker API

A web API for tracking pet information, medical history, and appointments. Built with Node.js, Express, MongoDB, and Google OAuth.

## Features

- **Pet Management**: Store information about your pets including name, species, breed, weight, and more
- **Medical Records**: Track veterinary visits, medications, treatments, and health history
- **Appointment Scheduling**: Manage upcoming vet visits, grooming sessions, and other pet appointments
- **User Authentication**: Secure login via Google OAuth
- **Role-Based Access**: Users can only access their own pet data
- **API Documentation**: Interactive Swagger UI documentation

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose)
- **Authentication**: Passport.js with Google OAuth 2.0
- **Validation**: Express Validator
- **Documentation**: Swagger UI Express
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- Google Developer Console account (for OAuth credentials)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pet-tracker-api.git
   cd pet-tracker-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. Access the API at `http://localhost:3000`

## Project Structure

```
pet-tracker-api/
├── config/
│   └── auth.js              # OAuth configuration
├── controllers/
│   ├── appointmentController.js
│   ├── medicalController.js
│   └── petController.js
├── middleware/
│   └── authMiddleware.js    # Authentication middleware
├── models/
│   ├── appointmentModel.js
│   ├── medicalModel.js
│   ├── petModel.js
│   └── userModel.js
├── public/                  # Static files
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── dashboard.html
│   ├── index.html
│   └── login.html
├── routes/
│   ├── appointmentRoutes.js
│   ├── authRoutes.js
│   ├── medicalRoutes.js
│   └── petRoutes.js
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── README.md
├── server.js               # Main server file
└── swagger.json            # API documentation
```

## 🔒 API Routes
- `GET /api/users` - Get all users for SUPER USER ONLY
- `GET /api/users/:id` - Get specific user details SUPER USER ONLY (or if your own account user id)
- `POST /api/users` - Create a new user  SUPER USER ONLY
- `PUT /api/users/:id` - Update a user SUPER USER ONLY (or if your own account user id)
- `DELETE /api/users/:id` - Delete a pet SUPER USER ONLY


### Pets

- `GET /api/pets` - Get all pets for logged-in user
- `GET /api/pets/:id` - Get specific pet details
- `POST /api/pets` - Create a new pet
- `PUT /api/pets/:id` - Update a pet
- `DELETE /api/pets/:id` - Delete a pet

### Medical Records

- `GET /api/medical/:petId` - Get all medical records for a pet
- `GET /api/medical/record/:id` - Get specific medical record
- `POST /api/medical/:petId` - Create a new medical record
- `PUT /api/medical/record/:id` - Update a medical record
- `DELETE /api/medical/record/:id` - Delete a medical record

### Appointments

- `GET /api/appointments/:petId` - Get all appointments for a pet
- `GET /api/appointments/appointment/:id` - Get specific appointment
- `POST /api/appointments/:petId` - Create a new appointment
- `PUT /api/appointments/appointment/:id` - Update an appointment
- `DELETE /api/appointments/appointment/:id` - Delete an appointment

## API Documentation

Interactive API documentation is available at `/api-docs` when the server is running.

## Future Enhancements

- [ ] Export medical records as PDF
- [ ] Export Appointment History as PDF
- [ ] Filter appointments by date range
- [ ] Add pet photo upload functionality

## Contributors

- Caitlin Evans
~~- Karim Valenzuela Gonzalez~~

This project is created for CSE 341 Final Project.