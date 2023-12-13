import jwt from 'jsonwebtoken';
import {fetchRefresh} from '../models/users.model.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

export const token = async (req, res, next) => {

    // get headers
    let token = req.cookies.token || req.headers['authorization']
    const id = req.headers['id']
    const refreshCheck = req.headers['refreshtoken']

    //fetch refresh token from the DB
    const refresh = await fetchRefresh(id)
    const refreshToken = refresh[0].refresh
    const username = refresh[0].username

    //if access token is empty
    if(!token) {
      //check if encrypt token matches with the real one
      const match = bcrypt.compareSync(refreshToken + "", refreshCheck);
      if (!match) return res.sendStatus(403)

      //verify refresh token
      jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Refresh token verification failed' });
        }
        //sign a new access token
        const newAccessToken = jwt.sign({ id, username}, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1h', 
        });

        //put new information to the request body
        req.body.info = {token: newAccessToken, id, username}

        next();
      })

    //check if token is not empty but expired  
    } else {
      //verify access token
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if(err) {

        //if not verifyed - check the refresh token match
        const match = bcrypt.compareSync(refreshToken + "", refreshCheck);
        if (!match) return res.sendStatus(403)

        //verify refresh token
        jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

          if (err) {
            return res.status(403).json({ message: 'Refresh token verification failed' });
          } else {

            // sign new token
            const newAccessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h', 
            });

            //send new info to the request body
            req.body.info = {token: newAccessToken, id, username}
            next();
          }
        
          });
      } // if access token is ok - next
        else {

        next();
      }
    })
  }
   
};