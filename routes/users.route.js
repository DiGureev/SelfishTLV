import express from "express";
import { _register, _login, _getusername, _addFavorite, _getFavorite, _deleteFavorite } from "../controllers/users.controller.js";
import { token } from "../middleware/accesstoken.js";

const userRouter = express.Router();

userRouter.post("/signup", _register);
userRouter.post("/login", _login);
userRouter.get("/favorites/:id", _getFavorite); //tried to put here a middleware - problem with cookies
userRouter.post("/favorites", _addFavorite);
userRouter.delete("/favorites/:userid&:tourid", _deleteFavorite);

userRouter.post("/verify", token, (req, res) => {
    res.sendStatus(201);
}); //post - because I send here the token from useState

export default userRouter