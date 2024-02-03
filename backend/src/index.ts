import express, { type Request, type Response } from "express";
import authRouter from "./routers/auth";
import "dotenv/config";
import connectDB from "./dal/mongoDB/connect";
import errorMiddleware from "./utils/logicErrors/errorMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserModel from "./dal/mongoDB/schemas/users";
import authMiddleware from "./middleware/authMiddleware";

const PORT = process.env.PORT ?? 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRouter);
app.use("/", authMiddleware, async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
});
app.use(errorMiddleware);
connectDB();
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
