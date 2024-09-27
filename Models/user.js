import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    transactionPIN: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'donation' }], // Ensure this is included if you're using donations
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema); // Ensure the model name is capitalized

export default User;
