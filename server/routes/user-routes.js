import express from "express";
import {
	loginUser,
	registerUser,
	logoutUser,
	updatePassword,
	deleteAccount,
} from "../controllers/user-controllers.js";
import { validateToken } from "../jwt.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/updatePassword", validateToken, updatePassword);
userRouter.post("/deleteAccount", deleteAccount);

export default userRouter;
