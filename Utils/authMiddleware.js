import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user exists in the database
        const user = await User.findById(decoded.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        // Attach user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        
        // Check if the error is due to token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        
        // Handle other errors (e.g., JsonWebTokenError)
        res.status(401).json({ message: 'Token is not valid' });
    }
};


