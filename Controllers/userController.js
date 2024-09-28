import User from "../Models/user.js"; // Import the User model
import Donation from "../Models/donation.js"; // Import the Donation model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password, transactionPIN, phoneNumber } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Hash the transaction PIN
        const hashedTransactionPIN = await bcrypt.hash(transactionPIN, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            transactionPIN: hashedTransactionPIN, // Store the hashed transaction PIN
            phoneNumber
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users with pagination
export const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // default page to page 1
    const limit = parseInt(req.query.limit) || 10; // default limit to 10 users per page

    try {
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select('-password')
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments(); // Total number of users

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by ID and show transaction count
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID and populate donations
        const user = await User.findById(id).populate('donations'); // Ensure donations is defined in User schema
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Count the number of donations
        const transactionCount = user.donations.length || 0; // Handle case where donations might be undefined

        // Exclude sensitive data (like password)
        const { password, donations, ...userData } = user.toObject();
        res.json({ ...userData, transactionCount }); // Return user data along with transaction count
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get donations within a specific date range for a user
export const getDonationsByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.params.id;

    try {
        // Parse the dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Validate date inputs
        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Fetch donations within the date range for the user
        const donations = await Donation.find({
            donor: userId,
            createdAt: {
                $gte: start,
                $lte: end
            }
        }).populate('beneficiary donor'); // Populate beneficiary and donor fields

        if (!donations.length) {
            return res.status(404).json({ message: 'No donations found for the specified period' });
        }

        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
