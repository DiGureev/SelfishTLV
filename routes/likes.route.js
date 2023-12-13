import express from "express";
import {_alllikes, _userlike, _addlike, _minusLikes} from '../controllers/likes.controller.js';


const likeRouter = express.Router();

likeRouter.get("/:id", _alllikes);
likeRouter.post("/userlike", _userlike);
likeRouter.post("/add", _addlike);
likeRouter.post("/remove", _minusLikes);

export default likeRouter