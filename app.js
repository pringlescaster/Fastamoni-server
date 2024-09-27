import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routers/userRoutes.js';
import donationRoutes from './Routers/donationRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

//routers
app.use('/api/users', userRoutes);
app.use('/api', donationRoutes);



const port = process.env.PORT;

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
