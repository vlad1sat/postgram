import { Router, type Request, type Response } from "express";

const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response) => {
    res.json({
        prop: "h1",
    });
});

export default authRouter;
