import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routers/userRoutes.js';
import donationRoutes from './Routers/donationRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Root route (GET /)
app.get('/', (req, res) => {
  res.send('Welcome to the Fastamoni API');
});

// Routers
app.use('/api/users', userRoutes);
app.use('/api', donationRoutes);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to the database");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });
