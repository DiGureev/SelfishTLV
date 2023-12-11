import { register, login, addFavorite, getFavorite, deleteFavorite, addToken } from "../models/users.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const _register = async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
  
    const loweremail = email.toLowerCase();
  
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password + "", salt);
  
    try {
      const row = await register(username, loweremail, hash);
      res.json(row);
    } catch (e) {
      console.log("_register=>", e);
      res.status(404).json({ msg: "Email allready exist" });
    }
  };


export const _login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const row = await login(email.toLowerCase());
      
      if (row.length === 0)
        return res.status(404).json({ msg: "Email not found, please Sign Up" });
      
      //checking if the passwords match
      const match = bcrypt.compareSync(password + "", row[0].password);
      if (!match) return res.status(404).json({ msg: "Wrong password" });

      //get user info from the response
      const userid = row[0].userid;
      const username = row[0].username;
      const useremail = row[0].email;

      const secret = process.env.ACCESS_TOKEN_SECRET

      //sign access token and refresh token
      const accesstoken = jwt.sign({ userid, useremail }, secret, {
            expiresIn: "1h",
      });

      const refreshToken = jwt.sign({ userid, useremail }, secret, {
        expiresIn: '7d',
      });
      
      // res.cookie('token', accesstoken, {
      //   httpOnly:true,
      //   maxAge: 60 * 1000,
      // })

      // res.cookie('refreshToken', refreshToken, { httpOnly: true , maxAge: 60 * 1000* 60 * 24 * 7,});
      
      //add refresh token to the DB
      const ref = await addToken(refreshToken, userid)

      //encrypt refresh token before sending to the client
      const salt = bcrypt.genSaltSync(10);
      const hashToken = bcrypt.hashSync(refreshToken + "", salt);

      res.json({ accesstoken, refreshToken: hashToken, userid, username});
        } catch (e) {
          console.log(e);
          res.status(404).json({ msg: "Something went wrong with token" });
        }
};


export const _addFavorite = async (req,res) => {
  const {userid, tourid} = req.body
  try{
      const row = await addFavorite(userid, tourid)
      res.status(200).json(row)

  }catch(e){
      console.log(e)
      res.status(404).json({ msg: "Can't add to favorite" });
  }

}

export const _getFavorite = async (req,res) => {
  const userid = req.params.id
  console.log(userid)
  try{
      const row = await getFavorite(userid)
      res.json(row)

  }catch(e){
      console.log(e)
      res.status(404).json({ msg: "Can't get favorites" });
  }

}

export const _deleteFavorite = async (req,res) => {
  const {userid, tourid} = req.params
  console.log(userid)
  console.log(tourid)
  try{
      const row = await deleteFavorite(userid, tourid)
      res.sendStatus(200)
  }catch(e){
      console.log(e)
      res.status(404).json({ msg: "Can't delete favorites" });
  }

}