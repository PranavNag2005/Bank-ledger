import express from "express";
import { registerUser, loginUser, logoutUser } from "../controller/auth.controller.js";

export const authRouter = express.Router();

authRouter.post('/register', registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/logout",logoutUser)

export default authRouter;