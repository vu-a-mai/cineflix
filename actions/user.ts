import { options } from "@app/api/auth/[...nextauth]/option";
import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { getServerSession } from "next-auth";

// fetchMyList will return the user's favorite movies
export const fetchMyList = async () => {
  // Get the user's session
  const session = await getServerSession(options);

  // If there is no user logged in, throw an error
  if (!session?.user?.email) {
    throw new Error("No user log in");
  }

  // Connect to database
  await connectToDB();

  // Find the user by email
  const user = await User.findOne({ email: session?.user?.email });

  // If user not found, throw error
  if (!user) {
    throw new Error("No user found");
  }

  // Return the user's favorite movies
  return user.favorites;
};
