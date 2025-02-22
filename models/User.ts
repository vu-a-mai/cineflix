import mongoose from "mongoose";

// Define the User schema
// This will be used to create a new collection in MongoDB
// The collection will have the following fields:
// - username: a required string
// - email: a unique, required string
// - password: a required string
// - favorites: an array of numbers
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
    default: [],
  },
});

// Create the User model
// The User model will be used to perform CRUD operations on the User collection
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
