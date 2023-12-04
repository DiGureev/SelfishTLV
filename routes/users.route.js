import express from "express";
import { _register, _login, _getusername, _addFavorite, _getFavorite } from "../controllers/users.controller.js";
import { token } from "../middleware/accesstoken.js";

const userRouter = express.Router();

userRouter.post("/signup", _register);
userRouter.post("/login", _login);//mb we need to set here a middleware
userRouter.get("/:id", _getusername);
userRouter.get("/favorites/:id", _getFavorite);
userRouter.post("/favorites", _addFavorite);
userRouter.get("/verify", token, (req, res) => {
    res.sendStatus(201);
});

export default userRouter