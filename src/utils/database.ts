import mongoose from "mongoose";

async function ConnectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected successfully");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}

export { ConnectToMongoDB };
