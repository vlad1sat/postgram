import express from "express";
import authRouter from "./routers/auth";
import "dotenv/config";
import connectDB from "./dal/mongoDB/connect";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import postsRouter from "./routers/posts";
import jsonMiddleware from "./middleware/jsonMiddleware";

const PORT = process.env.PORT ?? 5001;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", jsonMiddleware, authRouter);
app.use("/posts", jsonMiddleware, postsRouter);
/* app.use("/", authMiddleware, async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).json(users);
}); */
app.use(errorMiddleware);
connectDB();
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
