// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const professionalDevelopmentRoutes = require('./routes/development'); // Import professional development routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(bodyParser.json());
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
app.use('/api/employees', employeeRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/development', professionalDevelopmentRoutes); // Add professional development routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});