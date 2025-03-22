import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import mongoose from "mongoose";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find(); // Find all users
        res.json(users); // Return users as JSON
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            res.status(400).json({ message: "Invalid user ID" });
            return; // Exit the function
        }

        const user = await User.findById(id); // Find user by ID
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return; // Exit the function
        }

        res.json(user); // Return user as JSON
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, email, bestAlbum, age } = req.body;

        // Check if required fields are provided
        if (!fullName || !email || !bestAlbum || !age) {
            res.status(400).json({ message: "All fields are required" });
            return; // Exit the function
        }

        const user = new User({ fullName, email, bestAlbum, age });
        await user.save(); // Save the new user
        res.status(201).json(user); // Return the created user
    } catch (error) {
        res.status(500).json({ message: "Server error" , error });
    }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            res.status(400).json({ message: "Invalid user ID" });
            return; // Exit the function
        }

        const user = await User.findByIdAndUpdate(id, req.body, { new: true }); // Update user
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return; // Exit the function
        }

        res.json(user); // Return updated user
    } catch (error) {
        res.status(500).json({ message: "Server error", error  });
    }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            res.status(400).json({ message: "Invalid user ID" });
            return; // Exit the function
        }

        const user = await User.findByIdAndDelete(id); // Delete user
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return; // Exit the function
        }

        res.json({ message: "User deleted" }); // Return success message
    } catch (error) {
        res.status(500).json({ message: "Server error", error  });
    }
};