import { type Request, type Response, Router } from "express";

const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response) => {
    res.json({
        prop: "h1",
    });
});

authRouter.post("/registration", (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({ err: ["Некорректные данные!"] });
    }

    res.status(201).json({
        username,
    });
});

export default authRouter;
