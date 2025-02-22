import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { NextRequest } from "next/server";
import { hash } from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectToDB();

    // Get the username, email, and password from the request body
    const { username, email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    // If the user already exists, return an error
    if (existingUser) {
      return new Response("User already exists", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    // Return the new user
    return new Response(JSON.stringify(newUser), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new user", { status: 500 })
  }
}