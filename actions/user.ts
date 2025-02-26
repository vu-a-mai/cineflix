import { options } from "@app/api/auth/[...nextauth]/option";
import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { getServerSession } from "next-auth";

/**
 * Fetches the user's favorite movies list from the database
 * @throws {Error} "Authentication required - Please log in to access your list" If no user is logged in
 * @throws {Error} "User account not found in database" If user is not found in database
 * @throws {Error} "Failed to fetch favorites: [error message]" If any other error occurs
 * @returns {Promise<number[]>} Array of favorite movie IDs
 */
export const fetchMyList = async (): Promise<number[]> => {
  try {
    // Get the user's session
    const session = await getServerSession(options);

    // If there is no user logged in, throw an error
    if (!session?.user?.email) {
      throw new Error("Authentication required - Please log in to access your list");
    }

    // Connect to database
    await connectToDB();

    // Find the user by email
    const user = await User.findOne({ email: session.user.email }).select("favorites");
    // If user not found, throw error
    if (!user) {
      throw new Error("User account not found in database");
    }
    // Return the user's favorite movies
    return user.favorites;
  } catch (error) {
    // Re-throw database connection errors with a user-friendly message
    if (error instanceof Error) {
      throw new Error(`Failed to fetch favorites: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while fetching favorites");
  }
};
