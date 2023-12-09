import express from "express";
import { _gettour, _getAllTours, _updateLikes, _getLikes,_getMainImg } from "../controllers/tours.controller.js";

const tourRouter = express.Router();

tourRouter.get("/:id", _gettour);
tourRouter.get("/likes/:id", _getLikes);
tourRouter.get("/img/:id", _getMainImg);
tourRouter.get("/", _getAllTours);
tourRouter.put("/:id", _updateLikes);

export default tourRouter