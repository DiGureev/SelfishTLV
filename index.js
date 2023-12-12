import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/users.route.js';
import tourRouter from './routes/tours.route.js';
import eventRouter from './routes/events.route.js'
import likeRouter from './routes/likes.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import * as url from 'url';

const app = express();
dotenv.config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors())

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


app.listen(process.env.PORT || 3001, () => {
    console.log(`run on ${process.env.PORT || 3001}`);
  });

app.use("/api/users", userRouter)
app.use("/api/tours", tourRouter)
app.use("/api/events", eventRouter)
app.use("/api/likes", likeRouter)
