import express, { type Request, type Response } from "express";
import authRouter from "./routers/auth";
import "dotenv/config";
import connectDB from "./dal/mongoDB/connect";
import errorMiddleware from "./utils/logicErrors/errorMiddleware";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT ?? 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRouter);
app.use(errorMiddleware);
connectDB();
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
