import express, { type Request, type Response } from "express";
import authRouter from "./controllers/auth";

const app = express();
app.use(express.json());
const port = 5001;
app.use(authRouter);
app.get("/", (req: Request, response: Response) => {
    response.send("Hello world!");
});
app.listen(port, () => { console.log(`Running on port ${port}`); });
