import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this matches the model name in your User model
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this matches the model name in your User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Change 'donation' to 'Donation'
const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
