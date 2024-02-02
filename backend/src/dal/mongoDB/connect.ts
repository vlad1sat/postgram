import mongoose from "mongoose";
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_CONNECT ?? "");
    } catch (e) {
        console.log(e);
    } /* finally {
        await mongoose.disconnect();
        console.log("DB Disconnect");
    } */
};

export default connectDB;
