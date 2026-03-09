const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());        // enable CORS
app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');
const paymentRoutes = require('./routes/payments');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});