import express from 'express';
import { createDonation, getDonationsByUser, getDonationById } from '../Controllers/donationController.js';
import { authMiddleware } from '../Utils/authMiddleware.js';

const router = express.Router();

router.post('/newdonation', authMiddleware, createDonation);
router.get('/donations', authMiddleware, getDonationsByUser);
router.get('/:donationId', authMiddleware, getDonationById);


export default router;