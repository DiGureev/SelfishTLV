import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/users.route.js';
import tourRouter from './routes/tours.route.js';
import eventRouter from './routes/events.route.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.listen(process.env.PORT || 3001, () => {
    console.log(`run on ${process.env.PORT || 3001}`);
  });

app.use("/users", userRouter)
app.use("/tours", tourRouter)
app.use("/events", eventRouter)
