import express from "express";
import { _register, _login, _addFavorite, _getFavorite, _deleteFavorite } from "../controllers/users.controller.js";
import { token } from "../middleware/accesstoken.js";

const userRouter = express.Router();

userRouter.post("/signup", _register);
userRouter.post("/login", _login);
userRouter.get("/favorites/:id", _getFavorite);
userRouter.post("/favorites", _addFavorite);
userRouter.delete("/favorites/:userid&:tourid", _deleteFavorite);

userRouter.post("/logout", (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
});

userRouter.post("/verify", token, (req, res) => {
    //if we dont have info with new states - access token is ok
    if (!req.body.info) {
        res.sendStatus(201)
    }
    //if we have - we send it to the response
    else {
        const {token, id, username} = req.body.info
        res.status(200).json({token, id, username});
    }
    
}); 


export default userRouter