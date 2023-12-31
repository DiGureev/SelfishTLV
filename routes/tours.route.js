import express from "express";
import { _gettour, _getAllTours, _getMainImg } from "../controllers/tours.controller.js";

const tourRouter = express.Router();

tourRouter.get("/:id", _gettour);
tourRouter.get("/img/:id", _getMainImg);
tourRouter.get("/", _getAllTours);

export default tourRouter