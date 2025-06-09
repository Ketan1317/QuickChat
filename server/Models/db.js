import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("trying")
        await mongoose.connect(`${process.env.MONGO_DB_URL}/chat-app`);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
