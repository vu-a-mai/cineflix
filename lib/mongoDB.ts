import mongoose from "mongoose";

let isConnected: boolean = false;

// Connect to MongoDB
export const connectToDB = async (): Promise<void> => {
  // Set the strictQuery option to true
  // This will make sure that the query will throw an error if the query is invalid
  mongoose.set("strictQuery", true);

  // Check if MongoDB is already connected
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    /*
      Connect to MongoDB
      Use the MONGODB_URL environment variable as the connection string
      Use the CineFlex database
      If the MONGODB_URL environment variable is not set, use an empty string
      This will default to the local MongoDB server
    */
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "CineFlex",
    });

    // Set isConnected to true
    isConnected = true;
    console.log("MongoDB is connected successfully");
  } catch (err) {
    console.error(err);
  }
};
