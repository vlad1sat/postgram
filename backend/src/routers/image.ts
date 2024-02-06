import { Router } from "express";
import ImageController from "../controllers/ImageController";

const imageRouter: Router = Router();

imageRouter.post("/", ImageController.postImage);

export default imageRouter;
