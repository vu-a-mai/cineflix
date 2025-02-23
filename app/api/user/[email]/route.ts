import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { NextRequest } from "next/server";

// GET /api/user/[email]
// Get user by email
// Returns user
export const GET = async (
  req: NextRequest,
  { params }: { params: { email: string } }
) => {
  try {
    // Connect to database
    await connectToDB();

    // Get email from params
    const { email } = await params;

    // Find user by email
    const user = await User.findOne({ email: email });

    // If user not found, throw error
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    // Return user
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to get user: ${err.message}`);
  }
};

// POST /api/user/[email]
// Add or remove favorite movie
// Body: { movieId: number }
// Returns updated user
export const POST = async (
  req: NextRequest,
  { params }: { params: { email: string } }
) => {
  try {
    // Connect to database
    await connectToDB();

    // Get email from params
    const { email } = await params;

    // Find user by email
    const user = await User.findOne({ email: email });

    // If user not found, throw error
    if (!user) {
      throw new Error("User not found");
    }

    // Parse request body
    const { movieId } = await req.json();

    // Check if movie is already in user's favorites
    const isFavorite = user.favorites.includes(movieId);

    // Add or remove movie from favorites
    if (isFavorite) {
      // Remove movie from favorites
      user.favorites = user.favorites.filter((id: number) => id !== movieId);
    } else {
      // Add movie to favorites
      user.favorites.push(movieId);
    }

    // Save user
    await user.save();

    // Return updated user
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to get user: ${err.message}`);
  }
};
