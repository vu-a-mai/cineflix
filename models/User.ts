import mongoose from "mongoose";
import { connectToDB } from "@lib/mongoDB";

/**
 * User Schema Definition
 * Defines the structure and validation rules for user documents in MongoDB.
 *
 * @typedef {Object} User
 * @property {string} username - The user's display name (required)
 * @property {string} email - User's unique email address (required, unique)
 * @property {string} password - User's hashed password (required)
 * @property {number[]} favorites - Array of movie IDs that the user has favorited
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: {
    type: [{ type: Number }],
    default: [], // Initialize as empty array if not provided
  },
});

/**
 * User Model Initialization
 * 
 * This section handles the creation/retrieval of the User model using a pattern
 * that prevents model recompilation errors in development with hot reloading.
 * 
 * The try-catch block ensures that:
 * 1. We reuse the existing model if it's already been compiled
 * 2. We create a new model only if it hasn't been compiled yet
 * This prevents the "Cannot overwrite model once compiled" error
 */
let User: any;

try {
  // Check if the model is already defined
  User = mongoose.models.User || mongoose.model("User", UserSchema);
} catch (error) {
  // If not defined, create a new model
  User = mongoose.model("User", UserSchema);
}

export default User;
