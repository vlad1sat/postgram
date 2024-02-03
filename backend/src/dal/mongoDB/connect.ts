import mongoose from "mongoose";
import defaultEnv from "../../defaultEnv";
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_CONNECT ?? defaultEnv.DB_CONNECT);
    } catch (e) {
        console.log(e);
    }
};

export default connectDB;
