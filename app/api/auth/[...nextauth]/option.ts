import { connectToDB } from "@lib/mongoDB";
import User from "@models/User";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Next Auth options
export const options: NextAuthOptions = {
  // Providers
  providers: [
    // Credentials provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Connect to the database
        await connectToDB();

        // Find the user by email
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("No user found");
        }

        // Compare the password
        const isMatchedPassword = await compare(
          credentials?.password,
          user.password
        );

        // If the password is invalid, throw an error
        if (!isMatchedPassword) {
          throw new Error("Invalid password");
        }

        // Return the user
        return user;
      },
    }),
  ],
  // Next Auth secret
  secret: process.env.NEXTAUTH_SECRET,
};
