import express, { type Request, type Response } from "express";
import authRouter from "./routers/auth";
import "dotenv/config";
import connectDB from "./dal/mongoDB/connect";
import errorMiddleware from "./utils/logicErrors/errorMiddleware";
import cors from "cors";

const PORT = process.env.PORT ?? 5001;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.get("/", (req: Request, response: Response) => {
    response.send("Hello world!");
});
app.use(errorMiddleware);
connectDB();
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
