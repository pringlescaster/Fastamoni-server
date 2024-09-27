import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getUserById, 
    getDonationsByDateRange // Import the new function
} from '../Controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers); // Route to get all users
router.get('/:id', getUserById); // Route to get a particular user by ID
router.get('/:id/donations', getDonationsByDateRange);  // Route to get donations by date range for a specific user

export default router;
