import Donation from '../Models/donation.js'; 
import User from '../Models/user.js';
import sendEmail from '../Utils/sendEmail.js';

// Create a donation
export const createDonation = async (req, res) => {
    const { amount, beneficiary } = req.body;
    const donor = req.user.id; // The donor's ID from the authenticated user

    try {
        // Check if the beneficiary exists
        const beneficiaryUser = await User.findById(beneficiary);
        if (!beneficiaryUser) {
            return res.status(400).json({ message: 'Beneficiary not found' });
        }

        // Create and save the new donation
        const newDonation = new Donation({ amount, beneficiary, donor });
        await newDonation.save();
        
        // Update the donor's donations array
        await User.findByIdAndUpdate(donor, { $push: { donations: newDonation._id } });

        // Check donation count for thank you message
        const donationsCount = await Donation.countDocuments({ donor });
        if (donationsCount >= 2) {
            // Send thank you email instead of SMS
            const donorUser = await User.findById(donor);
            if (!donorUser) {
                return res.status(400).json({ message: 'Donor not found' });
            }

            const donorEmail = donorUser.email; // Ensure this field exists in your User model
            if (!donorEmail) {
                return res.status(400).json({ message: 'Donor email is missing.' });
            }

            // Send the thank-you email
            const subject = 'Thank You for Your Generous Donations!';
            const message = `Dear ${donorUser.username},\n\nThank you for your generous donations! You've made ${donationsCount} contributions, and we truly appreciate your support.\n\nBest regards,\nYour Donation Team`;
            await sendEmail(donorEmail, subject, message); // Use the imported sendEmail function
        }

        res.status(201).json({ message: 'Donation created successfully', donation: newDonation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View all donations made by a user
export const getDonationsByUser = async (req, res) => {
    try {
        // Find user and populate donations
        const user = await User.findById(req.user.id).populate('donations');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View a single donation
export const getDonationById = async (req, res) => {
    try {
        // Find donation by ID and populate donor information
        const donation = await Donation.findById(req.params.id).populate('donor');
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        res.json(donation);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};



