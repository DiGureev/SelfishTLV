import express from "express";
import {_allEvents, _todayEvents, _tomorrowEvents, _weekEvents} from '../controllers/events.controller.js';

const eventRouter = express.Router();

eventRouter.get("/", _allEvents);
eventRouter.get("/today", _todayEvents);
eventRouter.get("/tomorrow", _tomorrowEvents); 
eventRouter.get("/week", _weekEvents);

export default eventRouter