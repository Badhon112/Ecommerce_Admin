import mongoose from "mongoose";
let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect((process.env.MONGODB_URL as string) || "", {
      dbName: "Ecommerce_Admin",
    });
    isConnected = true;
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};