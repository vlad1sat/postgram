import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter: Router = Router();

usersRouter.get("/", UserController.getUsers);

usersRouter.get("/:id", UserController.getUserByID);

usersRouter.get("/posts/:id", UserController.getUserPosts);

export default usersRouter;
