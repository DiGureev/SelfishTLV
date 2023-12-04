import express from "express";
import { _gettour, _getAllTours } from "../controllers/tours.controller.js";

const tourRouter = express.Router();

tourRouter.get("/:id", _gettour);
tourRouter.get("/", _getAllTours);

export default tourRouter